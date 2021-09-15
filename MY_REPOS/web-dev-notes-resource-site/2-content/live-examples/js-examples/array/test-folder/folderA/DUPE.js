const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const crypto = require('crypto');
const path = require('path');

const pathA = "."; // working directory
const pathB = "./../folderB/folderD"; //directory to check for duplicates.  pathB = "/path/to/the/directory/you/want/to/compare/it/to";


let hashes = []; // where hashes will be stored also with file info!


function hashDirIn(folder) {
	let pathPromiseA = fs.readdirAsync(folder).map(function(fileName) {
		let filePath = path.join(folder, fileName);
		let statPromise = fs.statAsync(filePath);
		
		return Promise.join(statPromise, fileName, function(statPromise, fileName) {
			
			if(statPromise.isFile()) {

				function makeStream(file, callback) {
					let result = fs.createReadStream(filePath);
					return callback(result);
				}

				function process(stream) {
					let hash = crypto.createHash('md5'); 
					return new Promise(function(resolve, reject) {
						stream.on('data', function updateProcess(chunk) {
							hash.update(chunk, 'utf8');
						});
						stream.on('end', resolve);
					}).then(function publish() {
						let digest = hash.digest('hex');
						hashes.push({digest:digest, path:filePath});
					});
				}

				return makeStream(fileName, process);

			} // endif :p

		});

	}).then(function(){
		// sort and display duplicates
		if(i==1) {
			hashes.sort(function(a, b) {
				if (a.digest < b.digest) {
					return -1;
				}
				if (a.digest > b.digest) {
					return 1;
				}
				return 0;
			});
			var dupe = 1;
			hashes.map(function(obj, index) {
					if (index-1 >= 0) {
					if(obj.digest == hashes[index-1].digest) {
						console.log("Dupe "+dupe+" found:");
						console.log(obj.path);
						console.log("Equal to:")
						console.log(hashes[index-1].path+"\n");
						dupe++;
					}
				}
			});
		}
		i++; 
	});
}
var i = 0;
hashDirIn(pathA);
hashDirIn(pathB);



//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------



//! WHEN: 
//---> const pathA = "."; // working directory
//---> const pathB = "./../folderB";


/*
\___________________________________________________
bryan_dir:folderA_exitstatus:0 ====>

node DUPE.js
Dupe 1 found:
../folderB/array-concat.js
Equal to:
array-concat.js


\___________________________________________________
bryan_dir:folderA_exitstatus:0 ====>
*/
