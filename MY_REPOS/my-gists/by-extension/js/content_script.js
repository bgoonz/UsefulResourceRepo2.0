// assumes fetch/promises

var baseUrl = 'https://api.github.com/search/issues';

// "/babel/babel-eslint/pull/1"
var pathNameArr = window.location.pathname.split("/");
var org = pathNameArr[1]; // babel
var repo = pathNameArr[2]; // babel-eslint
var orgRepoPath = org + "/" + repo; // babel/babel-eslint

var loggedInUser = document.querySelector('.js-menu-target').getAttribute('href').slice(1) || '';
// console.log(loggedInUser);
var contributor = document.querySelector('a.author').text.trim();
// console.log(contributor);

function queryParams(contributor, checkRepo) {
  if (checkRepo) {
    checkRepo = "+repo:" + org + "/" + repo;
  } else {
    checkRepo = "";
  }

  return "?q=type:pr+-user:" + contributor + "+author:" + contributor + checkRepo
  "&sort=created&order=asc&per_page=1";
}

function loadData(contributor, checkRepo){
  if (loggedInUser === contributor) {
    return;
  }

  var searchURL = baseUrl + queryParams(contributor, checkRepo);
  // console.log(searchURL);

  return fetch(searchURL)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log('parsed json', json);
    return json.total_count;
  }).catch(function(ex) {
    console.log('parsing failed', ex);
  });
}

// all repos
loadData(contributor)
.then(function(count) {
  console.log(count + " PRs made total");
});

// repo specific
loadData(contributor, true)
.then(function(count) {
  console.log(count + " PRs made to " + orgRepoPath);
});
