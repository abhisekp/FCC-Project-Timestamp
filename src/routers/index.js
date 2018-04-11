import express from 'express';
import RateLimit from 'express-rate-limit';
import ms from 'ms';
import RedisStore from 'rate-limit-redis';
import totoro from 'totoro-node';

import getRedisClient from '../redis-client';
import APIRouter from './api';
import defaultResponse from '../default-response';

const Routers = express.Router();
Routers.Routers = Routers;

const apiLimiter = new RateLimit({
  store: new RedisStore({
    client: getRedisClient()
  }),
  windowMs: ms('15m'),
  max: 100 /* limit each IP to 100 requests per windowMs */,
  delayMs: 0 /* disable delaying - full speed until the max limit is reached */,
  headers: true,
});

Routers.use('/api', apiLimiter, APIRouter);

Routers.all('*', defaultResponse);

module.exports = Routers;
