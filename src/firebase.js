import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAqt8ZftJ6XCQm54kpqJkMQYXHWmkVbS9U",
    authDomain: "foodorderingsystem-a59e8.firebaseapp.com",
    projectId: "foodorderingsystem-a59e8",
    storageBucket: "foodorderingsystem-a59e8.appspot.com",
    messagingSenderId: "615760522349",
    appId: "1:615760522349:web:620db7e6950db0ac186364",
    measurementId: "G-P996JGZFNG"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };

