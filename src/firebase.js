import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD9NufZeea2UZyUSK-Z9F_Hg-XLHPzvoGU",
  authDomain: "todo-app-64c67.firebaseapp.com",
  projectId: "todo-app-64c67",
  storageBucket: "todo-app-64c67.appspot.com",
  messagingSenderId: "148501873618",
  appId: "1:148501873618:web:a7888ba816d30090affe0b",
  measurementId: "G-R0K7X8SNMY",
});

const db = firebaseApp.firestore();

export default db;
