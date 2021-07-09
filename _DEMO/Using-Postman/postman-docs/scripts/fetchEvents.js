const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const host = process.env.BFF_EVENTS_URL || ''

function fetchEvents() {
  if (host) {
    return fetch(host)
    .then(
      (res) => {
        res.text()
          .then((resp) => {
            if (resp) {
              const respData = JSON.parse(resp).data || { error: true };
              if (!respData.error) {
                fs.writeFile(path.join(
                  'bff-data',
                  'events.json',
                ), JSON.stringify(respData), (err) => {
                  if (err) {
                    /* eslint-disable no-console */
                    console.error(err);
                    /* eslint-enable */
                    process.exit(1);
                  }
                  /* eslint-disable no-console */
                  console.info('Success pre-render events data');
                  /* eslint-enable */
                });
              } else {
                console.log('The events endpoint returned unusable data..')
                fs.writeFile(path.join(
                  'bff-data',
                  'events.json',
                ), JSON.stringify({development: true}), (err) => {
                  if (err) {
                    /* eslint-disable no-console */
                    console.error(err);
                    /* eslint-enable */
                    process.exit(1);
                  }
                  /* eslint-disable no-console */
                  console.info('Success pre-render empty events data');
                  /* eslint-enable */
                });
              }
            } 
          })
        }
    )
    .catch(err => {
      console.error("Error when making BFF call... writing empty events.json", err)
      fs.writeFile(path.join(
        'bff-data',
        'events.json',
      ), JSON.stringify({development: true}), (err) => {
        if (err) {
          /* eslint-disable no-console */
          console.error(err);
          /* eslint-enable */
          process.exit(1);          
        }
        /* eslint-disable no-console */
        console.info('Success pre-render empty events data');
        /* eslint-enable */
      });
    })
  } else {
    console.log('No Events data endpoint provided.')
    fs.writeFile(path.join(
      'bff-data',
      'events.json',
    ), JSON.stringify({development: true}), (err) => {
      if (err) {
        /* eslint-disable no-console */
        console.error(err);
        /* eslint-enable */
        process.exit(1);
        throw err;
      }
      /* eslint-disable no-console */
      console.info('Success pre-render empty events data');
      /* eslint-enable */
    });
  }         
}

module.exports = fetchEvents;
