
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCvkC1viEiONhakJZP0fUEpTnpUo4yte5Q",
    authDomain: "financesresource-19ab2.firebaseapp.com",
    projectId: "financesresource-19ab2",
    storageBucket: "financesresource-19ab2.appspot.com",
    messagingSenderId: "934925180163",
    appId: "1:934925180163:web:470ad75481de533dfd5d36",
    measurementId: "G-DN8K4V20BT"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};