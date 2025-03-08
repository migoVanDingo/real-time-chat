import React from 'react'
import { SFlexCol } from '../../common/styled/SFlexContainer'
import styled from 'styled-components'

const SContainer = styled(SFlexCol)`
  grid-area: main;
  height: calc(100vh - 60px);
`

const MainChat = () => {
  return (
    <SContainer>MainChat</SContainer>
  )
}

export default MainChat