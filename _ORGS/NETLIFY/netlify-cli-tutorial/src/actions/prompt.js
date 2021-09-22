export function setOptions(handler, options) {
  return {
    type: 'PROMPT_SET',
    payload: {handler, options}
  };
}

export function setPrompt(handler, text, data) {
  return {
    type: 'PROMPT_SET',
    payload: {handler, text, data}
  };
}

export function clearPrompt() {
  return {
    type: 'PROMPT_SET',
    payload: {
      text: '$ '
    }
  };
}

export function hidePrompt() {
  return {
    type: 'PROMPT_SET',
    payload: {
      text: null
    }
  };
}
