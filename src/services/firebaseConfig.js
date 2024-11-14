import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import firebaseConfigData from '../config/firebaseConfig.json';

const firebaseConfig = firebaseConfigData;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };
