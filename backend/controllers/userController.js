export const userController = (req, res) => {
  const { name, email, password } = req.body;
  // Here you can add logic to handle user data, e.g., save to database
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }
  res.send({ message: "User created successfully", user: { name, email } });
};
