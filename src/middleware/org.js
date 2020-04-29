module.exports = (req, res, next) => {
  const { write_access } = req.user;
  if (!write_access) return res.status(401).send('Access denied, invalid credentials');
  return next();
};
