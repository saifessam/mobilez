import express, { Application } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import devicesRouter from './routers/devices';
import usersRouter from './routers/users';
import announcementsRouter from './routers/announcements';
import ordersRouter from './routers/orders';
import { databaseConnect, serverConnect } from './modules/connections';

// Initializing express
const app: Application = express();

// Server configurations
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Server routers
app.use('/devices', devicesRouter);
app.use('/users', usersRouter);
app.use('/announcements', announcementsRouter);
app.use('/orders', ordersRouter);

// Establishing connections
await databaseConnect(mongoose);
serverConnect(app);