const credentials = req.body;

const hash = bcrypt.hashSync(credentials.password, 14);

credentials.password = hash;

// move on to save the user.
