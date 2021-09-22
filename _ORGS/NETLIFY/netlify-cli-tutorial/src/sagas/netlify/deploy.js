import Rusha from 'rusha';
import { call, take, put, fork, join, select } from 'redux-saga/effects';
import { walkFiles, lookup } from '../../lib/filesystem';
import { addFile, addHistory } from '../../actions/base';
import { helpSeen } from '../../actions/help';
import { setPrompt, clearPrompt, hidePrompt } from '../../actions/prompt';
import { getFirstDeploySeen, getFiles, getCwd, getConf } from '../selectors';
import { authenticate } from './authentication';
import { deployAnimation } from './animations';

function* configureDeploy() {
  const cwd = yield select(getCwd);
  yield put(setPrompt('netlify', '? No site id specified, create a new site (Y/n) '));
  const result = yield take('NETLIFY');
  if (!(result.payload[0] == null || result.payload[0].match(/^y(es)?$/i))) {
    yield put(addHistory(
      '',
      '__Deploying to an existing site is cool, but for this tutorial, lets stick with a new one__',
      ''
    ));
  }
  yield put(setPrompt('netlify', '? Path to deploy? (current dir) '));
  const pathResult = yield take('NETLIFY');
  const conf = {path: pathResult.payload[0], siteId: null};
  if (cwd === '/static-site' && conf.path) {
    yield put(addHistory(
      '',
      '__To deploy the static-site folder, you really just want to pick the \'Current dir\' option__',
      ''
    ));
    return;
  }
  if (cwd === '/jekyll-site' && !(conf.path || '').match(/^\/?_site\/?$/)) {
    yield put(addHistory(
      '',
      '__The jekyll site will build it\'s output to the \'_site\' folder when you run \'jekyll build\'__',
      '__So make sure you set the path to deploy to \'_site\'__',
      ''
    ));
    return;
  }
  return conf;
}


function* createSite(api) {
  const siteResult = yield call([api, api.createSite]);
  return siteResult.data.id;
}

export function* deploy() {
  const files = yield select(getFiles);
  const cwd = yield select(getCwd);
  if (cwd === '' || ['/static-site', '/jekyll-site'].indexOf(cwd) === -1) {
    return yield put(addHistory(
      '',
      '__The real netlify CLI will let you push just about anything to our CDN__',
      '__However, for this demo - try one of the example sites.__',
      ''
    ));
  }

  if (cwd == '/jekyll-site') {
    if (!lookup(files, cwd, '_site')) {
      return yield put(addHistory(
        '',
        '__Make sure your run **jekyll build** to generate the _site folder before your deploy__',
        ''
      ));
    }
  }

  let conf = yield select(getConf);
  while (!conf) {
    conf = yield configureDeploy();
  }

  const api = yield authenticate();
  yield put(hidePrompt());
  if (!api) {
    yield put(addHistory(
      '',
      '__Authentication failed. Lets just do a fake demo deploy__',
      ''
    ));
    yield put(addHistory('Creating site...'));
    yield deployAnimation();
    yield put(addHistory('Congratulations - your site is live!'));

    yield put(addHistory(
      '',
      '__Since you didn\'t authenticate, we just faked this deploy, but this is really how easy it is to get a new site up on netlify__',
      ''
    ));

    yield put(clearPrompt);
    return;
  }
  if (!conf.site_id) {
    try {
      conf.site_id = yield createSite(api);
    } catch (e) {
      return yield put(addHistory('Site creation failed: ', e.toString()));
    }
  }
  const sha1 = new Rusha();
  const digests = {};
  const toUpload = {};
  walkFiles(files, cwd, conf.path, (path, content) => {
    const publicPath = path.replace(new RegExp(`${conf.path}`), '').replace(/\/+/, '/');
    digests[publicPath] = sha1.digest(content);
    toUpload[publicPath] = content;
  });
  yield put(hidePrompt());
  yield put(addHistory('Analyzing folder'));
  const deployResult = yield call([api, api.createDeploy], conf.site_id, {files: digests});
  const uploads = [];
  Object.keys(toUpload).forEach((path) => {
    if (deployResult.data.required.indexOf(digests[path]) > -1) {
      uploads.push([deployResult.data.id, `/${path}`, toUpload[path]]);
    }
  });
  const animation = yield fork(deployAnimation);
  yield uploads.map((upload) => call([api, api.uploadFile], ...upload));
  const siteResult = yield call([api, api.site], conf.site_id);
  yield join(animation);
  yield put(addHistory(
    '',
    'Your site has beeen deployed to:',
    '',
    `  [[${siteResult.data.url}]]`,
    ''
  ));
  const firstDeploySeen = yield select(getFirstDeploySeen);
  if (!firstDeploySeen) {
    yield put(addHistory(
      '',
      '__Awesome! You just deployed your first site to netlify.__',
      '__Now lets give it a better name. Try **netlify update --help**__',
      '__to see how that\'s done.__',
      ''
    ));
    yield put(helpSeen('firstDeploy'));
  }
  yield put(addFile(`${cwd}/.netlify`, JSON.stringify(conf)));
  yield put(clearPrompt());
}
