/* eslint-disable max-len */
document.addEventListener("DOMContentLoaded", () => {
  // First install the firebase SDK before running the following command.
  const app = firebase.app();

  fetch(
    "http://localhost:5001/cloud-functions-1526e/us-central1/api/greeting"
  ).then(console.log);

  // Name of the function we have deployed on the cloud function.
  const sendText = firebase.functions().httpsCallable("sendMessage");

  // When this function is called, its handles the auth middleware on the front and back-end.
  sendText({ message: "Hi there!" });
});
