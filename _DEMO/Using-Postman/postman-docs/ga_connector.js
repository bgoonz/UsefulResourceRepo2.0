

const algoliasearch = require('algoliasearch');
const { google } = require('googleapis');
const { hostname } = require('os');
const analytics = google.analyticsreporting('v4');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

// GA metrics. Reference doc: https://ga-dev-tools.appspot.com/dimensions-metrics-explorer/
const METRICS = {
  pageviews: 'ga:pageviews',
  uniquePageViews: 'ga:uniquePageViews',
  entranceRate: 'ga:entranceRate',
  // ...
};

// Script parameters
const APP_ID = '4A5N71XYH0';
const API_KEY = process.env.ALGOLIA_ADMIN_KEY;
const INDEX_NAME = 'docs';
const URL_ATTRIBUTE = 'fields'; // name of the attribute in your Algolia records that contain the URL.
const GA_PARAMETERS = {
  viewId: 193423593,
  metrics: [METRICS.uniquePageViews],
  startDate: '30daysAgo', // https://developers.google.com/analytics/devguides/reporting/core/v3/reference#startDate
  endDate: 'today',
  limit: 10000, // number of rows to fetch from GA
};
const PROTOCOL = 'https://';
const MAX_PAGE_SIZE = 100000; // 100000 is the max value, according to https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet

/**
* This class allows to fetch metrics of an unpredictable number of pages of analytics from GA API.
* Instances keep track of the fetching progress, for the next() method.
*
* It also handles authentication using a service account, if GOOGLE_APPLICATION_CREDENTIALS is correctly set.
* See https://github.com/googleapis/google-api-nodejs-client/#using-the-google_application_credentials-env-var
*
* @param {object} p           - (compound parameters).
* @param {number} p.viewId    - Identifier of the Google Analytics' view from which to fetch data.
* @param {string[]} p.metrics - Array of GA metric types, as defined in the METRICS dictionary (default = ['ga:uniquePageViews']).
* @param {number} p.limit     - Maximum number of URLs to fetch.
* @param {string} p.startDate - Period from which analytics must cover until endDate. (default: '7daysAgo').
* @param {string} p.endDate   - Period until which analytics must cover. (default: 'today').
*/
class MetricsFetcher {
  constructor({
    viewId,
    metrics = [METRICS.uniquePageViews],
    limit = 100000,
    startDate = '7daysAgo',
    endDate = 'today',
  }) {
    this.auth = new google.auth.GoogleAuth({ scopes: ['https://www.googleapis.com/auth/analytics.readonly'] })
    // console.log('...............process..............', process.env.NODE_ENV)
    // const scopes = 'https://www.googleapis.com/auth/analytics.readonly';

    // this.auth = new google.auth.JWT({
    //   email: process.env.CLIENT_EMAIL,
    //   key: process.env.PRIVATE_KEY,
    //   scopes
    // })

    this.viewId = viewId.toString();
    this.metrics = metrics.includes(METRICS.uniquePageViews)
      ? metrics
      : metrics.concat([METRICS.uniquePageViews]);
    this.remaining = limit;
    this.startDate = startDate;
    this.endDate = endDate;
    this.pageToken = undefined;
  }

  /**
  * Get next page.
  * Data is ordered by most 'ga:uniquePageViews' first.
  *
  * @returns {Object} An object that contains { rows: [{ hostname: string, pagePath: string, [metricName]: number }], hasMore: boolean }.
  */
  async next() {
    console.log(`[GA] batchGet viewId=${this.viewId} remaining=${this.remaining}...`);
    const response = await analytics.reports.batchGet({
      auth: this.auth,
      requestBody: {
        reportRequests: [
        {
          viewId: this.viewId,
          dateRanges: [
            {
              startDate: this.startDate,
              endDate: this.endDate,
            },
          ],
          // reference doc: https://ga-dev-tools.appspot.com/dimensions-metrics-explorer/#ga:pagePath
          dimensions: [{ name: 'ga:hostname' }, { name: 'ga:pagePath' }],
          metrics: this.metrics.map(metric => ({ expression: metric })),
          orderBys: [
          {
            fieldName: METRICS.uniquePageViews,
            sortOrder: 'DESCENDING',
          },
          ],
          pageSize:
            this.remaining !== null && this.remaining < MAX_PAGE_SIZE
              ? this.remaining
              : MAX_PAGE_SIZE,
          pageToken: this.pageToken,
        },
        ],
      },
    });

    if (!response.data.reports || response.data.reports.length <= 0) {
      return { rows: [], hasMore: false };
    }

    const { rows } = response.data.reports[0].data;
    this.pageToken = response.data.reports[0].nextPageToken;
    if (this.remaining !== null && rows) {
      this.remaining -= rows.length;
    }

    console.log(`[GA] fetched a page of ${rows ? rows.length : 0} rows from Google Analytics (viewId=${this.viewId})`);

    const rowsClean = !rows
      ? []
      : rows.map(row => {
        return {
          hostname: row.dimensions[0],
          pagePath: row.dimensions[1],
          // append one key-value per metric, with integer value
          ...this.metrics.reduce(
            (keyVals, metric, idx) => ({
              ...keyVals,
              [metric]: parseInt(row.metrics[0].values[idx], 10),
            }),
            {}
          ),
        };
      });

    const hasMore =
      (this.remaining === null || this.remaining > 0) &&
      this.pageToken !== undefined &&
      this.pageToken !== null;

    return { rows: rowsClean, hasMore };
  }

  /**
  * Get All GA data of the view.
  *
  * @returns {Object} An object with the following structure:
  *   {
  *     `${url1}`: { hostname: string, pagePath: string, [metricName]: number },
  *     `${url2}`: { hostname: string, pagePath: string, [metricName]: number },
  *   }.
  */
  async fetchAll() {
    let counter = 0;
    let batch;
    const res = {};
    do {
      batch = await this.next();
      batch.rows.forEach(row => {
        ++counter;
        res[getPageUrl(row.hostname, row.pagePath)] = row;
      });
    } while (batch.hasMore);
    console.log(`=> fetched ${counter} rows from GA LC view: ${this.viewId} 📚`);
    return res;
  }
}

/**
* Helper to rebuild the complete page URL from GA data, as set in the Algolia records.
* Google Analytics doesn't store the protocol so we are re-adding it.
* Another way is to store the URLs without the protocol in your Algolia records.
*
* @param {string} hostname - The hostname returned by GA.
* @param {string} pagePath - The pagePath returned by GA.
* @returns {string} The full page URL.
*/
function getPageUrl(hostname, pagePath) {
  // When google analytics is misconfigured, the pagePath can contain a path prefixed by the hostname (www.example.com/)
  if (!pagePath.startsWith('/')) {
    // the path is prefixed by a host name => let's use it as-is
    return `${PROTOCOL}${pagePath}`;
  } else {
    // generate the full URL
    return `${PROTOCOL}${hostname}${pagePath}`;
  }
}

// Main
(async () => {
  console.log(`Fetching Google Analytics data...`);
  const metricsFetcher = new MetricsFetcher(GA_PARAMETERS);
  const allGADataUgly = await metricsFetcher.fetchAll();

  const allGAData = {};
  // turn GAData object into array 
  Object.keys(allGADataUgly).forEach((item) => {
    if (allGADataUgly[item]['ga:uniquePageViews'] > 100) {
      const newKey = item.replace('https://learning.postman.com', '').replace(/\?.*/g, ''); // remove url and everything after a ? to match the path that is being indexed in Algolia
      allGAData[newKey] = allGADataUgly[item];
    }
  }) 

  console.log('Browsing Algolia index and creating partial records...');
  const client = algoliasearch(APP_ID, API_KEY);
  const index = client.initIndex(INDEX_NAME);
  const recordsToUpdate = [];

try {
  await index.browseObjects({
    query: '', // Empty query will match all records
    attributesToRetrieve: [URL_ATTRIBUTE],
    batch: batch => {
      batch.forEach(record => {

        if (allGAData[record[URL_ATTRIBUTE].slug]) {  
          // Create a partial record with a new `pageviews` attribute
          recordsToUpdate.push({
            objectID: record.objectID,
            pageviews:
              allGAData[record[URL_ATTRIBUTE].slug][METRICS.uniquePageViews],
          });
        }
      });
    },
  });
} catch(err) {
  console.log(err);
}


  console.log(`Updating ${recordsToUpdate.length} records...`);
  await index.partialUpdateObjects(recordsToUpdate, {
    createIfNotExists: false,
  });
  console.log('Records updated.');
})();
