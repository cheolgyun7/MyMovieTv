// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDs5ha48C8jvGqqMeqcrxiIb40oJNYz2CE',
  authDomain: 'mymovietv-e61ea.firebaseapp.com',
  projectId: 'mymovietv-e61ea',
  storageBucket: 'mymovietv-e61ea.appspot.com',
  messagingSenderId: '1049046333193',
  appId: '1:1049046333193:web:73bbcf6e4cc3d14f3185d8',
  measurementId: 'G-5J7FD4LK68'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
