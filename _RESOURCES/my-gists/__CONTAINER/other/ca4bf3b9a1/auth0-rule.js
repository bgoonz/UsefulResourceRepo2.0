function (user, context, callback) {
  const namespace = 'YOUR_NAME_SPACE '; // optional if you want to setup roles
  
  if (user.email === 'YOUR_EMAIL') { // e.g test@gmail.com
    context.idToken[namespace + `/role`] = 'siteOwner'; // optional
    return callback(null, user, context);
  } else {
    return callback(new UnauthorizedError('Access denied.'));
  }
}