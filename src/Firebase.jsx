// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDq3TO3b-oT1TI7BjGsxabd1orOAbRNn7c',
  authDomain: 'striking-splice-340513.firebaseapp.com',
  projectId: 'striking-splice-340513',
  storageBucket: 'striking-splice-340513.appspot.com',
  messagingSenderId: '601697239899',
  appId: '1:601697239899:web:649a4fc5d23439b06fd07e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
