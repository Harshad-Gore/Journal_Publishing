import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBy4jU14CCvcTXBo6eTB104PVPAuDT5Aow",
    authDomain: "journalpublishing-harshad.firebaseapp.com",
    projectId: "journalpublishing-harshad",
    storageBucket: "journalpublishing-harshad.firebasestorage.app",
    messagingSenderId: "300945253831",
    appId: "1:300945253831:web:ed3ad229f0e4b41e2425e2",
    measurementId: "G-6EVL2F9CBJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getData = document.querySelector('#create-form');
getData.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const guidesRef = collection(db, 'guide_test');

        await addDoc(guidesRef, {
            title: getData['title'].value,
            content: getData['content'].value
        });

        getData.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});
