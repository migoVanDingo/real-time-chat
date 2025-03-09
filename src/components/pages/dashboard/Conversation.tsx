import React from "react"
import styled from "styled-components"
import { SFlexCol } from "../../common/styled/SFlexContainer"

const SContainer = styled(SFlexCol)`
  grid-area: message-container;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.styles.colors.grey_10};
  padding: ${({ theme }) => theme.styles.container.padding.medium};
  background-color: ${({ theme }) => theme.styles.colors.grey_14};
  height: 100%;
  overflow-y: scroll;
`

const SMessageContainer = styled(SFlexCol)`
  max-width: 400px;

  border-radius: ${({ theme }) => theme.styles.container.borderRadius};
  margin: 15px 0;
  box-sizing: border-box;
  &.push-right{
    margin-left: auto;
  }

  &.push-left {
    margin-right: auto;
  }
`

const SMessage = styled.p`
  width: 100%;
  font-size: ${({ theme }) => theme.styles.text.size.medium};
  border-radius: ${({ theme }) => theme.styles.container.borderRadius.small};
  background-color: ${({ theme }) => theme.styles.colors.green_3};
  color: ${({ theme }) => theme.styles.colors.grey_15};
  margin: 0;



  &.me {
    background-color: ${({ theme }) => theme.styles.colors.blue_2};
   
  }

  &.user {
    font-size: ${({ theme }) => theme.styles.text.size.small};
    color: ${({ theme }) => theme.styles.colors.grey_1};
    background-color: transparent;
    
  }

  &.message{
    padding: ${({ theme }) => theme.styles.container.padding.medium};
  }
`

const Conversation = () => {
  const [currentUser, setCurrentUser] = React.useState("user")
  const messages = [
    {
      text: "Hello",
      sender: "user",
      timestamp: "12:00",
    },
    {
      text: "Hi",
      sender: "user2",
      timestamp: "12:01",
    },
    {
      text: "How are you?",
      sender: "user3",
      timestamp: "12:02",
    },
    {
      text: "Hello",
      sender: "user",
      timestamp: "12:00",
    },
    {
      text: "Hi",
      sender: "user2",
      timestamp: "12:01",
    },
    {
      text: "How are you?",
      sender: "user3",
      timestamp: "12:02",
    },
    
  ]

  return (
    <SContainer>
      {messages.map((message) => {
        return (
          <SMessageContainer className={`${currentUser == message.sender ? "push-right" : "push-left"}`}>
            <SMessage className={"user"}>{message.sender}</SMessage>
            <SMessage className={`${currentUser == message.sender ? "me" : ""} ${"message"}`}>{message.text}</SMessage>
            <SMessage className={"user"}>{message.timestamp}</SMessage>
            
          </SMessageContainer>
        )
      })}
    </SContainer>
  )
}

export default Conversation
