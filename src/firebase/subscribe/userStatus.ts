import { useEffect } from "react";
import { db } from "../../../config/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";

export const subscribeToUserStatus = (userId: string, callback: (data: any) => void) => {
  const userRef = doc(db, "users", userId);
  return onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    }
  });
};



export const subscribeToUsers = (callback: any) => {
  const usersRef = collection(db, "users");

  // Listen for real-time updates to the users collection
  const unsubscribe = onSnapshot(usersRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        // A new user was added
        console.log("New user: ", change.doc.data());
        callback(change.doc.data()); // Trigger the callback with the new user data
      }
    });
  });

  // Return the unsubscribe function so that you can stop listening when needed
  return unsubscribe;
};