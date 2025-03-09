import { db } from "../../../config/firebase";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";

export const createChatroom = async (name: string, createdBy: string) => {
  try {
    const docRef = await addDoc(collection(db, "chatrooms"), {
      name,
      createdBy,
      members: [createdBy],
      createdAt: serverTimestamp(),
    });
    console.log("Chatroom created with ID:", docRef.id);
  } catch (error) {
    console.error("Error creating chatroom:", error);
  }
};

export const getAllChatrooms = async () => {
  try {
    const chatroomsSnapshot = await getDocs(collection(db, "chatrooms"));
    const chatroomsList = chatroomsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(chatroomsList);
    return chatroomsList;
  } catch (error) {
    console.error("Error getting chatrooms: ", error);
  }
};