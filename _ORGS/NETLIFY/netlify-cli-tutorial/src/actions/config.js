export function setConfig(config) {
  return {
    type: 'CONFIG_SET',
    payload: config
  };
}
