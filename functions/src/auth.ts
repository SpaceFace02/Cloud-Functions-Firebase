import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Use set API_KEY=value to store env variables in windows, not firebase.
const db = admin.firestore();

// If we have multiple functions in the file, it will give us performance issues if we initialize db in the function.

// Get the user object from the authentication, and pass it in this function.
export const createUserRecord = functions.auth
    .user()
    .onCreate(async (user, context) => {
    // OR db.doc(`users/${user.uid}`). When creating a user, that user has a predefined uid.

      // Creates a reference to an empty document in the collection.
      const userRef = db.collection("users").doc(user.uid);
      return userRef.set({
        displayName: user.displayName,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        createdAtTimestamp: context.timestamp,
        penName: "bubbly",
        movieCount: 0,
      });
    });
