 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
 import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js"
 import { getAuth } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js"

//  const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

//your app firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyAS25OKgj4MR6iQ2o2n1CviDiACKoilLXo",
   authDomain: "pagina-fabi.firebaseapp.com",
   projectId: "pagina-fabi",
   storageBucket: "pagina-fabi.appspot.com",
   messagingSenderId: "246770580933",
   appId: "1:246770580933:web:19a1e7c927f1bf77655fac",
 };

 // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

export const saveTask = (title, description) => {
  addDoc(collection(db, 'tasks'), {title: title, description: description});
}

export const getTask = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = (callback) => 
onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = id => deleteDoc(doc(db, 'tasks', id));

export const getTasks = id => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) => 
updateDoc(doc(db, 'tasks', id), newFields);