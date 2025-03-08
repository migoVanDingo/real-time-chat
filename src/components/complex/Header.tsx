import React from 'react'
import styled from 'styled-components'
import { SFlexRow } from '../common/styled/SFlexContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import Heading from '../common/functional/text/Heading'
import { Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

const SHeaderContainer = styled(SFlexRow)`
  width: 100vw;
  height: 60px;
  padding: ${({ theme }) => theme.styles.container.padding.small} ${({ theme }) => theme.styles.container.padding.large};
  border: 1px solid ${({ theme }) => theme.styles.colors.grey_10};
  position:relative;
  top:0;
  margin: 0;
  gap: ${({ theme }) => theme.styles.container.padding.medium};
`

const SRowContainer = styled(SFlexRow)`
  align-items: center;
  gap: ${({ theme }) => theme.styles.container.padding.small};
  &.align-right {
    margin-left: auto;
  }
`

const SIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.styles.colors.blue_3};
  font-size: ${({ theme }) => theme.styles.heading.size.h2};
  margin: 0 0.5rem;
`



const Header = ({ username }: any) => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <SHeaderContainer id="header">
      <SRowContainer>
        <SIcon icon={faComments} />
        <Heading heading={`Chatterbox`} styles={"f-weight-400 f-md"} />
      </SRowContainer>

      <SRowContainer className={"align-right"}>
        <Heading heading={`Welcome`} styles={"f-weight-200 f-sm"} />
        <Heading heading={username} styles={"f-weight-400 f-sm"} />
      </SRowContainer>
      <SRowContainer>
        <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation"/>
      </SRowContainer>
    </SHeaderContainer>
  )
}

export default Header