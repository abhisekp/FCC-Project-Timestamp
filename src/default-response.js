const defaultResponse = (req, res) => {
  const docUrl = `${req.protocol}://${req.hostname}`;
  res.status(404).format({
    json: () => {
      res.send({
        documentation_url: docUrl,
        error: 404,
      });
    },
    html: () => {
      res.redirect(docUrl);
    },
  });
};
defaultResponse.defaultResponse = defaultResponse;

module.exports = defaultResponse;
