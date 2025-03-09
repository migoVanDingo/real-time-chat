import React, { useEffect } from "react"
import { getAllChatrooms } from "../firebase/collections/chatroom"
import { subscribeToChatrooms } from "../firebase/subscribe/chatroom"
import {setCurrentChatroom as setStoreChatroom} from "../store/slices/chatroom"
import { useDispatch } from "react-redux";

export const useChatList = () => {

    const dispatch = useDispatch();

  const [chatList, setChatList] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [currentChatroom, setCurrentChatroom] = React.useState<string>(sessionStorage.getItem("chatroomId") || "")

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


  const handleSelectChat = (chatroomId: string) => {
    sessionStorage.setItem("chatroomId", chatroomId)
    dispatch(setStoreChatroom(chatroomId))
    setCurrentChatroom(chatroomId)
    
  }


  return { chatList, loading, currentChatroom, setCurrentChatroom, handleSelectChat }
}
