const argon2 = require('argon2');

async function generatePW(password) {
  console.log(await argon2.hash(password));
}

async function checkPassword(password, hashedPW) {
  const isPassword = await argon2.verify(hashedPW, password);
  if (isPassword) {
    console.log('user verified');
  } else {
    console.log('invalid login credentials');
  }
}

// generatePW('strongPW');

checkPassword(
  'strongPW',
  '$argon2i$v=19$m=4096,t=3,p=1$58odRu5uqewGW6zL8cjsMw$YImuYrbTni3q5N7TLzSUWqVZpcCjcBtuA+KeQGWAhUM'
);
