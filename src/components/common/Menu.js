import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const ifSelected = (onTrue, onFalse) => ({ selected }) =>
  selected ? onTrue : onFalse

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
`

const MenuItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 58px;
  margin-top: 2px;
  background: ${ifSelected(
    'linear-gradient(169.06deg, #F49355 0%, #F0640C 100%)',
    '#ffffff',
  )};
  border-radius: ${ifSelected('0px 8px 8px 0px', 0)};
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
  cursor: pointer;
`

const MenuItemTitle = styled.div`
  margin-left: 29px;
  font-family: FuturaMediumC;
  font-size: 18px;
  color: ${ifSelected('#fff', '#000')};
  opacity: ${ifSelected(1, 0.5)};
`

const Empty = styled.div`
  flex: 1;
  margin-top: 2px;
  background: #ffffff;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
`

const MenuDump = ({ items = [], history, currentLocation }) => {
  return (
    <Container>
      {items.map(({ route, title }) => (
        <MenuItemContainer
          selected={currentLocation === route}
          key={route}
          onClick={() => {
            history.push(route)
          }}
        >
          <MenuItemTitle selected={currentLocation === route}>
            {title}
          </MenuItemTitle>
        </MenuItemContainer>
      ))}

      <Empty />
    </Container>
  )
}

const Menu = withRouter(MenuDump)

export default Menu
