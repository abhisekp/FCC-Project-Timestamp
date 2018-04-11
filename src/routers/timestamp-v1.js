import express from 'express';
import { isNil, defaults } from 'lodash/fp';
import Time from '../lib/timestamp';

const APITimestampRouter = express.Router();

const setTimestampResponse = defaults({
  unix: null,
  natural: null,
});

APITimestampRouter.get('/(:timestring)?', (req, res) => {
  let { timestring } = req.params;
  
  if (isNil(timestring)) {
    // set timestring to the current date
    timestring = String(Math.round(Date.now() / 1e3));
  }
  
  const time = Time(timestring);
  
  
  if (!time.isValid()) {
    const response = setTimestampResponse({});
    res.json(response);
    return undefined;
  }
  
  const response = setTimestampResponse({
    unix: time.getUnixTimestamp(),
    natural: time.getNaturalTimestamp(),
  });
  
  res.json(response);
});

export default APITimestampRouter;
