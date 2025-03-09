import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'
import { useOutletContext } from 'react-router-dom'
import styled from 'styled-components'
import { createChatroom } from '../../../firebase/collections/chatroom'
import Button from '../../common/functional/input/Button'
import TextInput from '../../common/functional/input/TextInput'
import { SFlexCol } from '../../common/styled/SFlexContainer'
import ChatList from './ChatList'
import MainChat from './MainChat'
import UserList from './UserList'
import { useSelector } from 'react-redux'
import { useChatList } from '../../../hooks/useChatList'


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

const SEmptyChat = styled(SFlexCol)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.styles.container.padding.large};
  gap: 20px;
`







// Styled component for grid layout
const SPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "chat-list main user-list";

  // Hide chat and user lists on small screens
  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Collapse to a single column layout
    grid-template-areas: "main";
  }
`

// Dashboard component with burger menu integration
const Dashboard = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const { username, userId, mobileView } =
    useOutletContext() as {
      username: string
      userId: string
      mobileView: string
    }
  const { chatList, currentChatroom, handleSelectChat } = useChatList()
  const [loading, setLoading] = React.useState(false)
  const [chatName, setChatName] = React.useState('')
  const [chatNameError, setChatNameError] = React.useState('')
  const [showChatList, setShowChatList] = React.useState(true)
  const [showUserList, setShowUserList] = React.useState(true)

  const handleCreateChat = async () => {
    if (chatName === '') {
      setChatNameError('Chatroom name cannot be empty')
      return
    }
    setLoading(true)
    await createChatroom(chatName, userId)
    setChatName('')
    close()
  }

  return (
    <SPage>
      {/* Toggle visibility of the chat list based on the state */}
      {showChatList && (
        <ChatList mobileView={mobileView} handleClick={open} chatList={chatList} currentChatroom={currentChatroom} handleSelectChat={handleSelectChat} />
      )}

      {/* Main chat window */}
      {userId !== '' && currentChatroom !== '' ? (
        <MainChat  mobileView={mobileView} />
      ) : (
        <SEmptyChat>Select a Chatroom to start messaging.</SEmptyChat>
      )}

      {/* Toggle visibility of the user list based on the state */}
      {showUserList && <UserList  mobileView={mobileView} username={username} />}

      <SModalContainer opened={opened} onClose={close} title="Create New Chat">
        {!loading ? (
          <SModalMod>
            <TextInput
              inputValue={chatName}
              setInputValue={setChatName}
              type={'text'}
              label={'Chatroom Name'}
              error={chatNameError}
              labelStyles={'f-weight-200 f-md'}
              containerStyles={'w-100'}
            />
            <Button handleClick={handleCreateChat} buttonText={'Create Chat'} styles={'w-100 h-sm f-md'} />
          </SModalMod>
        ) : (
          <></>
        )}
      </SModalContainer>
    </SPage>
  )
}

export default Dashboard
