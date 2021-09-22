app.post("/api/register", async (req, res) => {
  // Get user informations from a request
  const { email, username, password } = req.body;
  try {
    // Look if user or pending user already exists
    const rUser = await User.find({ email });
    const pUser = await PendingUser.find({ email });
    // If he does, return an error
    if (pUser || rUser) {
      return res.status(422).send("User is already registered!");
    }

    // Create a new pending user
    const newUser = new PendingUser({ email, username, password });
    // Hash a password
    await newUser.hashPassword();
    // Send a confirmation email including a link to an activation endpoint
    // Link like: <a href="http://localhost:3000/api/activate/user/<userID>">Activate an account!</a>
    // Where <userID> is an ID of user that has been saved as a pending user
    await sendConfirmationEmail({
      toUser: newUser.data,
      hash: newUser.data._id,
    });

    // Save a pending user to DB
    const user = await newUser.save();
    // Success response
    res.json({ message: "You have been registered." });
  } catch (e) {
    // Error Response
    res.status(422).send(e.message);
  }
});
