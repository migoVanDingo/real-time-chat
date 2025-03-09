import React from 'react'
import { useOutletContext } from 'react-router-dom'
import styled from 'styled-components'
import ChatList from './ChatList'
import UserList from './UserList'
import MainChat from './MainChat'
import { Modal } from '@mantine/core'
import { SFlexCol } from '../../common/styled/SFlexContainer'
import { useDisclosure } from '@mantine/hooks'
import Heading from '../../common/functional/text/Heading'
import TextInput from '../../common/functional/input/TextInput'
import Button from '../../common/functional/input/Button'
import { createChatroom } from '../../../firebase/collections/chatroom'

const SPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "chat-list main user-list";
`

const SModalContainer = styled(Modal)`
  .mantine-Modal-root {
    border-radius: ${({ theme }) => theme.styles.container.borderRadius.large};
    overflow: hidden;
  }
  .mantine-Modal-body {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.styles.colors.grey_14};
    border: 2px solid ${({ theme }) => theme.styles.colors.grey_11};
    border-top: none;
    color: ${({ theme }) => theme.styles.colors.grey_7};
  }

  .mantine-Modal-header {
    background-color: ${({ theme }) => theme.styles.colors.grey_14};
    padding: 16px;
    border: 2px solid ${({ theme }) => theme.styles.colors.grey_11};
    border-bottom: none;
    color: ${({ theme }) => theme.styles.colors.grey_7};
    
  }
`

const SModalMod = styled(SFlexCol)`
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.styles.colors.grey_14};
`


const Dashboard = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const { username, userId } =
    useOutletContext() as {
      username: string
      userId: string
    }

    const [loading, setLoading] = React.useState(false)

    console.log('Dashboard.tsx -- username: ', username)
    console.log('Dashboard.tsx -- userId: ', userId)

    const [chatName, setChatName] = React.useState('')
    const [chatNameError, setChatNameError] = React.useState('')

    const handleCreateChat = async () => {  
      createChatroom(chatName, userId)
      setChatName('')
      close()
    }
      
    
  return (
    <SPage>
      <ChatList handleClick={open} />
      <MainChat />
      <UserList username={username}/>

      <SModalContainer opened={opened} onClose={close} title="Create New Chat">
        {
          !loading ? (
            <SModalMod>

              <TextInput inputValue={chatName}
                         setInputValue={setChatName}
                         type={"text"}
                         label={"Chatroom Name"}
                         error={chatNameError}
                         labelStyles={"f-weight-200 f-md"}
                         containerStyles={"w-100"}
                         />
              <Button handleClick={handleCreateChat} buttonText={"Create Chat"} styles={"w-100 h-sm f-md"}
              />
          </SModalMod>
          ):<></>
        }

      </SModalContainer>
    </SPage>
  )
}

export default Dashboard