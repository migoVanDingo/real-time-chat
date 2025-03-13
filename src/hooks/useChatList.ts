import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { subscribeToChatrooms } from "../firebase/subscribe/chatroom"
import { setCurrentChatroom as setStoreChatroom } from "../store/slices/chatroom"
import { addUserToChatroom } from "../firebase/collections/chatroom"

export const useChatList = () => {
  const dispatch = useDispatch()

  const [chatList, setChatList] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [currentChatroom, setCurrentChatroom] = React.useState<string>(
    localStorage.getItem("chatroomId") || ""
  )

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

  const handleSelectChat = async (chatroomId: string) => {
    localStorage.setItem("chatroomId", chatroomId)
    const user = localStorage.getItem("user")
    const userId = user ? JSON.parse(user).uid : ""
    await addUserToChatroom(chatroomId, userId)
    dispatch(setStoreChatroom(chatroomId))
    setCurrentChatroom(chatroomId)
  }

  return {
    chatList,
    loading,
    currentChatroom,
    setCurrentChatroom,
    handleSelectChat,
  }
}
