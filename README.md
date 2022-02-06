# Learning about Cloud Functions for Firebase and their features and their Use-cases

## P.S. To run all of these functions, it is necessary to have a Firebase project and upgrade that project to the Blaze Plan. You also need to authenticate firebase on your local system. For accessing the Twilio API, you need to have a Twilio account, a Twilio account SID and a Twilio account Auth Token as well.

### Learnt about:

1. Authentication using Cloud Functions.
2. Accessing and updating Cloud Firestore.
3. Accessing and updating Cloud Storage and Storage Buckets.
4. Resizing images using Cloud Functions and the Sharp Library.
5. Integrating Cloud Functions with Express.
6. Integrating Twilios with Cloud Functions to send SMS messages.

## After the upgrade and authenticating Firebas on your local machine, you can run the following commands to deploy the functions to the Firebase project:

- `firebase deploy --only functions` - For the functions
- `firebase serve --only functions` - For the mock development environment.
- `npm run serve` - To service the mock development environment.
