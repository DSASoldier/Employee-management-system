import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCv5WZL6xcbP0Gkar9U92-sg3nm094zLX4",
  authDomain: "employee-management-syst-2f45a.firebaseapp.com",
  databaseURL: "https://employee-management-syst-2f45a-default-rtdb.firebaseio.com",
  projectId: "employee-management-syst-2f45a",
  storageBucket: "employee-management-syst-2f45a.appspot.com",
  messagingSenderId: "435589426461",
  appId: "1:435589426461:web:be0983c91372aedd9f05f4"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const storage = getStorage(app);