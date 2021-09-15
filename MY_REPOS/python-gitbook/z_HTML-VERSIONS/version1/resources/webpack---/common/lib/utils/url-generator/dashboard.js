'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.discoverSearch =
  exports.discover =
  exports.search =
  exports.createTeam =
  exports.teamInvite =
  exports.permissionSettings =
  exports.registrySettings =
  exports.settings =
  exports.home =
  exports.liked =
  exports.shared =
  exports.deleted =
  exports.recents =
  exports.templates =
  exports.alwaysOn =
  exports.repos =
  exports.drafts =
  exports.beta =
  exports.allSandboxes =
  exports.ALL_SANDBOXES_URL_PREFIX =
  exports.DASHBOARD_URL_PREFIX =
    void 0;
exports.DASHBOARD_URL_PREFIX = '/dashboard';
exports.ALL_SANDBOXES_URL_PREFIX = `${exports.DASHBOARD_URL_PREFIX}/all`;

function appendTeamIdQueryParam(url, teamId) {
  if (teamId) {
    return `${url}?workspace=${teamId}`;
  }
  return url;
}

function sanitizePath(path) {
  return path
    .split('/')
    .map((p) => p.split(' ').map(encodeURIComponent).join(' '))
    .join('/');
}
exports.allSandboxes = (path, teamId) =>
  appendTeamIdQueryParam(
    `${exports.ALL_SANDBOXES_URL_PREFIX}${sanitizePath(path)}`,
    teamId
  );
exports.beta = () => `${exports.DASHBOARD_URL_PREFIX}/beta`;
exports.drafts = (teamId) =>
  appendTeamIdQueryParam(`${exports.DASHBOARD_URL_PREFIX}/drafts`, teamId);
exports.repos = (teamId) =>
  appendTeamIdQueryParam(
    `${exports.DASHBOARD_URL_PREFIX}/repositories`,
    teamId
  );
exports.alwaysOn = (teamId) =>
  appendTeamIdQueryParam(`${exports.DASHBOARD_URL_PREFIX}/always-on`, teamId);
exports.templates = (teamId) =>
  appendTeamIdQueryParam(`${exports.DASHBOARD_URL_PREFIX}/templates`, teamId);
exports.recents = (teamId) =>
  appendTeamIdQueryParam(`${exports.DASHBOARD_URL_PREFIX}/recent`, teamId);
exports.deleted = (teamId) =>
  appendTeamIdQueryParam(`${exports.DASHBOARD_URL_PREFIX}/deleted`, teamId);
exports.shared = (teamId) =>
  appendTeamIdQueryParam(`${exports.DASHBOARD_URL_PREFIX}/shared`, teamId);
exports.liked = (teamId) =>
  appendTeamIdQueryParam(`${exports.DASHBOARD_URL_PREFIX}/liked`, teamId);
exports.home = (teamId) =>
  appendTeamIdQueryParam(`${exports.DASHBOARD_URL_PREFIX}/home`, teamId);
exports.settings = (teamId) =>
  appendTeamIdQueryParam(`${exports.DASHBOARD_URL_PREFIX}/settings`, teamId);
exports.registrySettings = (teamId) =>
  appendTeamIdQueryParam(
    `${exports.DASHBOARD_URL_PREFIX}/settings/npm-registry`,
    teamId
  );
exports.permissionSettings = (teamId) =>
  appendTeamIdQueryParam(
    `${exports.DASHBOARD_URL_PREFIX}/settings/permissions`,
    teamId
  );
exports.teamInvite = (teamId) =>
  appendTeamIdQueryParam(
    `${exports.DASHBOARD_URL_PREFIX}/settings/invite`,
    teamId
  );
exports.createTeam = (teamId) =>
  appendTeamIdQueryParam(
    `${exports.DASHBOARD_URL_PREFIX}/settings/new`,
    teamId
  );
exports.search = (query, teamId) => {
  let searchUrl = appendTeamIdQueryParam(
    `${exports.DASHBOARD_URL_PREFIX}/search`,
    teamId
  );
  if (searchUrl.includes('?')) {
    searchUrl += '&';
  } else {
    searchUrl += '?';
  }
  searchUrl += `query=${query}`;
  return searchUrl;
};
exports.discover = (teamId, albumId) => {
  if (albumId) {
    return appendTeamIdQueryParam(
      `${exports.DASHBOARD_URL_PREFIX}/discover/${albumId}`,
      teamId
    );
  }
  return appendTeamIdQueryParam(
    `${exports.DASHBOARD_URL_PREFIX}/discover`,
    teamId
  );
};
exports.discoverSearch = (query, teamId) => {
  let searchUrl = appendTeamIdQueryParam(
    `${exports.DASHBOARD_URL_PREFIX}/discover/search`,
    teamId
  );
  if (searchUrl.includes('?')) searchUrl += '&';
  else searchUrl += '?';
  searchUrl += `query=${query}`;
  return searchUrl;
};
