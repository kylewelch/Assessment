import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDLXBLKm6yXJgM9EZxnqPCphWpqsQjE7nI",
  authDomain: "assessment-661b2.firebaseapp.com",
  databaseURL: "https://assessment-661b2.firebaseio.com",
  projectId: "assessment-661b2",
  storageBucket: "assessment-661b2.appspot.com",
  messagingSenderId: "630398783312",
  appId: "1:630398783312:web:3f059330cc67b457a82655",
  measurementId: "G-YKV8HYT8TC"
};

firebase.initializeApp(config);
export default firebase;