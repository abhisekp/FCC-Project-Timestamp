const express = require('express');
const timestampRouter = require('./timestamp');
const router = express.Router();
router.use('/t(ime)?s(tamp|tring)?', timestampRouter);
router.use('/v1/t(ime)?s(tamp|tring)?', timestampRouter);
module.exports = router;
