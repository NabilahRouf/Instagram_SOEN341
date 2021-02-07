import firebase from "firebase";

const fire= firebase.initializeApp({
    apiKey: "AIzaSyCQTsyNO2zy2esFl8XPvVnB0JWZ8tKwbxE",
    authDomain: "instagram-soen341.firebaseapp.com",
    databaseURL: "https://instagram-soen341-default-rtdb.firebaseio.com",
    projectId: "instagram-soen341",
    storageBucket: "instagram-soen341.appspot.com",
    messagingSenderId: "732024196596",
    appId: "1:732024196596:web:d22b0357b9c38bc6d13da1",
    measurementId: "G-0ENLK182S6"

});

//getting access to firebase services

export default fire;