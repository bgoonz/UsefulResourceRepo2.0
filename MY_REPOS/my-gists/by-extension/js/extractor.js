const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Airtable = require('airtable');

const base = new Airtable({ apiKey: 'secret' }).base('appNUbQdF6KjbUOHy');

const DATA_PATH = '../content/json';

let speakers = {};
let meetups = {};

console.time('Extractor');

const eventDataFileNames = fs.readdirSync(DATA_PATH);

// filter meetups from speakers
const meetupFileNames = eventDataFileNames.filter(n => !n.includes('-'));
const speakerFileNames = eventDataFileNames.filter(n => n.includes('-'));

// load JSON data from separate files
speakers = readData(DATA_PATH, speakerFileNames);
meetups = readData(DATA_PATH, meetupFileNames);

// send meetups to Airtable
function pushMeetupsToAirtable() {
  Object.keys(meetups).map(meetupName => {
    base('Meetups').create(
      {
        Date: formatDate(meetups[meetupName].date),
        Counter: Number(meetupName.slice(0, -5)),
        URL: meetups[meetupName].eventUrl,
        Location: ['recRuUhnisxbIIyO5']
      },
      function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(record.getId());
      }
    );
  });
}

meetups = [];
base('Meetups')
  .select({
    maxRecords: 20,
    view: 'Grid groups'
  })
  .eachPage(
    function page(records, fetchNextPage) {
      records.forEach(function(record) {
        meetups.push({
          id: record.id,
          counter: record.get('Counter')
        });
      });
      fetchNextPage();
    },
    function done(err) {
      sendSpeakersToAirtable(speakers, meetups);
      if (err) {
        console.error(err);
        return meetups;
      }
    }
  );
console.timeEnd('Extractor');


function sendSpeakersToAirtable(speakers, meetups) {
  meetups.map(meetup => {
    Object.keys(speakers).map(speaker => {
      if (speakers[speaker].td === meetup.counter) {
        base('Presenters').create(
          {
            Name: speakers[speaker].title,
            Description:
              speakers[speaker].abstract || speakers[speaker].subtitle,
            URL: speakers[speaker].url,
            Meetups: [meetup.id]
          },
          function(err, record) {
            if (err) {
              console.error(err);
              return;
            }
            console.log(record.getId());
          }
        );
      }
    });
  });
}

function readData(dataPath, fileNames) {
  let files = {};
  try {
    for (let file of fileNames)
      files[file] = JSON.parse(
        fs.readFileSync(path.join(dataPath, file), 'utf8')
      );
  } catch (err) {
    console.log(`${chalk.red('ERROR!')} During data loading: ${err}`);
    process.exit(1);
  }
  return files;
}

// dd/mm/yyyy to mm/dd/yyyy
function formatDate(date) {
  const dateComponents = date.split('/');
  const day = dateComponents[0];
  const month = dateComponents[1];
  const year = dateComponents[2];

  return `${month}/${day}/${year}`;
}
