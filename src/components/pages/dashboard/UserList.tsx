import React from "react"
import styled from "styled-components"
import { SFlexCol } from "../../common/styled/SFlexContainer"
import ModuleHeader from "../../complex/ModuleHeader"

const SContainer = styled(SFlexCol)`
  grid-area: user-list;
  border-left: 1px solid ${({ theme }) => theme.styles.colors.grey_10};
  height: calc(100vh - 60px);
  overflow-y: scroll;
`

const UserList = () => {
  return (
    <SContainer>
      <ModuleHeader
        heading={"User List"}
        headingStyles={"f-weight-200 f-md p-1"}
      />
    </SContainer>
  )
}

export default UserList
