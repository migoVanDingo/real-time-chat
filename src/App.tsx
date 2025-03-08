import { createTheme, MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { useState } from "react"
import { createHashRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { themeObject } from "./theme/themeLight"
import RootLayout from "./components/pages/root/RootLayout"
import ProtectedRoute from "./route/ProtectedRoute"

import NewChat from "./components/pages/dashboard/NewChat"
import ChatList from "./components/pages/dashboard/ChatList"
import Dashboard from "./components/pages/dashboard/Dashboard"
import ErrorPage from "./components/pages/error/ErrorPage"
import Login from "./components/pages/login/Login"
import Signup from "./components/pages/signup/Signup"
import Logout from "./components/pages/logout/Logout"
import { loader } from "./utility/Loader"

const mantineTheme = createTheme({})

const router = createHashRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        loader: loader.RootLoader,
        action: () => {},
        id: "root",
        children: [
          {
            path: "/",
            element: <Dashboard />,
            index:true,
            loader: () => {},
            action: () => {},
            id: "landing",
          },
          {
            path: "/error",
            element: <ErrorPage />,
            loader: () => {},
            action: () => {},
            id: "error",
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
            loader: () => {},
            action: () => {},
            id: "dashboard",
            children: [
              {
                path: "list",
                element: <ChatList/>,
                loader: () => {},
                action: () => {},
                id: "chat-list",
              },
              {
                path: "new",
                element: <NewChat/>,
                loader: () => {},
                action: () => {},
                id: "chat-new",
              },
            ],
          },
          
        ],
      },
    ],
  },

  {
    path: "/signup",
    element: <Signup/>,
    loader: () => {},
    action: () => {},
    id: "signup",
  },
  {
    path: "/login",
    element: <Login/>,
    loader: () => {},
    action: () => {},
    id: "login",
  },
  {
    path: "/logout",
    element: <Logout/>,
    loader: () => {},
    action: () => {},
    id: "logout",
  },
])

function App() {
  const [theme, setTheme] = useState<object>({
    theme: themeObject.themeType.dark,
    styles: themeObject,
  })

  return (
    <MantineProvider theme={mantineTheme}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </MantineProvider>
  )
}

export default App
