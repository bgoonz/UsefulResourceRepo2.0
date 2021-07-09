//get the drop zone
let dropZone = document.getElementById("dropZone");

//set up the listeners to prevent propogation
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

//set up listeners for the drag and feedback
["dragenter", "dragover"].forEach((eventName) => {
  dropZone.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
  dropZone.classList.add("highlight");
}

function unhighlight(e) {
  dropZone.classList.remove("highlight");
}

//set up the drop handler
dropZone.addEventListener("drop", handleDrop, false);

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  handleFiles(files);
}

//the file handler
function handleFiles(files) {
  [...files].forEach(uploadFile);
}

function reportStatus(message) {
  document.getElementById("statusBox").innerHTML += message + "<br />";
  document.getElementById("statusBox").classList.add("highlight");
}

let url = new URL(document.location.href);
let searchParams = new URLSearchParams(url.search);

//get account info
const accountName = searchParams.get("accountName");
const containerName = searchParams.get("containerName");

//regenerate the valid SAS key
const sv = searchParams.get("sv");
var sasString = "?"; //reinsert the ?
sasString += "sv=" + sv;
const ss = searchParams.get("ss");
sasString += "&ss=" + ss;
const srt = searchParams.get("srt");
sasString += "&srt=" + srt;
const sp = searchParams.get("sp");
sasString += "&sp=" + sp;
const se = searchParams.get("se");
sasString += "&se=" + se;
const st = searchParams.get("st");
sasString += "&st=" + st;
const spr = searchParams.get("spr");
sasString += "&spr=" + spr;
const sig = searchParams.get("sig");
sasString += "&sig=" + encodeURIComponent(sig); //must be encoded

const containerURL = new azblob.ContainerURL(
  `https://${accountName}.blob.core.windows.net/${containerName}?${sasString}`,
  azblob.StorageURL.newPipeline(new azblob.AnonymousCredential())
);

async function uploadFile(file) {
  try {
    reportStatus("Uploading files...");
    const promises = [];
    const blockBlobURL = azblob.BlockBlobURL.fromContainerURL(
      containerURL,
      file.name
    );
    promises.push(
      azblob.uploadBrowserDataToBlockBlob(
        azblob.Aborter.none,
        file,
        blockBlobURL
      )
    );
    await Promise.all(promises);
    reportStatus(file.name + "File Uploaded.");
    listFiles();
  } catch (error) {
    reportStatus(error.body.message);
  }
}
