import React from 'react'
import Header from '../../complex/Header'
import { Outlet, useLoaderData } from 'react-router-dom'

const RootLayout = () => {

    const { uid, username} = useLoaderData() as { uid: string, username: string}

    return (
      <>
          <Header username={username}/>
          <Outlet context={{userId: uid, username: username}} />
      </>
    )
  }
  
  export default RootLayout

  export const loader = () => {
    const uid = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user") as string).uid : ""
    const username = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user") as string).displayName : ""

    console.log('RootLayout.tsx -- loader() -- uid: ', uid)

    return {
      uid,
      username
    }

  }