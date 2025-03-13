import React, { useEffect } from 'react'
import Header from '../../complex/Header'
import { Outlet, useLoaderData } from 'react-router-dom'
import { createUser } from '../../../firebase/collections/user'
import { useDispatch } from 'react-redux'
import { setUserId, setUsername } from '../../../store/slices/user'
import { setCurrentChatroom } from '../../../store/slices/chatroom'

const RootLayout = () => {

    const { uid, username, currentChatroom} = useLoaderData() as { uid: string, username: string, currentChatroom: string }
    const dispatch = useDispatch()

    const [mobileView, setMobileView] = React.useState<string>("main")
    useEffect(() => {
      const init = () => {
        uid !== "" && dispatch(setUserId(uid))
        username !== "" && dispatch(setUsername(username))
        currentChatroom !== "" && dispatch(setCurrentChatroom(currentChatroom))

      }
      return init()
    }, [uid])

    return (
      <>
          <Header username={username} setMobileView={setMobileView}/>
          <Outlet context={{userId: uid, username: username, mobileView}} />
      </>
    )
  }
  
  export default RootLayout

  export const loader = () => {
    const uid = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).uid : ""
    const username = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).displayName : ""
    const email = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).email : ""

    const currentChatroom = localStorage.getItem("chatroomId") || ""

    createUser(uid, username, email)

    return {
      uid,
      username,
      currentChatroom
    }

  }