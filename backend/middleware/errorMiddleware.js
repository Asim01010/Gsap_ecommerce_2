export const errorMsg = (err, req, res, next) => {
  res.json({ message: err.message });
};
