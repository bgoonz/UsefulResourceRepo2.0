'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', {
          enumerable: true,
          value: v,
        });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.dashboard =
  exports.teamInviteLink =
  exports.getSandboxId =
  exports.privacyUrl =
  exports.tosUrl =
  exports.curatorUrl =
  exports.patronUrl =
  exports.searchUrl =
  exports.gitHubToSandboxBetaUrl =
  exports.gitHubToSandboxUrl =
  exports.optionsToParameterizedUrl =
  exports.githubRepoUrl =
  exports.profileLikesUrl =
  exports.profileSandboxesUrl =
  exports.teamOverviewUrl =
  exports.exploreUrl =
  exports.dashboardUrl =
  exports.profileUrl =
  exports.signInVercelUrl =
  exports.signInUrl =
  exports.signInPageUrl =
  exports.forkSandboxUrl =
  exports.frameUrl =
  exports.embedUrl =
  exports.sandboxUrl =
  exports.editorUrl =
  exports.uploadFromCliUrl =
  exports.newCxJSSandboxUrl =
  exports.newAngularSandboxUrl =
  exports.newSvelteSandboxUrl =
  exports.importFromGitHubUrl =
  exports.newVueSandboxUrl =
  exports.newPreactSandboxUrl =
  exports.newDojoSandboxUrl =
  exports.newReactTypeScriptSandboxUrl =
  exports.parcelSandboxUrl =
  exports.newSandboxUrl =
  exports.newSandboxWizard =
  exports.protocolAndHost =
  exports.host =
  exports.gitHubRepoPattern =
    void 0;
const is_server_1 = require('../templates/helpers/is-server');
const dashboard = __importStar(require('./url-generator/dashboard'));
exports.dashboard = dashboard;
exports.gitHubRepoPattern = /(https?:\/\/)?((www.)?)github.com(\/[\w-]+){2,}/;
const gitHubPrefix = /(https?:\/\/)?((www.)?)github.com/;
const dotGit = /(\.git)$/;
const sandboxHost = {
  'https://codesandbox.io': 'https://csb.app',
  'https://codesandbox.stream': 'https://codesandbox.dev',
};
const buildEncodedUri = (strings, ...values) =>
  strings[0] +
  values
    .map((value, i) => `${encodeURIComponent(value)}${strings[i + 1]}`)
    .join('');
exports.host = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.CODESANDBOX_HOST.split('//')[1];
  }
  if (process.env.LOCAL_SERVER) {
    return 'localhost:3000';
  }
  return process.env.DEV_DOMAIN;
};
exports.protocolAndHost = () => `${location.protocol}//${exports.host()}`;
exports.newSandboxWizard = () => `/s`;
exports.newSandboxUrl = () => `/s/new`;
exports.parcelSandboxUrl = () => `/s/vanilla`;
exports.newReactTypeScriptSandboxUrl = () => `/s/react-ts`;
exports.newDojoSandboxUrl = () => `/s/github/dojo/dojo-codesandbox-template`;
exports.newPreactSandboxUrl = () => `/s/preact`;
exports.newVueSandboxUrl = () => `/s/vue`;
exports.importFromGitHubUrl = () => `/s/github`;
exports.newSvelteSandboxUrl = () => `/s/svelte`;
exports.newAngularSandboxUrl = () => `/s/angular`;
exports.newCxJSSandboxUrl = () => `/s/github/codaxy/cxjs-codesandbox-template`;
exports.uploadFromCliUrl = () => `/s/cli`;
const sandboxGitUrl = (git) =>
  buildEncodedUri`github/${git.username}/${git.repo}/tree/${git.branch}/` +
  git.path;
exports.editorUrl = () => `/s/`;
exports.sandboxUrl = (sandboxDetails) => {
  if (sandboxDetails.git) {
    const { git } = sandboxDetails;
    return `${exports.editorUrl()}${sandboxGitUrl(git)}`;
  }
  if (sandboxDetails.alias) {
    return `${exports.editorUrl()}${sandboxDetails.alias}`;
  }
  return `${exports.editorUrl()}${sandboxDetails.id}`;
};
exports.embedUrl = (sandbox) => {
  if (sandbox.git) {
    const { git } = sandbox;
    return `/embed/${sandboxGitUrl(git)}`;
  }
  if (sandbox.alias) {
    return `/embed/${sandbox.alias}`;
  }
  return `/embed/${sandbox.id}`;
};
const stagingFrameUrl = (shortid, path) => {
  const stagingHost = (
    process.env.CODESANDBOX_HOST ? process.env.CODESANDBOX_HOST : ''
  ).split('//')[1];
  const segments = stagingHost.split('.');
  const first = segments.shift();
  return `${location.protocol}//${first}-${shortid}.${segments.join(
    '.'
  )}/${path}`;
};
exports.frameUrl = (
  sandbox,
  append = '',
  { useFallbackDomain = false, port = undefined } = {}
) => {
  const path = append.indexOf('/') === 0 ? append.substr(1) : append;
  const templateIsServer = is_server_1.isServer(sandbox.template);
  if (process.env.LOCAL_SERVER) {
    return `http://localhost:3002/${path}`;
  }
  if (process.env.STAGING) {
    return stagingFrameUrl(sandbox.id, path);
  }
  let sHost = exports.host();
  if (
    `https://${sHost}` in sandboxHost &&
    !useFallbackDomain &&
    !templateIsServer
  ) {
    sHost = sandboxHost[`https://${sHost}`].split('//')[1];
  }
  return `${location.protocol}//${sandbox.id}${port ? `-${port}` : ''}.${
    templateIsServer ? 'sse.' : ''
  }${sHost}/${path}`;
};
exports.forkSandboxUrl = (sandbox) => `${exports.sandboxUrl(sandbox)}/fork`;
exports.signInPageUrl = (redirectTo) => {
  let url = `/signin`;
  if (redirectTo) {
    url += '?continue=' + redirectTo;
  }
  return url;
};
exports.signInUrl = (extraScopes = false) =>
  '/auth/github' + (extraScopes ? '?scope=user:email,public_repo' : '');
exports.signInVercelUrl = () => '/auth/vercel';
exports.profileUrl = (username) => `/u/${username}`;
exports.dashboardUrl = () => `/dashboard`;
exports.exploreUrl = () => `/explore`;
exports.teamOverviewUrl = (teamId) => `/dashboard/teams/${teamId}`;
exports.profileSandboxesUrl = (username, page) =>
  `${exports.profileUrl(username)}/sandboxes${page ? `/${page}` : ''}`;
exports.profileLikesUrl = (username, page) =>
  `${exports.profileUrl(username)}/likes${page ? `/${page}` : ''}`;
exports.githubRepoUrl = ({ repo, branch, username, path }) =>
  buildEncodedUri`https://github.com/${username}/${repo}/tree/${branch}/` +
  path;
exports.optionsToParameterizedUrl = (options) => {
  const keyValues = Object.keys(options)
    .sort()
    .filter((a) => options[a])
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`
    )
    .join('&');
  return keyValues ? `?${keyValues}` : '';
};
exports.gitHubToSandboxUrl = (githubUrl) =>
  githubUrl.replace(gitHubPrefix, '/s/github').replace(dotGit, '');
exports.gitHubToSandboxBetaUrl = (githubUrl) =>
  githubUrl
    .replace(gitHubPrefix, '/github')
    .replace(dotGit, '')
    .replace(/\/tree\//, '/');
exports.searchUrl = (query) => `/search${query ? `?query=${query}` : ''}`;
exports.patronUrl = () => `/patron`;
exports.curatorUrl = () => `/curator`;
exports.tosUrl = () => `/legal/terms`;
exports.privacyUrl = () => `/legal/privacy`;

function getSandboxId() {
  const csbHost = process.env.CODESANDBOX_HOST;
  if (process.env.LOCAL_SERVER) {
    return document.location.hash.replace('#', '');
  }
  if (process.env.STAGING) {
    const segments = csbHost.split('//')[1].split('.');
    const first = segments.shift();
    const re = RegExp(`${first}-(.*)\\.${segments.join('\\.')}`);
    return document.location.host.match(re)[1];
  }
  let result;
  [csbHost, sandboxHost[csbHost]].filter(Boolean).forEach((tryHost) => {
    const hostRegex = tryHost.replace(/https?:\/\//, '').replace(/\./g, '\\.');
    const sandboxRegex = new RegExp(`(.*)\\.${hostRegex}`);
    const matches = document.location.host.match(sandboxRegex);
    if (matches) {
      result = matches[1];
    }
  });
  if (!result) {
    throw new Error(`Can't detect sandbox ID from the current URL`);
  }
  return result;
}
exports.getSandboxId = getSandboxId;
exports.teamInviteLink = (inviteToken) =>
  `${exports.protocolAndHost()}/invite/${inviteToken}`;
