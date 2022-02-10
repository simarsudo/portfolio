import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getFirestore, collection } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCSMEVHodw93y_eWce9JlUSnuXWX8DuFZo",
    authDomain: "portfolio-67279.firebaseapp.com",
    projectId: "portfolio-67279",
    storageBucket: "portfolio-67279.appspot.com",
    messagingSenderId: "769141310690",
    appId: "1:769141310690:web:7d8386ee94dab520b24abb",
    measurementId: "G-4QGMH72L45",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const login = document.getElementById("login");
const new_blog = document.getElementById("new_blog");

onAuthStateChanged(auth, (user) => {
    if (user != null) {
        console.log("logged in!");
    } else {
        console.log("logged out!");
    }
});
