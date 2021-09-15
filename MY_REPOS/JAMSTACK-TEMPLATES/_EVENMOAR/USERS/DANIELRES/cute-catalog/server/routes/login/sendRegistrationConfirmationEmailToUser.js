const htmlToText = require("html-to-text");
const sgMail = require("@sendgrid/mail");

const ServerError = require("../../ServerError");
const createToken = require("../../helpers/jwt/createToken");

const { SENDGRID_FROM_EMAIL } = process.env;
const { SENDGRID_API_KEY } = process.env;
const { SITE_URL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const { REGISTRATION_TOKEN_MAX_AGE } = process.env; // in days

const getConfirmationTokenForUserId = (userId) =>
  createToken({
    payload: { userId },
    expiresIn: 60 * 60 * 24 * REGISTRATION_TOKEN_MAX_AGE,
  });

const getConfirmationUrlForUserId = (userId) => {
  const token = getConfirmationTokenForUserId(userId);
  return `${SITE_URL}/register/confirm/${token}`;
};

const sendRegistrationConfirmationEmailToUser = async (user) => {
  const confirmationUrl = getConfirmationUrlForUserId(user.id);
  const html = `
    <h2>Thank you for registering!</h2>
    <p>Please activate your account by opening the link below.</p>
    <p>Please note that this link will expire in ${REGISTRATION_TOKEN_MAX_AGE} days</p>
    <p><a href="${confirmationUrl}" target="_blank">${confirmationUrl}</a></p>
  `;

  const text = htmlToText.fromString(html);

  const email = {
    from: SENDGRID_FROM_EMAIL,
    to: user.email,
    subject: "Please confirm your email",
    html,
    text,
  };

  sgMail.send(email, (e) => {
    if (e)
      throw new ServerError(
        500,
        `Sending registration confirmation email failed for user with id ${user.id}`,
        e
      );
  });
};

module.exports = sendRegistrationConfirmationEmailToUser;
