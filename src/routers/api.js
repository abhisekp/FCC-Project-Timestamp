import express from 'express';
import APITimestampRouter from './timestamp';
import EAPINotFound from './EAPINotFound';

const API_VERSION = process.env.API_VERSION;

const APIRouter = express.Router();
APIRouter.APIRouter = APIRouter;

APIRouter.use('/t(ime)?s(tamp|tring)?', APITimestampRouter);
APIRouter.use('/v1/t(ime)?s(tamp|tring)?', APITimestampRouter);
// APIRouter.all('/', EAPINotFound());

export default APIRouter;
