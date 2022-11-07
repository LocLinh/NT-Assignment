// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAW74cHy3j45rkZ4F-qWnvURSKSm5a6314",
    authDomain: "uploadimages-94c77.firebaseapp.com",
    projectId: "uploadimages-94c77",
    storageBucket: "uploadimages-94c77.appspot.com",
    messagingSenderId: "1041125993837",
    appId: "1:1041125993837:web:a768a5514eab976db57e64",
    measurementId: "G-4H21SZB09F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

const analytics = getAnalytics(app);
