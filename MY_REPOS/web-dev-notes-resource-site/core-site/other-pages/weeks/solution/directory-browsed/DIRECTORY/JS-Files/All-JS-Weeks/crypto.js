const crypto = require('crypto');
// console.log(crypto.getHashes());

// const hasher = crypto.createHash('sha512');
// hasher.update('superSecurePassword1!');
// const digest = hasher.digest();
// console.log(digest.toString('base64'));

// const hasher2 = crypto.createHash('sha512');
// hasher2.update('superSecurePassword1!');
// const digest2 = hasher2.digest();
// console.log(digest2.toString('base64'));

// console.log(digest.toString('base64') === digest2.toString('base64'));

const password = 'superSecurePassword1!';
const util = require('util');
const salter = util.promisify(crypto.randomBytes);
const hasher = util.promisify(crypto.pbkdf2);

async function generateHashedPW(password) {
  const salt = (await salter(64)).toString('base64');
  const hashed = (await hasher(password, salt, 10000, 64, 'sha512')).toString('base64');
  const hashedPWForDB = `${salt}:${hashed}`;
  console.log(hashedPWForDB);
}

generateHashedPW('superSecurePassword1!');

async function checkPassword(password, hashedPW) {
  const [salt, hashed] = hashedPW.split(':');
  const attempt = await hasher(password, salt, 10000, 64, 'sha512');
  // console.log(attempt.toString('base64'));
  console.log(attempt.toString('base64') === hashed.toString('base64'));
}

checkPassword(
  'superSecurePassword1!',
  'sXwaDJqlzVy3frfCw0ptG7sogUrxPcwyMzbUaX5rTlRaG7nyZVvEU00+qkK1SxIKNVBVfyuA0DfW/n+6LOuqYA==:I83ah+6NzvBk+1UNmZh6FYja/Z+mdbZJtHjPWxh+x2HzScaXMKEDoYUWGZTjcZvx66lQKzOGmT2YzD/ODSBxmw=='
);
