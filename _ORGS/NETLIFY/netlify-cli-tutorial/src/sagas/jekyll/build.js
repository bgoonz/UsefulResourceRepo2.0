import { call, put } from 'redux-saga/effects';
import { addFile, addHistory } from '../../actions/base';
import { hidePrompt, clearPrompt } from '../../actions/prompt';
import { jekyllSite } from '../../lib/folders';
import { randomWait } from '../netlify/animations';


export function* build() {
  const start = new Date().getTime();
  yield put(hidePrompt());
  yield put(addHistory(`
    Configuration file: /jekyll-site/_config.yml
              Source: /jekyll-site
         Destination: /jekyll-site/_site`));
  yield call(randomWait);
  yield put(addHistory('      Generating...'));
  yield call(randomWait);
  const end = new Date().getTime();
  yield put(addHistory(`
                    done in ${((end - start) / 1000).toFixed(3)} seconds.`));

  yield put(addFile('jekyll-site/_site', jekyllSite._site));
  yield put(clearPrompt());
  yield put(addHistory(
    '',
    '__Awesome - lets do a manual deploy of the _site folder to netlify now__',
    '__Use the **netlify deploy** command to deploy a new site__',
    ''
  ));
}
