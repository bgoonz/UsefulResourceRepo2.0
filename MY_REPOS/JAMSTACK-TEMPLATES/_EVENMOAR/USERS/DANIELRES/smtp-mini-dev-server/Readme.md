# SMTP mini dev server

This provides a very basic, non-secure SMTP server to use in development, test and staging environments.

**Do not use this in production!**

Persistance is ephemeral, in-memory only.

I find this to be a convenient replacement for tools like [etherreal](https://ethereal.email), [mailcatcher](https://mailcatcher.me/) and similar.

## Features

- Simple, fast, lightweight.
- Convenient for e2e testing (Cypress, puppeteer, ...).
- Allows developers, testers, product managers to inspect sent emails, but guarantees no development/test/staging emails ever get sent to real recipients.
- Faster than using third-party services.

## Installation

`npm install --save-dev @danielres/smtp-mini-dev-server`\
or\
`yarn add -D @danielres/smtp-mini-dev-server`

## Usage

`node_modules/.bin/smtp-dev`\
or\
`yarn smtp-dev` \
starts the SMTP server on port `2500` and the api server on port `2501`.

Ports can be changed through environment variables:

Example: \
`DEV_SMTP_PORT=1234 DEV_SMTP_API_PORT=1235 yarn smtp-dev`

## Example usage with nodemailer (in non-production environments)

```
const config = {
  host: "localhost",
  port: 2500,
  secure: false,
  auth: {
    user: "username", // username and password don't matter, any are accepted
    pass: "password"
  }
};

const transport = nodemailer.createTransport(config);

const sendMessage = () => {
  const message = {
    from: "noreply@example.com",
    to: "...",
    subject: "...",
    text: "...",
    html: "<p>...</p>"
  };

  return new Promise((resolve, reject) => {
    transport.sendMail(message, (error, info, response) => {
      if (error) return reject(error);
      const url = `http://localhost:2501/${info.messageId}/html`;
      console.log({ url });
      resolve({ info, response, url });
    });
  });
};

sendMessage()
```

The url of the email message will appear in your terminal output (`console.log({ url })`).

You can now:

- visit `http://localhost:2501` for a list of all received messages.
- visit `http://localhost:2501/<MESSAGE_ID>` for all data related to a paticular message.
- view only specific data for a message:
  - `http://localhost:2501/<MESSAGE_ID>/html`
  - `http://localhost:2501/<MESSAGE_ID>/text`
  - ...

## Screenshots

![image](https://raw.githubusercontent.com/danielres/smtp-mini-dev-server/assets/homepage.png)

![image](https://raw.githubusercontent.com/danielres/smtp-mini-dev-server/assets/message-data.png)

![image](https://raw.githubusercontent.com/danielres/smtp-mini-dev-server/assets/message-html.png)
