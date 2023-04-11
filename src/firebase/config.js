
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDH4fWcsopg7b3eZuHpVEySb6eRLwR3OiM",
    authDomain: "financesresource-d4ff2.firebaseapp.com",
    projectId: "financesresource-d4ff2",
    storageBucket: "financesresource-d4ff2.appspot.com",
    messagingSenderId: "1015209387708",
    appId: "1:1015209387708:web:23d4c02e26ad09bffb52b9"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };