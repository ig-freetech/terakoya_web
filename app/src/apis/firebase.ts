import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey:
    process.env.NODE_ENV == "development"
      ? process.env.FIREBASE_DEV_API_KEY
      : "",
  authDomain:
    process.env.NODE_ENV == "development"
      ? process.env.FIREBASE_DEV_AUTH_DOMAIN
      : "",
  projectId:
    process.env.NODE_ENV == "development"
      ? process.env.FIREBASE_DEV_PROJECT_ID
      : "",
  storageBucket:
    process.env.NODE_ENV == "development"
      ? process.env.FIREBASE_DEV_STORAGE_BUCKET
      : "",
  messagingSenderId:
    process.env.NODE_ENV == "development"
      ? process.env.FIREBASE_DEV_MESSAGING_SENDER_ID
      : "",
  appId:
    process.env.NODE_ENV == "development"
      ? process.env.FIREBASE_DEV_APP_ID
      : "",
  measurementId:
    process.env.NODE_ENV == "development"
      ? process.env.FIREBASE_DEV_MEASUREMENT_ID
      : "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// TODO: https://ralacode.com/blog/post/react-firebase-authentication/
