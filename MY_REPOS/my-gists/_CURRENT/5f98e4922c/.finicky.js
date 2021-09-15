module.exports = {
  defaultBrowser: 'Safari',
  handlers: [
    // Anything localhost should open in Edge
    {
      match: finicky.matchHostnames(['localhost']),
      browser: 'Microsoft Edge',
    },

    // Launch Google Meet on my third user account
    {
      match: finicky.matchHostnames(['meet.google.com']),
      browser: 'Google Chrome',
      url: ({ url }) => {
        return {
          ...url,
          search: 'authuser=2',
        };
      },
    },

    // Zoom.us
    {
      match: /zoom.us\/j\//,
      browser: 'us.zoom.xos',
    },

    // Microsoft Teams
    {
      match: finicky.matchHostnames(['teams.microsoft.com']),
      browser: 'com.microsoft.teams',
      url: ({ url }) => {
        return {
          ...url,
          protocol: 'msteams',
        };
      },
    },

    // Screens.so
    {
      match: finicky.matchHostnames(['screen.so']),
      browser: 'so.screen.screen.app',
      url: ({ url }) => {
        return {
          hash: '',
          host: 'join',
          password: '',
          pathname: '',
          protocol: 'screen',
          search: 'roomId=' + url.hash.match(/\d{3}-\d{3}-\d{3}/),
          username: '',
        };
      },
    },

    // VSCode Liveshare
    {
      match: ({ url }) => {
        if (url.pathname !== '/join') {
          return false;
        }

        return finicky.matchHostnames(['prod.liveshare.vsengsaas.visualstudio.com'])({ url });
      },
      browser: 'com.microsoft.VSCode',
      url: ({ url, urlString }) => {
        if (url.pathname === '/join') {
          return {
            hash: '',
            host: 'ms-vsliveshare.vsliveshare',
            password: '',
            pathname: 'join',
            protocol: 'vscode',
            search: 'vslsLink=' + encodeURIComponent(urlString) + '&correlationId=null',
            username: '',
          };
        }

        return url;
      },
    },
  ],
};
