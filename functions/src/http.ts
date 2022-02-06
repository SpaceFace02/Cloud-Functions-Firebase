import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

import * as admin from "firebase-admin";
admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
  const name = request.query.name;

  if (!name) {
    response.status(400).send("Please pass a name on the query string");
  }
  response.send(`Hello ${name} from Firebase!`);
});

const app = express();
app.use(cors({origin: true}));

app.get("/greeting", (request, response) => {
  response.send("Hey there");
});

app.get("/farewell", (request, response) => {
  response.send("Bye bye");
});

export const api = functions.https.onRequest(app);
