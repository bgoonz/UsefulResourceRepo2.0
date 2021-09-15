export default (session: CookieSessionInterfaces.CookieSessionObject) => `
<pre>
${JSON.stringify({ session }, null, 2)}
</pre>
`;
