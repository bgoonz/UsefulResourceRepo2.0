const { escape } = require("./helpers");

module.exports = ({ messages }) => `
  <style type="text/css">
    body { font-family: sans-serif; font-size: small}
    h1 { font-weight: normal }
    dt { font-weight: bold; width: 10rem }
    dt, dd { display: inline-block }
    dl { display: block; margin: 0 }
    a, a:visited { text-decoration: none}
    hr { border-top: 1px solid #eee }
  </style>

  <body>
    <h1>Messages</h1>
    ${messages
      .map(
        v => `
          <dl>
            <dt>MessageId</dt>
            <dd>
              <a href="/${v.messageId}">${escape(v.messageId)}</a>
            </dd>
          </dl>
          <dl>
            <dt>From</dt>
            <dd>${escape(v.from.text)}</dd>
          </dl>
          <dl>
            <dt>To</dt>
            <dd>${escape(v.to.text)}</dd>
          </dl>
          <dl>
            <dt>Subject</dt>
            <dd>${escape(v.subject)}</dd>
          </dl>
          <dl>
            <dt>Date</dt>
            <dd>${v.date}</dd>
          </dl>
          <dl>
            <dt>text</dt>
            <dd> 
              <a href="/${v.messageId}/text">
                ${v.text.substring(0, 80)}...
              </a>
            </dd>
          </dl>
          <dl>
            <dt>html</dt>
            <dd> 
              <a href="/${v.messageId}/html">
                ${escape(v.html.substring(0, 80))}...
              </a>
            </dd>
          </dl>
        `
      )
      .join(`<hr/>`)}
  </body>
`;
