const express = require("express");
const router = express.Router();
const passport = require("passport");
const Employee = require("../../models/Employee");

// Validation
const validateEmployeeInput = require("../../validation/employee");

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
});

router.post("/", (req, res) => {
  const { errors, isValid } = validateEmployeeInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newEmployee = new Employee({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
  });

  newEmployee.save().then((post) => res.json(post));
});

module.exports = router;
