// config.js

const MESIBO_APP_ID = "live";

const MESIBO_API_BACKEND = "https://app.mesibo.com/conf/api.php";

/* If you are hostingZumzibackend on your own server,
 * use your own captcha token
 */
const MESIBO_CAPTCHA_TOKEN = "6LceR_sUAAAAAEfV7LZK2cOaOHRzPSCNEK-_jcfU";

/* File url sources */
var MESIBO_DOWNLOAD_URL = "https://appimages.mesibo.com/";
var MESIBO_UPLOAD_URL = "https://s3.mesibo.com/api.php";

/* Debug Mode Configuration */
isDebug = true; // toggle this to turn on / off for global control
if (isDebug) var MesiboLog = console.log.bind(window.console);
else var MesiboLog = function () {};

var ErrorLog = console.log.bind(window.console);
/*ErrorLog(function_name, error_msg)*/

const RESULT_FAIL = -1;
const RESULT_SUCCESS = 0;
