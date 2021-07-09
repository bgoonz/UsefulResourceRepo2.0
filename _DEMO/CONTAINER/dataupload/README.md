# Data Upload to Blob

**Produced by Dave Lusty**

## Introduction

This demo shows how to use HTML and Javascript to upload files to Azure. The site is hosted in a storage account to reduce costs since it requires no server side components. SAS keys can be used to control access via the URI. The upload happens through the storage SDK for Javascript (browser version) and so uses the API directly. For this reason there are no file size limits enforced from a server since there is "no server". The video is [here](https://youtu.be/3khzPbmHbAQ)

The site looks like the below image but has a basic CSS file included for you to modify. I'm not a web designer so it's pretty basic I'm afraid, but it is functional! (there's now a Website2 directory with a slightly nicer interface)

![website.png](images/website.png)

Special thanks on this demo goes to Joseph Zimmerman who posted [this excellent article](https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/). I especially like this kind of post because it doesn't lazily use libraries and obfuscate the technology. HTML and Javascript are all you need here besides the storage SDK (which is much more complex under the hood!).

## Demo

For this demo, you'll need a storage account and the code from this repository. Once the storage account is deployed you'll need to set a few things up to get up and running.

### Static Website on Blob

First, you'll want to set up using your storage account as a static website. This allows you to browse it without a costly web server. To do this, click static website in the settings menu and then type index.html in the index document name and click save. This will allow you to use the generated url without the /index.html part on the end. It's not entirely necessary since here we'll be supplying whole urls to people for security purposes.

![staticWebsite.png](images/staticWebsite.png)

Next, upload the files from the repository into the root of the new $web container that has been created for your site. You'll need to tell it to upload to a folder for the css, js and libs folders. **Please note that you'll need to download and extract the files from [here](https://aka.ms/downloadazurestoragejsblob) in the libs folder since I cannot republish them**. Once these are uploaded, create another container and call it "uploads". This container should be private since we don't want to give public access to the uploaded files.

### Set up CORS

In order for the scripting to work, you need to enable CORS on the storage account. Click on CORS under the settings menu and set up a rule. Your origin will be the full uri provided under the static website settings above. This includes the https:// part. Allow only PUT and then allow all headers and set the max age to something large. For production purposes you should carefully consider these settings, but the above are relatively locked down and we can be reasonably sure nothing odd will be hosted in your storage account's domain.

![set up CORS](images/cors.png)

### Generate the SAS Key

Next, click on Shared access signature on the settings menu to generate your SAS key. In future demos we'll do this programatically in order to give time limited links to people, but for now we'll generate it manually.
Select only Blob under allowed services, and then Object for resource types. Give the key write, add and create permissions and set a start and end time. Choose HTTPS only and click generate SAS and connection string.

![sasKey.png](images/sasKey.png)

Copy the resulting SAS token from the "SAS Token" box.

### website

Once you've completed the above steps, create your link as per this formula:

`https://<url>/index.html<SASKey>&accountName=<accountname>&containerName=<containername>`

Please note that there is no extra ? before the SAS key since it includes one already. The URL comes from your static website settings and the accountname is your storage account name. Container name is uploads and is the container you created above. Next, browse to the URI you created and you should see a site like the below:

![website.png](images/website.png)

You can either click the button to browse for files, or you can drag them into the dashed box. Either way they will upload to your storage account.

## Code

### HTML

The HTML file is fairly simple and just contains some div elements to house the form and drop zone.

```HTML
<!DOCTYPE html>
<html>
    <head>
        <title>BlobDrop</title>
        <link rel="stylesheet" type="text/css" href="css/site.css" />
    </head>
    <body>
        <div id="outerContainer">
            <div id="top"><span id="titleBar">BlobDrop</span></div>
            <div id="bottom">
                <div id="top-left">
                    <form>
                        <input type="file" id="fileElem" multiple accept="image/*" onchange="handleFiles(this.files)">
                        <label class="browseButton" for="fileElem"><span class="browseButtonText">Click to select some files</span></label>
                    </form>
                </div>
                <div id="top-right"><span class="dropZoneText">Drop Files Here</span></div>
                <div id="bottom-left"><span class="statusBox" id="statusBox"></span></div>
                <div id="bottom-right"></div>
            </div>
        </div>

        <script src="libs/azure-storage-blob.js" charset="utf-8"></script>
        <script src="js/drop.js" charset="utf-8"></script>
    </body>
</html>
```

### CSS

Most of the CSS is for presentation but includes functional things like highlights for the button and text responses.

```CSS
#outerContainer {
    position: absolute;
    top: 5vh;
    left: 5vw;
    margin: auto;
    border 3px solid black;
    border-radius: 1vw;
    width: 90vw;
    height: 90vh;
    background-color: mediumblue;
}

#top {
    position: absolute;
    top: 0vh;
    left: 0vw;
    border 2px solid black;
    border-radius: 1vw 1vw 0vw 0vw;
    width: 90vw;
    height: 10vh;
    background-color: grey;
}

#titleBar {
    position: absolute;
    bottom: 2vh;
    width: 100%;
    text-align: center;
    padding-right: 5vw;
    font-size: xx-large;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bolder;
    color: white;
}

#bottom {
    position: absolute;
    top: 10vh;
    left: 0vw;
    width: 90vw;
    height: 80vh;
    border 2px solid black;
    border-radius: 0px 0px 1vw 1vw;
    background-color: lightgrey;
}

#top-left {
    position: absolute;
    top: 3vh;
    left: 2vw;
    background-color: steelblue;
    width: 42vw;
    height: 35.5vh;

}

#fileElem {
    display: none;
}

.browseButton {
    position: absolute;
    margin: auto;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.browseButton:hover {
    background-color: #74A1C7;
}

.browseButtonText {
    position: absolute;
    top: 49%;
    width: 100%;
    text-align: center;
    font-size: xx-large;
    font-weight: bold;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#top-right {
    position: absolute;
    top: 3vh;
    right: 2vw;
    background-color: white;
    border-radius: 1vw;
    border: 0.2vw dashed grey;
    width: 42vw;
    height: 35.5vh;
}

.dropZoneText {
    position: absolute;
    top: 49%;
    width: 100%;
    text-align: center;
    font-size: xx-large;
    font-weight: bold;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#bottom-left {
    position: absolute;
    bottom: 3vh;
    left: 2vw;
    background-color: steelblue;
    width: 42vw;
    height: 35.5vh;

}

#statusBox {
    background-color: steelblue;
    text-align: left;
}

#statusBox.highlight {
    background-color: lightgreen;
}

#bottom-right {
    position: absolute;
    bottom: 3vh;
    right: 2vw;
    background-color: steelblue;
    width: 42vw;
    height: 35.5vh;

}

body {
    background-color: #323237;
}
```

### Javascript

The Javascript mainly consists of listeners to make the page work with drag and drop. Both the form and the drop action call a function to submit files to Blob. For this, we need to connect to the storage account specified in the URI with the SAS token and then push the files up one at a time.

```javascript
//get the drop zone
let dropZone = document.getElementById("top-right");

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
```
