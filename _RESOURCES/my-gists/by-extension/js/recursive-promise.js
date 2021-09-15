const got = require('got');
const querystring = require('querystring');
const Promise = require('bluebird');
let url = [
           "https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=abc-news-au&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=associated-press&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=business-insider-uk&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=buzzfeed&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=daily-mail&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=engadget&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=entertainment-weekly&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=fox-sports&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=ign&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=independent&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=mirror&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=mashable&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=mtv-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=new-scientist&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=newsweek&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=new-york-magazine&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=nfl-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=recode&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=reddit-r-all&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=reuters&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=sky-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=techradar&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-economist&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-guardian-au&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-huffington-post&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-lad-bible&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-telegraph&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-washington-post&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=time&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=usa-today&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           ]


// cron.schedule('43,44 19 * * *', () => {

// })

let files = [];
let newsApiUrls = [];
let newFiles = [];
let num = 0;
function start(ApiUrls, ApiUrlsLength){
    const deferred = Promise.defer();

    if(num < ApiUrlsLength){
      console.log('inside if')
      console.log(num, ApiUrlsLength)
      num++;

      got(`https://joanfihu-article-analysis-v1.p.mashape.com/link?entity_description=False&link=${ApiUrls[num]}`, {
        headers: {
          "X-Mashape-Key": "PRcyspm59vmsh7X8ue7NfZFzZz7op1oAfxsjsnCLMHQkRfnvUL",
        },
        json: true
      })
      .then(res => {
        newFiles.push(res);
        start(ApiUrls, ApiUrlsLength)
        .then(() => deferred.resolve(newFiles))
        .catch(() => deferred.reject())
      })
      .catch( err => deferred.reject())
    } else {
      deferred.resolve(newFiles);
    }

  return deferred.promise;
}

for(var i = 0; i < url.length; i++) {
  files.push(got(url[i]));
}
Promise.map(files, (x) => {
  return x.body;
})
.then(response => {
  for(var i = 0; i < response.length; i++) {
    let data = JSON.parse(response[i]);
    for(var j = 0; j < data.articles.length; j++) {
      let newUrls = encodeURIComponent(data.articles[j].url.trim());
      newsApiUrls.push(newUrls);
    }
  }
})
  .then(() => {
    start(newsApiUrls, newsApiUrls.length - 1)
    .then(result => {
      // Result of all data from Urls
      console.log('FINAL RESULT', result);
    })
  })
  .catch(error => {
    console.log(error);
  });
