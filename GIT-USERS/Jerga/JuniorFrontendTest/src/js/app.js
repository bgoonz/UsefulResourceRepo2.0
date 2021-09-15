//DATA CONTROLLER

var dataController = (function () {
  var GitUser = function (user, repos) {
    this.user = JSON.parse(user);
    this.repos = JSON.parse(repos);
  };

  return {
    addUser: function (user, repos) {
      var gitUser = new GitUser(user, repos);
      return gitUser;
    },
  };
})();

// UI CONTROLLER

var UIController = (function () {
  var DOMstrings = {
    inputBtn: ".search-button",
    inputVal: ".input-value",
    userName: ".results__main__base__profile__info--username",
    firstName: ".results__main__base__profile__info--fname",
    bio: ".results__main__base__profile__info--bio",
    userPic: ".results__main__base__profile__picture",
    repos: ".results__main__base__results--repos",
    mainContainer: ".main-container__main__base",
    formError: ".search-box__github__main__base--error",
    form: ".search-box__github__main__base__form",
    searchBox: ".search-box__github__main__base",
  };

  return {
    getInput: function () {
      return {
        value: document.querySelector(DOMstrings.inputVal).value,
      };
    },

    getDOMStrings: function () {
      return DOMstrings;
    },

    renderProfile: function (gitUser) {
      document.querySelector(DOMstrings.userName).firstChild.innerHTML =
        "@" + gitUser.user.login;
      if (gitUser.user.name) {
        document.querySelector(DOMstrings.firstName).firstChild.innerHTML =
          gitUser.user.name;
      } else {
        document.querySelector(DOMstrings.firstName).firstChild.innerHTML =
          "Undefined";
      }
      if (gitUser.user.bio) {
        document.querySelector(DOMstrings.bio).firstChild.innerHTML =
          gitUser.user.bio;
      } else {
        document.querySelector(DOMstrings.bio).firstChild.innerHTML =
          "Undefined";
      }
      if (gitUser.user.avatar_url) {
        document.querySelector(DOMstrings.userPic).children[0].src =
          gitUser.user.avatar_url;
      }
    },

    renderRepos: function (gitUser) {
      var repos = gitUser.repos;
      var ulDOM = document.querySelector(DOMstrings.repos);
      var liDOM = "";

      if (repos) {
        repos.forEach(function (repo) {
          liDOM =
            "<li> <div class='results__main__base__results--repo'><h1><a target='_blank' href=" +
            repo.html_url +
            ">" +
            repo.name +
            " </a></h1></div> <div class='results__main__base__results--stats'><i class='ion-star'></i><span class='stats--likes'>" +
            repo.watchers +
            "</span><i class='ion-network'></i><span class='stats--forks'>" +
            repo.forks +
            "</span></div> </li>";
          ulDOM.insertAdjacentHTML("beforeend", liDOM);
        });
      }
    },

    cleanReposDOM: function () {
      var reposDOM = document.querySelector(DOMstrings.repos);
      while (reposDOM.firstChild) {
        reposDOM.removeChild(reposDOM.firstChild);
      }
    },

    showContainer: function () {
      document.querySelector(DOMstrings.mainContainer).style.display = "block";
    },

    hideContainer: function () {
      document.querySelector(DOMstrings.mainContainer).style.display = "none";
    },

    toggleError: function (err) {
      if (err) {
        document.querySelector(DOMstrings.formError).style.display = "block";
        document.querySelector(DOMstrings.form).style.height = "140px";
        this.hideContainer();
      } else {
        document.querySelector(DOMstrings.formError).style.display = "none";
        document.querySelector(DOMstrings.form).style.height = "none";
        document.querySelector(DOMstrings.form).style.height = "140px";
      }
    },

    renderShadow: function () {
      document.querySelector(DOMstrings.form).style.borderRadius = "30px";
      document.querySelector(DOMstrings.mainContainer).style.borderRadius =
        "30px";
      document.querySelector(DOMstrings.searchBox).style.borderRadius = "30px";
      document.querySelector(DOMstrings.mainContainer).style.boxShadow =
        "10px 20px 15px #cac9c9";
      document.querySelector(DOMstrings.form).style.boxShadow =
        "10px 10px 5px #cac9c9";
    },
  };
})();

//GLOBAL APP CONTROLLER

var controller = (function (dataCtrl, UICtrl) {
  var err = false;

  var setupEventListeners = function () {
    var DOM = UICtrl.getDOMStrings();

    document
      .querySelector(DOM.inputBtn)
      .addEventListener("click", function (e) {
        e.preventDefault();
        UICtrl.cleanReposDOM();
        ctrFetchUser(e);
      });
  };

  var ctrFetchUser = function (e) {
    var input = "";
    var gitUser = {};

    input = UICtrl.getInput();

    if (input.value !== "") {
      asyncGetCallToGit(input.value, false, function (user) {
        asyncGetCallToGit(input.value, true, function (repos) {
          err = false;
          UICtrl.toggleError(err);

          if (!err) {
            gitUser = dataCtrl.addUser(user, repos);
            UICtrl.showContainer();
            UICtrl.renderProfile(gitUser);
            UICtrl.renderRepos(gitUser);
            UICtrl.renderShadow();
          }
        });
      });
    }
  };

  var asyncGetCallToGit = function (username, repos, callback) {
    var reqURL = "https://api.github.com/users/" + username;
    reqURL += repos ? "/repos" : "";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", reqURL, true); // true for asynchronous
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === xmlHttp.DONE && xmlHttp.status === 200) {
        callback(xmlHttp.responseText);
      } else if (xmlHttp.status == 404) {
        err = true;
        UICtrl.toggleError(err);
      }
    };
    xmlHttp.send(null);
  };

  return {
    init: function () {
      console.log("App started!");
      setupEventListeners();
    },
  };
})(dataController, UIController);

controller.init();
