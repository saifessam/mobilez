import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import { databaseConnect, serverConnect } from './modules/connections';
import announcementsRouter from './routers/announcements';
import devicesRouter from './routers/devices';
import ordersRouter from './routers/orders';
import usersRouter from './routers/users';

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