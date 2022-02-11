import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { async } from "@firebase/util";

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
const db = getFirestore(app);

const login = document.getElementById("login");
const newBlog = document.getElementById("new_blog");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const addBtn = document.getElementById("add-btn");

onAuthStateChanged(auth, (user) => {
    if (user != null) {
        login.classList.add("hidden");
        newBlog.classList.remove("hidden");
        console.log("logged in!");
    } else {
        login.classList.remove("hidden");
        newBlog.classList.add("hidden");
        console.log("logged out!");
    }
});

loginBtn.onclick = () => {
    const mail = document.getElementById("id_Username").value;
    const pass = document.getElementById("id_Password").value;

    signInWithEmailAndPassword(auth, mail, pass);
};

logoutBtn.onclick = () => {
    signOut(auth);

    document.getElementById("id_Username").value = "";
    document.getElementById("id_Password").value = "";
};

// async function addBlog(titleData, tagsData, contentData) {

// }

addBtn.onclick = async () => {
    const user = auth.currentUser;
    if (user) {
        const titleData = document.getElementById("id_Title").value;
        const tagsData = Array.from(
            document.getElementById("id_Tags").selectedOptions
        ).map(({ value }) => value);
        const contentData = tinyMCE.activeEditor.getContent();
        try {
            const docRef = await addDoc(collection(db, "blog"), {
                title: titleData,
                tags: tagsData,
                datetime: serverTimestamp(),
                content: contentData,
            });

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    } else {
        console.log("Who are u bish");
    }
};
