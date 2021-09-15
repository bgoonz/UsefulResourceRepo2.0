const User = require('./user-model.js');
router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(&nbsp;err => {});
});