import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as Twilio from "twilio";

const credentials = functions.config().twilio;
const client = Twilio(credentials.sid, credentials.token);

// To get the users phone number. Remember to instantiate the firestore outside the function, otheriwise it would run on every function invocation, so if you have something shared, declare it outside the function, which runs only once when the server instance is initialized.
const db = admin.firestore();

// Callable functions, no request or response. data object is passed from your client side code.
export const sendMessage = functions.https.onCall(async (data, context) => {
  const userId = context.auth?.uid;

  const userRef = db.doc(`users/${userId}`);
  const userSnap = await userRef.get();
  // Get phone number
  const phoneNumber = userSnap.data()?.phoneNumber;

  return client.messages.create({
    body: data.message,
    to: phoneNumber,
    from: "+18045678812", // Your twilio number.
  });
});
