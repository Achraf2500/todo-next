import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBiyBlZjzVb8kZvMFKQndPqNY-fIQPnRzQ",
    authDomain: "todo-app-9d37f.firebaseapp.com",
    projectId: "todo-app-9d37f",
    storageBucket: "todo-app-9d37f.appspot.com",
    messagingSenderId: "512988346345",
    appId: "1:512988346345:web:63b3febb1dc1bc1c467d78",
    measurementId: "G-9XWSE1ZZCR"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)