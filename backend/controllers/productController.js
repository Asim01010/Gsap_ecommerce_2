export const getProducts = (req, res) => {
  //   res.send("Get all products");

  const firstName = req.body.firstName;
  res.send(`Product requested by ${firstName}`);

  if (!firstName) {
    throw new Error("First name is required");
  }
};
