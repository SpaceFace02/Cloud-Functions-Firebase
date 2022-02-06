import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

// New movie added, increase users total movies count.
export const movieStats = functions.firestore
    .document("movies/{movieId}")
    .onCreate(async (snap, context) => {
    //   data is the uid object we pass to it.
      const data = snap.data();
      console.log(data);
      // Get the user object reference from the uid we passed in.
      const userRef = db.doc(`users/${data.uid}`);
      // Get the user object snapshot from the userReference.
      const userSnap = await userRef.get();
      // Get the user data from the snapshot.
      const userData = userSnap.data();

      // Updates the data in the user object by incrementing the movieCount by 1.
      return userRef.update({
      // The question mark is a way to tell typescript that it can hold null values, or not. Don't worry about it basically.
        movieCount: userData?.movieCount + 1,
      });
    });

//   DO NOT UPDATE THE DOCUMENT THAT TRIGGERED THIS FUNCTION, IT WOULD KEEP ON UPDATING AND CAUSE AN INFINITE LOOP.
export const userStats = functions.firestore
    .document("movies/{movieId}")
    .onUpdate(async (snap, context) => {
    // Before the update and after the update data.
      const beforeUpdate = snap.before.data();
      const afterUpdate = snap.after.data();
      console.log(beforeUpdate);
      console.log(afterUpdate);

      let performance;
      if (afterUpdate.score >= beforeUpdate.score) {
        performance = "Your performance is improving! :)";
      } else {
        performance = "Your performance is declining! :(";
      }

      const userRef = db.doc(`users/${afterUpdate.uid}`);

      return userRef.update({
        performance: performance,
      });
    });
