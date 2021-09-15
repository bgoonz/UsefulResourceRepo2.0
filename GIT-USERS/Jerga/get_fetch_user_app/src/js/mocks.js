var testing = (function () {
  return {
    asyncGetCallToGit: function (username, repos, state) {
      var reqURL = "https://api.github.com/users/" + username;
      reqURL += repos ? "/repos" : "";
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", reqURL, true); // true for asynchronous
      xmlHttp.onload = function () {
        if (xmlHttp.readyState === xmlHttp.DONE && xmlHttp.status === 200) {
          state.done = true;
        } else if (xmlHttp.status == 404) {
          state.done = false;
        }
      };
    },
  };
})();
