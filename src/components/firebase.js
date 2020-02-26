import firebase from 'firebase';

const firebaseApp = firebase.initializeApp( {
  apiKey: "AIzaSyCuwtZoSVsF_U4mJG1e5jdHozvHoemlOPs",
  authDomain: "simplyfit-a6af5.firebaseapp.com",
  databaseURL: "https://simplyfit-a6af5.firebaseio.com",
  projectId: "simplyfit-a6af5",
  storageBucket: "simplyfit-a6af5.appspot.com",
  messagingSenderId: "503671017599",
  appId: "1:503671017599:web:eba4257d165172dedb2f4a",
  measurementId: "G-0GPRBNNBP6"
});

const database = firebaseApp.firestore();

export { database }