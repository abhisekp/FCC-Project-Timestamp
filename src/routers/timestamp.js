const express = require('express');
const Time = require('../lib/timestamp');
const router = express.Router();
router.get('/:timestring?', (req, res) => {
  const time = Time(req.params.timestring);
  res.set('Cache-Control', 'no-store');
  res.json({ unix: time.getUnixTimestamp(), natural: time.getNaturalTimestamp() });
});
module.exports = router;
