const path = require('node:path');
const express = require('express');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const apiRouter = require('./routers/api');

function createApp({ rateLimitMax = 100 } = {}) {
  const app = express();
  app.disable('x-powered-by');
  // Vercel supplies one trusted forwarding hop. Direct/local hosting trusts none.
  if (process.env.VERCEL === '1') app.set('trust proxy', 1);
  app.use(helmet());
  app.use(express.static(path.join(__dirname, '../public')));
  app.get('/health', (req, res) => res.json({ status: 'ok' }));
  app.use('/api', rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: rateLimitMax,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Too many requests. Please try again later.' },
  }), apiRouter);
  app.use((req, res) => res.status(404).json({ error: 404, documentation_url: '/' }));
  app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    res.status(error instanceof URIError ? 400 : 500).json({
      error: error instanceof URIError ? 'Invalid URL encoding' : 'Internal server error',
    });
  });
  return app;
}

const app = createApp();
module.exports = app;
module.exports.createApp = createApp;
if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  app.listen(port, () => console.log(`Timestamp service listening on port ${port}`));
}
