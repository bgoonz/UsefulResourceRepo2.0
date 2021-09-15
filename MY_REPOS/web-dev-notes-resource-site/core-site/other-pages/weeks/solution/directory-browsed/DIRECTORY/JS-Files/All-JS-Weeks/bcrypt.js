const bcrypt = require('bcryptjs');

async function generatePW(password) {
  console.log(await bcrypt.hash(password, 8));
}

async function checkPassword(password, hashedPW) {
  const isPassword = await bcrypt.compare(password, hashedPW);
  if (isPassword) {
    console.log('user verified');
  } else {
    console.log('invalid login credentials');
  }
}

// generatePW('password');

checkPassword('password', '$2a$08$HdI2gwHBFqsIL/20epTCxOq19jexX/riLh/uA2e4xis5F9/nI..2O');
