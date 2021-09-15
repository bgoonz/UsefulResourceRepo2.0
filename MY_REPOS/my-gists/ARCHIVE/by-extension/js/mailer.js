const nodemailer = require("nodemailer");

exports.sendConfirmationEmail = function ({ toUser, hash }) {
  // Return promise in order to use async/await or "then"
  return new Promise((res, rej) => {
    // Create transporter object with gmail service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      // provide your gmail email: e.g -> test@gmail.com
      // provide your gmail password
      // you can create .env file for this, see the instructions below
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    // Create a message you want to send to a user
    const message = {
      from: process.env.GOOGLE_USER,
      // to: toUser.email // in production uncomment this
      // While we are testing we want to send a message to our selfs
      to: process.env.GOOGLE_USER,
      subject: "Your App - Activate Account",
      html: `
        <h3> Hello ${toUser.username} </h3>
        <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
        <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/api/activate/user/${hash}">${process.env.DOMAIN}/activate </a></p>
        <p>Cheers</p>
        <p>Your Application Team</p>
      `,
    };

    // send an email
    transporter.sendMail(message, function (err, info) {
      if (err) {
        rej(err);
      } else {
        res(info);
      }
    });
  });
};
