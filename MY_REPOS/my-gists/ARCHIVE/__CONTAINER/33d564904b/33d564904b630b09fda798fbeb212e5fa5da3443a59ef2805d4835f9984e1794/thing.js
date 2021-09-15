document.body.innerHTML = 'Paste or drop items onto this page. View results in console.';


function getPayload(item) {
  const kind = item.kind;
  switch (kind) {
    case 'string': return new Promise(res => item.getAsString(res));
    case 'file': return Promise.resolve(item.getAsFile());
    default: throw new Error('unknown item kind! ' + kind);  
  }    
}

function logObj(type, obj){ 
  console.log(`%c ${type} event`, 'font-weight: bold', new Date().toLocaleTimeString());
  
  const getPayloadAndType = item => {
    const type = item.type;
    return getPayload(item).then(payload => ({type, payload}));
  };

  Array.from(obj.items)
    .sort((a,b) => a.type.localeCompare(b.type))
    .forEach(item => Promise.resolve().then(_ => getPayloadAndType(item)).then(console.log));  
}

document.onpaste =  e => { logObj(e.type, e.clipboardData)};
document.ondrop = e => { e.preventDefault(); logObj(e.type, e.dataTransfer)};
document.ondragover = e => { e.preventDefault(); };

