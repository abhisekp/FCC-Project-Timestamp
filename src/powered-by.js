const poweredBy = username => (req, res, next) => {
  res.set('x-powered-by', username);
  next();
};
poweredBy.poweredBy = poweredBy;

module.exports = poweredBy;
