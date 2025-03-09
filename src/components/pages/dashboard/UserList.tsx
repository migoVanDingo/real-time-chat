import React from "react"
import styled from "styled-components"
import { SFlexCol, SFlexRow } from "../../common/styled/SFlexContainer"
import ModuleHeader from "../../complex/ModuleHeader"
import { useUserList } from "../../../hooks/useUserList"



const SListContainer = styled(SFlexCol)`
  width: 100%;
  padding: ${({ theme }) => theme.styles.container.padding.small};
  gap: 10px;
`

const SColContainer = styled(SFlexCol)`
  padding: ${({ theme }) => theme.styles.container.padding.small};
  border-radius: ${({ theme }) => theme.styles.container.borderRadius.small};
  width: 100%;
  gap: 3px;
  align-items: flex-start;
  overflow: hidden;
`

const SRowContainer = styled(SFlexRow)`
  width: 100%;
  background-color: ${({ theme }) => theme.styles.colors.grey_15};
  border-radius: ${({ theme }) => theme.styles.container.borderRadius.small};
  transform: translateY(0); /* Default position */
  transition: all 0.2s ease;
  cursor: pointer;

  &.box-shadow {
    border: 1px solid ${({ theme }) => theme.styles.colors.grey_10};
    box-shadow: 0 2px 3px ${({ theme }) => theme.styles.colors.grey_11};
    &:hover {
      border: 2px solid ${({ theme }) => theme.styles.colors.green_1};
      color: ${({ theme }) => theme.styles.colors.green_1};
      background-color: ${({ theme }) => theme.styles.colors.grey_15};
      transform: translateY(-3px);
    }
  }

  &.align-center {
    align-items: center;
    justify-content: space-between;
    padding-right: ${({ theme }) => theme.styles.container.padding.small};
  }
`

const SText = styled.p`
  &.name {
    font-size: ${({ theme }) => theme.styles.text.size.medium};
    font-weight: ${({ theme }) => theme.styles.text.weight.medium};
  }
  &.tagline {
    font-size: ${({ theme }) => theme.styles.text.size.small};
    font-weight: ${({ theme }) => theme.styles.text.weight.light};
    font-style: italic;
  }

  margin: 0;
  padding: 0;
`
const SOnlineMarker = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;

  &.online {
    background-color: ${({ theme }) => theme.styles.colors.green_3};
  }
  &.offline {
    background-color: ${({ theme }) => theme.styles.colors.grey_11};
  }
`


const SContainer = styled(SFlexCol)`
  grid-area: user-list;
  border-left: 1px solid ${({ theme }) => theme.styles.colors.grey_10};
  height: calc(100vh - 60px);
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.styles.colors.grey_14};

  @media (max-width: 768px) {
    position: absolute;
    left: -100%;
    transition: all 0.2s ease;
    
    &.show {
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) => theme.styles.colors.grey_14};
      border-right: none;
      border-bottom: 1px solid ${({ theme }) => theme.styles.colors.grey_10};
      overflow-y: scroll;
    }

  }
`

// User list component
const UserList = ({ username, mobileView }: any) => {
  const { userList, loading, getRandomQuote } = useUserList(username)

  return (
    <SContainer className={mobileView === "user-list" ? "show" : ""}>
      <ModuleHeader heading={"User List"} headingStyles={"f-weight-200 f-md p-1"} />
      <SListContainer>
        {userList.map((user: any, index: number) => (
          <SRowContainer key={index} className={"box-shadow"}>
            <SColContainer>
              <SRowContainer className={"align-center"}>
                <SText className={"name"}>{user.username}</SText>
                <SOnlineMarker className={true ? "online" : "offline"} />
              </SRowContainer>
              <SText className={"tagline"}>{getRandomQuote()}</SText>
            </SColContainer>
          </SRowContainer>
        ))}
      </SListContainer>
    </SContainer>
  )
}

export default UserList

