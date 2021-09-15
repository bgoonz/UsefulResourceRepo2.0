import 'isomorphic-fetch';
import HttpError from './HttpError';
import {format as formatUrl} from 'url';

const DEFAULT_FETCH_OPTIONS = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
};

export default class HttpClient {
  /**
   * Create a new HttpClient.
   *
   * @param {object} options
   * @param {object} [options.defaultFetchOptions]
   * @param {object[]} interceptors
   * @param {object} cache
   */
  constructor({
    defaultFetchOptions = DEFAULT_FETCH_OPTIONS,
    interceptors = [],
  } = {}) {
    this.activeRequestCount = 0;
    this.defaultFetchOptions = defaultFetchOptions;
    this.interceptors = interceptors;
  }

  /**
   * Returns content type from headers.
   *
   * @param {Headers} headers
   * @returns {string}
   */
  getContentType(headers) {
    if (!headers)
      return 'text';

    return (headers.get('Content-Type') || '')
      .startsWith('application/json') ? 'json' : 'text';
  }

  /**
   * Apply interceptors of a given type.
   *
   * @param {string} type
   * @param {*} data
   * @param {object} opts
   * @returns {*}
   */
  applyInterceptors(type, data = {}, opts) {
    return this.interceptors
      .reduce((data, i) => {
        if (i[type]) {
          return i[type](data, opts);
        }

        return data;
      }, data);
  }

  /**
   * Merge request recursively.
   *
   * @param {object} request
   * @returns {object}
   */
  mergeRequest(request = {}) {
    return {
      ...this.defaultFetchOptions,
      ...request,
      headers: {
        ...this.defaultFetchOptions.headers,
        ...request.headers,
      },
    };
  }

  /**
   * Issue HTTP request and handle errors.
   *
   * @param {String} url
   * @param {Object} request
   * @returns {Promise.<Response|Error>}
   */
  request(request) {
    this.activeRequestCount++;

    const timing = {start: new Date()};

    request = this.mergeRequest(request);

    if (request.headers && !(request.headers instanceof Headers))
      request.headers = new Headers(request.headers);

    request = this.applyInterceptors('request', request);

    request.url = formatUrl({
      pathname: request.pathname,
      query: request.query,
    });

    const contentType = this.getContentType(request.headers);

    const body = request.body && contentType === 'json'
      ? JSON.stringify(request.body) : null;

    request = {...request, body};

    const cachePromise = request.cache
      ? request.cache.get(request)
      : Promise.resolve(null);

    return cachePromise
      .then(response => {
        if (response) {
          response.fromCache = true;
          return response;
        }

        const {
          /* eslint-disable no-unused-vars */
          cache,
          pathname,
          url,
          query,
          /* eslint-enable no-unused-vars */
          ...fetchPayload,
        } = request;

        if (request.method === 'get')
          delete fetchPayload.body;

        fetchPayload.method = fetchPayload.method.toUpperCase();

        return fetch(request.url, fetchPayload)
          .then(response => {
            const contentType = this.getContentType(response.headers);

            // Null body status
            if (response.status === 204 || response.status === 205) {
              response.bodyData = null;
              return response;
            }

            return response[contentType]()
              .then(bodyData => {
                response.bodyData = bodyData;
                return response;
              })
              .then(response => {
                if (!response.ok)
                  throw new HttpError({response});

                return response;
              });
          });
      })
      .then(response => {
        if (request.cache && !response.fromCache)
          request.cache.set(request, response);

        response.request = request;
        return this.applyInterceptors('response', response);
      })
      .then(response => {
        this.activeRequestCount--;
        return response;
      })
      .catch(error => {
        this.activeRequestCount--;

        timing.end = new Date();

        Object.assign(error, {request, timing});

        this.applyInterceptors('responseError', error);

        throw error;
      });
  }
}

['get', 'post', 'put', 'patch', 'delete']
  .forEach(method => {
    HttpClient.prototype[method] = function (pathname, request) {
      return this.request({...request, method, pathname});
    };
  });
