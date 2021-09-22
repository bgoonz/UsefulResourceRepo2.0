// 1. Open the browser developper console on the network tab
// 2. Start the video
// 3. In the dev tab, locate the load of the "master.json" file, copy its full URL
// 4. Run: node vimeo-downloader.js "<URL>"
// (done automatically now) 5. Combine the m4v and m4a files with mkvmerge

const fs = require('fs');
const url = require('url');
const https = require('https');
const { exec } = require('child_process');

let masterUrl = process.argv[2];
if (!masterUrl.endsWith('?base64_init=1')) {
  masterUrl+= '?base64_init=1';
}

getJson(masterUrl, (err, json) => {
  if (err) {
    throw err;
  }
  
  const videoData = json.video.sort((v1,v2) => v1.avg_bitrate - v2.avg_bitrate).pop();
  const audioData = json.audio.sort((a1,a2) => a1.avg_bitrate - a2.avg_bitrate).pop();
  
  const videoBaseUrl = url.resolve(url.resolve(masterUrl, json.base_url), videoData.base_url);
  const audioBaseUrl = url.resolve(url.resolve(masterUrl, json.base_url), audioData.base_url);
  
  processFile('video', videoBaseUrl, videoData.init_segment, videoData.segments, json.clip_id + '.m4v', (err) => {
    if (err) {
      throw err;
    }
    
    processFile('audio', audioBaseUrl, audioData.init_segment, audioData.segments, json.clip_id + '.m4a', (err) => {
      if (err) {
        throw err;
      }
      
      console.log('combining video and audio...');

      let combineCmd = 'ffmpeg -i ' + json.clip_id + '.m4v -i ' + json.clip_id + '.m4a -c copy ' + json.clip_id + '.mp4';

      exec(combineCmd, (err, stdout, stderr) => {
        if (err) {
          throw err;
        }
  
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);

        console.log('removing video and audio in favor of combined version...');

        fs.unlink(json.clip_id + '.m4v', (err) => {
          if (err) {
            throw err;
          }

          fs.unlink(json.clip_id + '.m4a', (err) => {
            if (err) {
              throw err;
            }

            console.log('all done');
          });
        });
      });
    });
  });
});

function processFile(type, baseUrl, initData, segments, filename, cb) {
  if (fs.existsSync(filename)) {
    console.log(`${type} already exists`);
    return cb();
  }
  
  const segmentsUrl = segments.map((seg) => baseUrl + seg.url);
  
  const initBuffer = Buffer.from(initData, 'base64');
  fs.writeFileSync(filename, initBuffer);
  
  const output = fs.createWriteStream(filename, {flags: 'a'});
  
  combineSegments(type, 0, segmentsUrl, output, (err) => {
    if (err) {
      return cb(err);
    }
    
    output.end();
    cb();
  });
}

function combineSegments(type, i, segmentsUrl, output, cb) {
  if (i >= segmentsUrl.length) {
    console.log(`${type} done`);
    return cb();
  }
  
  console.log(`Download ${type} segment ${i}`);
  
  https.get(segmentsUrl[i], (res) => {
    res.on('data', (d) => output.write(d));
    
    res.on('end', () => combineSegments(type, i+1, segmentsUrl, output, cb));
    
  }).on('error', (e) => {
    cb(e);
  });
}

function getJson(url, cb) {
  let data = '';
  
  https.get(url, (res) => {
    res.on('data', (d) => data+= d);
    
    res.on('end', () => cb(null, JSON.parse(data)));

  }).on('error', (e) => {
    cb(e);
  });
}