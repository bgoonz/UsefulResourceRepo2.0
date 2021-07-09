const sh = require('shelljs');
const pingWebHook = require('./scripts/pingWebHook');
const fetchBlogPosts = require('./scripts/fetchBlogPosts');
const fetchEvents = require('./scripts/fetchEvents')

const prefetch = async (dir, response) => {
  sh.exec('mkdir -p bff-data');
  await pingWebHook();
  fetchBlogPosts();
  fetchEvents();
};

prefetch();