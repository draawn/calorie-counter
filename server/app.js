import session from 'express-session';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { database } from './config/database';
import { join } from 'path';
import { json } from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import express from 'express';
const FileStore = require('session-file-store')(session);
const app = express();
const port = process.env.PORT || 8080;

import './models/food.model';
import './models/goal.model';
import './models/meal.model';
import './models/user.model';
import userRoutes from './routes/user.route';
import foodRoutes from './routes/food.route';

// Helmet middleware
app.use(helmet());

// CORS middleware
let corsOptions = {
    origin: ['http://127.0.0.1:4200', 'http://localhost:4200'],
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Session middleware
let sessionObj = {
    store: new FileStore({ secret: 'keyboard cat', reapInterval: -1 }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: { maxAge: 1800000 } // 30 minutes
};
app.use(session(sessionObj));

// Body parser middleware
app.use(json());

// Middleware to compress all routes
app.use(compression());

// Serves static files from FE build
app.use(express.static(join(__dirname, '../dist')));

// Use these routes
app.use('/user', userRoutes);
app.use('/food', foodRoutes);

// Connect to Database
mongoose.connect(database);
// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + database);
});
// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

// Start server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});