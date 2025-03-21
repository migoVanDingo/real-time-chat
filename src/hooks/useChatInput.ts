import { useEffect, useState } from "react"
import { sendMessage } from "../firebase/collections/messages"

export const useChatInput = () => {
  const [message, setMessage] = useState<string>("")
  const [sendMessageError, setSendMessageError] = useState<string>("")
  const [isSending, setIsSending] = useState<boolean>(false)
  const [chatId, setChatId] = useState<string>("")
  const [senderId, setSenderId] = useState<string>("")


  const send = async () => {
    
    const chatroomId = localStorage.getItem("chatroomId")
    const user = localStorage.getItem("user")
    const userId = user ? JSON.parse(user).uid : ""


    if (!message) {
      console.log("Message cannot be empty")
      setSendMessageError("Message cannot be empty")
      return
    }

    setIsSending(true)
    try {
      if (chatroomId === "" || !chatroomId || userId === "") {
        console.log("Chatroom or sender not set")
        throw new Error("Chatroom or sender not set")
      }

      await sendMessage(chatroomId, userId, message)
    } catch (error) {
      setSendMessageError("Error sending message")
    } finally {
      setMessage("")
      setIsSending(false)
    }
  }

  return {
    message,
    setMessage,
    sendMessageError,
    isSending,
    send,
  }
}
