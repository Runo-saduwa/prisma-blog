import express, { Express } from "express";
import passport from 'passport';
import dotenv from "dotenv";

import baseRoute from "./routes";

dotenv.config();

import './passport';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(passport.initialize());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(baseRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
