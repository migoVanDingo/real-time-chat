import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase"; // Adjust the import based on your firebase.js location

export const subscribeToChatrooms = (callback: any) => {
  const chatroomsRef = collection(db, "chatrooms");

  // Listen for real-time updates to the chatrooms collection
  const unsubscribe = onSnapshot(chatroomsRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        // A new chatroom was added
        console.log("New chatroom: ", change.doc.data());
        callback(change.doc.data()); // Trigger the callback with the new chatroom data
      }
    });
  });

  // Return the unsubscribe function so that you can stop listening when needed
  return unsubscribe;
};