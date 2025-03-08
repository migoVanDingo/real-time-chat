import React from "react"
import { SFlexCol } from "../../common/styled/SFlexContainer"
import styled from "styled-components"
import ModuleHeader from "../../complex/ModuleHeader"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const SContainer = styled(SFlexCol)`
  grid-area: chat-list;
  border-right: 1px solid ${({ theme }) => theme.styles.colors.grey_10};
  height: calc(100vh - 60px);
  overflow-y: scroll;
`

const ChatList = ({handleClick}: any) => {
  return (
    <SContainer>
      <ModuleHeader
        heading={"Chat List"}
        headingStyles={"f-weight-200 f-md p-1"}
        icon={faPlus}
        buttonStyles={"f-md w-lg h-sm push-right"}
        buttonText={"New Chat"}
        handleClick={handleClick}
      />
    </SContainer>
  )
}

export default ChatList
