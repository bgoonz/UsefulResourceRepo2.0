//notify.js

/**
Mesibo invokes various Listeners for various events.
For example, when you receive a message, receive an incoming call etc
MesiboNotify is a class of listeners that can be invoked to get real-time notification of events
**/

function MesiboNotify(s) {
  this.scope = s;
}

// You will receive the connection status here
MesiboNotify.prototype.Mesibo_OnConnectionStatus = function (status, value) {
  MesiboLog("MesiboNotify.prototype.Mesibo_OnConnectionStatus: " + status);
  // this.scope.OnConnectionStatus(status, value);
};

// You will receive status of sent messages here
MesiboNotify.prototype.Mesibo_OnMessageStatus = function (m) {
  MesiboLog(
    "MesiboNotify.prototype.Mesibo_OnMessageStatus: from " +
      m.peer +
      " status: " +
      m.status
  );
  this.scope.onMessageStatus(m);
};

// You will receive messages here
MesiboNotify.prototype.Mesibo_OnMessage = function (m, data) {
  MesiboLog(
    "MesiboNotify.prototype.Mesibo_OnMessage: from " + m.peer,
    " data ",
    data
  );
  this.scope.onMessage(m, data);
};

// You will receive calls here
MesiboNotify.prototype.Mesibo_OnCall = function (callid, from, video) {
  MesiboLog("Mesibo_OnCall: " + callid + " " + from + " " + video);
  this.scope.onCall(callid, from, data);
};

// You will receive call status here
MesiboNotify.prototype.Mesibo_OnCallStatus = function (callid, status) {
  MesiboLog("Mesibo_onCallStatus: " + callid + " " + status);
  this.scope.onCallStatus(callid, status);
};
