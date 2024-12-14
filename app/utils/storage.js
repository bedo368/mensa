// app/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4MGJ4C_zGIXAGO5GePG1wm0i3WS3prHA",
  authDomain: "on-the-bon-1.firebaseapp.com",
  projectId: "on-the-bon-1",
  storageBucket: "on-the-bon-1.appspot.com",
  messagingSenderId: "381399143885",
  appId: "1:381399143885:web:84d297d6fead8f12dd6084",
  measurementId: "G-YZ9LDQYQHV"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
