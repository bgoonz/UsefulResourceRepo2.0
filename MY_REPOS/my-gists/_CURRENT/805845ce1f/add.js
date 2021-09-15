function add(user) {
  db('users').insert(user)
    .then(ids => {
      return findById(ids[0]);
    });
}