const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyBwtJfjoGZad-cT7LuWHbApUMhruusqDkk",
  authDomain: "sweetpotato-9e0ef.firebaseapp.com",
  projectId: "sweetpotato-9e0ef",
};


class Firebase {
  constructor() {
    firebase.initializeApp(config);
  }
}

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();


