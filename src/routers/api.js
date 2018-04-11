import express from 'express';
import APITimestampRouter from './timestamp';

const API_VERSION = process.env.API_VERSION;

const APIRouter = express.Router();
APIRouter.APIRouter = APIRouter;

APIRouter.use('/t(ime)?s(tamp|tring)?', APITimestampRouter);

module.exports = APIRouter;
