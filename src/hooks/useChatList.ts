import React, { useEffect } from "react"
import { getAllChatrooms } from "../firebase/collections/chatroom"
import { subscribeToChatrooms } from "../firebase/subscribe/chatroom"

export const useChatList = () => {
  const [chatList, setChatList] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)

  useEffect(() => {
    // This function subscribes to chatroom changes
    const unsubscribe = subscribeToChatrooms((newChatroom: any) => {
      // Add the new chatroom to the existing list of chatrooms
      setChatList((prevChatrooms) => [...prevChatrooms, newChatroom])
    })

    // Clean up the listener when the component is unmounted
    return () => {
      unsubscribe()
    }
  }, [])

  return { chatList, loading }
}
