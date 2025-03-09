import { db } from "../../../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const sendMessage = async (chatroomId: string, senderId: string, content: string) => {
  try {
    await addDoc(collection(db, "messages"), {
      chatroomId,
      senderId,
      content,
      timestamp: serverTimestamp(),
    });
    console.log("Message sent!");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
