// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  query
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
import {ref, onValue} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAozsACcUEyO632McLjTIO_7grlH0K8Igg",
  authDomain: "crud-productos-5c6ac.firebaseapp.com",
  databaseURL: "https://crud-productos-5c6ac-default-rtdb.firebaseio.com",
  projectId: "crud-productos-5c6ac",
  storageBucket: "crud-productos-5c6ac.appspot.com",
  messagingSenderId: "738168061274",
  appId: "1:738168061274:web:f602f119e4a028931f0763"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();


export const registrarProducto = (codigo,nombre,presentacion,unidades,fecha) =>
  addDoc(collection(db, "productos"), {codigo,nombre,presentacion,unidades,fecha });

export const eliminarProducto = (id) => deleteDoc(doc(db, "productos", id));

export const getProductoById = (id) => getDoc(doc(db, "productos", id));

export const updateProducto = (id, newFields) =>
  updateDoc(doc(db, "productos", id), newFields);

export const getProductos = async () => {
  const productos = []
  const querySnapshot = await getDocs(query(collection(db, "productos")));
  querySnapshot.forEach((doc) => {
    const producto = doc.data()
    producto.id = doc.id
    productos.push(producto)
  });
  return productos;
}
