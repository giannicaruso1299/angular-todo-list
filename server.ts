import * as express from 'express';
import {Application} from "express";
import {saveUser} from './server/save-user.route';

const bodyParser = require('body-parser');

const app: Application = express();

const cors = require('cors');

app.use(cors({
  origin: "http://localhost:4200"
}));

app.use(bodyParser.json())

// @ts-ignore
app.route('/api/save-user').post(saveUser);

const httpServer = app.listen(9000, () => {
  // @ts-ignore
  console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});
