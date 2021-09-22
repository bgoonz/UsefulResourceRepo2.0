//core.js

function MesiboApp(s) {
  // MesiboLog('MesiboApp', s);
  this.scope = s;
  this.api = {};
  this.init();
}

MesiboApp.prototype.init = function () {
  this.api = this.scope.getMesibo();
};

MesiboApp.prototype.displayContacts = function (contacts) {
  if (!isValid(contacts)) return -1;
  this.scope.setAvailableUsers(contacts);
  return 0;
};

MesiboApp.prototype.fetchContacts = async function (userToken, ts, phones) {
  MesiboLog("fetchContacts called");
  if (!isValidString(userToken)) return -1;
  if (!isValid(ts)) ts = 0;
  if (!isValid(phones) || !isValid(phones.length) || !phones.length)
    phones = [];

  if (!isValidString(MESIBO_API_BACKEND)) return -1;
  //Request to back-end service, to fetch contact details and profile details
  const response = await fetch(
    MESIBO_API_BACKEND +
      "?op=getcontacts&token=" +
      userToken +
      "&ts=" +
      ts +
      "&phones=" +
      phones
  );

  const contacts_bundle = await response.json(); //extract JSON from the HTTP response
  MesiboLog(contacts_bundle);

  if (contacts_bundle.result != "OK") {
    MesiboLog("Error: fetchContacts: getcontacts request failed");
    return -1;
  }

  this.scope.self_user = contacts_bundle.u;

  MESIBO_DOWNLOAD_URL = contacts_bundle["urls"]["download"];
  MESIBO_UPLOAD_URL = contacts_bundle["urls"]["upload"];

  var contacts = contacts_bundle.contacts;
  if (!isValid(contacts) || !contacts.length) return -1;

  var available_contacts = [];

  contacts.forEach((elem, index) => {
    var c = {};
    c.address = elem.phone;
    c.groupid = parseInt(elem.gid);
    c.picture = elem.photo;
    c.name = elem.name;
    c.ts = parseInt(elem.ts);
    c.status = elem.status;
    if (c.groupid != 0) c.members = elem.members;

    var rv = this.api.setContact(c);

    available_contacts.push(c);
  });

  MesiboLog(available_contacts);
  if (-1 == this.displayContacts(available_contacts)) {
    MesiboLog("Error: fetchContacts: displayContacts failed");
    return MESIBO_RESULT_FAIL;
  }

  MesiboLog("fetchContacts Successful");
};
