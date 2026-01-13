import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD53bjLHgRj9sBh0KdB9gwPW4aeuS35BLg",
  authDomain: "miniblog-5b5d5.firebaseapp.com",
  projectId: "miniblog-5b5d5",
  storageBucket: "miniblog-5b5d5.firebasestorage.app",
  messagingSenderId: "9525643906",
  appId: "1:9525643906:web:dbc5474de7f08b14d2829b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }