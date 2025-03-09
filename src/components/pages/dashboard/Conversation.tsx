import React from "react"
import styled from "styled-components"
import { SFlexCol } from "../../common/styled/SFlexContainer"

const SContainer = styled(SFlexCol)`
  grid-area: message-container;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.styles.colors.grey_10};
`

const SMessageContainer = styled(SFlexCol)`
    width: 200px;
    padding: ${({ theme }) => theme.styles.container.padding.small};
    border-radius: ${({ theme }) => theme.styles.container.borderRadius};
    margin: 5px 0;
    box-sizing: border-box;
`

const SMessage = styled.p`
    width: 100%;
    font-size: ${({ theme }) => theme.styles.text.size.medium};
    border-radius: ${({ theme }) => theme.styles.container.borderRadius.small};
    background-color: ${({ theme }) => theme.styles.colors.grey_15};

    &.me {

    }

    &.user {
        font-size: ${({ theme }) => theme.styles.text.size.small};
    }

`

const Conversation = () => {
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
  ]

  return (
    <SContainer>
      {messages.map((message) => {
        return (
          <SMessageContainer>
            <SMessage className={"user"}>{message.sender}</SMessage>
            <SMessage>{message.text}</SMessage>
          </SMessageContainer>
        )
      })}
    </SContainer>
  )
}

export default Conversation
