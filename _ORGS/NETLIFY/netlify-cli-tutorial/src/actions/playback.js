import { setConfig } from './config';

function runNext(dispatch, current, actions) {
  var head = actions[0];
  var tail = actions.slice(1);
  dispatch(head.action);
  dispatch(setConfig({currentAction: current}));
  if (tail.length) {
    setTimeout((() => runNext(dispatch, current + 1, tail)), (tail[0].TS - head.TS));
  }
}

export function playback(session) {
  return (dispatch, getState) => {
    const { config } = getState();
    if (!(config.logger && config.credentials)) { return; }

    const { user, pass } = config.credentials;

    fetch(config.logger + '/' + session, {
      headers: {Authorization: 'Basic ' + btoa(`${user}:${pass}`)}
    }).then((response) => response.json())
      .then((json) => {
        const actions = json.map((action) => {
          const data = JSON.parse(action.Data);
          return {TS: new Date(action.CreatedAt).getTime(), order: data.order, action: data.action};
        }).sort((a, b) => a.order - b.order);
        dispatch(setConfig({totalActions: actions.length}));
        runNext(dispatch, 1, actions);
      });
  };
}
