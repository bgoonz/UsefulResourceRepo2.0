//utils.js

let decodeString = (s) => {
  // console.log(s);
  if (!s) return "";
  return new TextDecoder("utf-8").decode(s);
};

let isValidString = (ele) => {
  return isValid(ele) && "" != ele;
};

// One validation function for all file types
let isValidFileType = (fName, fType) => {
  var extensionLists = {}; //Create an object for all extension lists
  extensionLists.video = ["m4v", "avi", "mpg", "mp4", "webm"];
  extensionLists.image = ["jpg", "gif", "bmp", "png"];
  extensionLists.audio = ["mp3", "mp4", "aac", "flac", "m4a", "wva"];
  extensionLists.document = ["doc", "txt", "pdf", "docx", "xls", "xlx"];
  return extensionLists[fType].indexOf(fName.split(".").pop()) > -1;
};

let isValid = (ele) => {
  return null != ele && undefined != ele && NaN != ele;
};

let isValidImage = (fName) => {
  if (!isValidString(fName)) return false;

  return isValidFileType(fName, "image");
};

let isGroup = (user) => {
  if (!isValid(user)) return false;

  if (undefined == user.groupid) return false;

  return user.groupid > 0;
};

let setElementDimension = (id, val, width) => {
  if (!isValid(ele) || !isValid(val) || val <= 0 || !isValid(width)) return -1;

  var ele = document.getElementById(id);
  if (!isValid(ele)) return -1;

  if (width) ele.style.width = val + "px";
  else ele.style.height = val + "px";
};
