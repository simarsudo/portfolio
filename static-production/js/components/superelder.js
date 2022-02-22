import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
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
const db = getFirestore(app);
const storage = getStorage();

const login = document.getElementById("login");
const newBlog = document.getElementById("new_blog");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const addBtn = document.getElementById("add-btn");
const popUp = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const popUpClose = document.getElementById("popupClose");

document
    .querySelector(".blog-form")
    .appendChild(document.getElementById("id_file"));

function convertToSlug(str) {
    //replace all special characters | symbols with a space
    str = str
        .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ")
        .toLowerCase();
    // trim spaces at start and end of string
    str = str.replace(/^\s+|\s+$/gm, "");
    // replace space with dash/hyphen
    str = str.replace(/\s+/g, "-");
    return str;
}

function popupTimeOut() {
    window.setTimeout(function () {
        popUp.classList.add("moveLeft");
    }, 4000);
}

function successPopUp(msg) {
    popupText.innerHTML = msg;
    popup.classList.remove("transactionFailed");
    popup.classList.add("transactionSuccess");
    popUp.classList.remove("moveLeft");
    popupTimeOut();
}

function failedPopUp(msg) {
    popupText.innerHTML = msg;
    popup.classList.remove("transactionSuccess");
    popup.classList.add("transactionFailed");
    popUp.classList.remove("moveLeft");
    popupTimeOut();
}

popUpClose.addEventListener("click", function () {
    popUp.classList.add("moveLeft");
});

onAuthStateChanged(auth, (user) => {
    if (user != null) {
        login.classList.add("hidden");
        newBlog.classList.remove("hidden");
        successPopUp("Loggedin Successfully");
    } else {
        login.classList.remove("hidden");
        newBlog.classList.add("hidden");
    }
});

id_image.addEventListener("change", function () {
    document.getElementById("file_name").innerHTML =
        document.getElementById("id_image").files[0].name;
    // console.log(id_image.files[0].name);
});

loginBtn.onclick = () => {
    const mail = document.getElementById("id_Username").value;
    const pass = document.getElementById("id_Password").value;

    if (mail && pass) {
        signInWithEmailAndPassword(auth, mail, pass)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                failedPopUp("Please check your credentials!");
            });
    } else if (!mail) {
        failedPopUp("Please enter mail!");
    } else if (!pass) {
        failedPopUp("Please enter password!");
    }
};

logoutBtn.onclick = () => {
    signOut(auth);
    successPopUp("Logout Successfully");

    document.getElementById("id_Username").value = "";
    document.getElementById("id_Password").value = "";
};

addBtn.onclick = async () => {
    const user = auth.currentUser;
    if (user) {
        const file = document.getElementById("id_image").files[0];

        const blogImages = ref(storage, "blogImages/" + file.name);
        const uploadTask = uploadBytesResumable(blogImages, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                document.getElementById("progressBar").style.width = `${
                    progress - 10
                }%`;
                // console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        // console.log("Upload is paused");
                        // successPopUp("Upload is paused");
                        break;
                    case "running":
                        // console.log("Upload is running");
                        // successPopUp("Upload is running");
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case "storage/unauthorized":
                        // User doesn't have permission to access the object
                        failedPopUp("Unauthorized Access");
                        break;
                    case "storage/canceled":
                        // User canceled the upload
                        failedPopUp("Storage canceled");
                        break;
                    case "storage/unknown":
                        // Unknown error occurred, inspect error.serverResponse
                        failedPopUp("Unknown error occur");
                        break;
                }
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log("File available at", downloadURL);

                    const titleData = document.getElementById("id_Title").value;
                    const tagsData = Array.from(
                        document.getElementById("id_Tags").selectedOptions
                    ).map(({ value }) => value);
                    const contentData = tinyMCE.activeEditor.getContent();
                    const slugData = convertToSlug(titleData);
                    try {
                        setDoc(doc(db, "blog", slugData), {
                            title: titleData,
                            tags: tagsData,
                            datetime: serverTimestamp(),
                            content: contentData,
                            slug: slugData,
                            url: downloadURL,
                        });

                        successPopUp("Blog created");
                    } catch (e) {
                        failedPopUp("Error! Please check console logs");
                        console.error("Error adding document: ", e);
                    }
                });
            }
        );
    } else {
        failedPopUp(
            "<img style='width:60px; height: 60px; font-size: 1.2rem' src='https://c.tenor.com/ZX95mDnlodwAAAAM/the-rock-sus-eye.gif'> Stop right there!"
        );
    }
};
