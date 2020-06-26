import React, { useMemo } from 'react'
import styled from 'styled-components'
import { ROUTES } from '../constants'
import { Menu } from '../components/common'
import { AuthRoute } from '../components/router-extensions'
import { Orders } from '../screens'
import { Categories, Promotions, Users, Drivers } from '../screens'

const Container = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
  @media (min-width: 1440px) {
    overflow-x: hidden;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
  height: 100%;
  width: 100%;
`

const Main = ({ currentLocation }) => {
  const menuItems = useMemo(
    () => [
      { route: ROUTES.ORDERS, title: 'Входящие заявки' },
      { route: ROUTES.CATEGORIES, title: 'Категории' },
      { route: ROUTES.PROMOTIONS, title: 'Акции' },
      { route: ROUTES.MODERATION, title: 'Модерация юридических лиц' },
      { route: ROUTES.DRIVERS, title: 'Водители' },
    ],
    [],
  )

  return (
    <Container>
      <Menu currentLocation={currentLocation} items={menuItems} />
      <ContentContainer>
        <AuthRoute exact path={ROUTES.ORDERS} component={Orders} />
        <AuthRoute path={ROUTES.CATEGORIES} component={Categories} />
        <AuthRoute path={ROUTES.PROMOTIONS} component={Promotions} />
        <AuthRoute path={ROUTES.MODERATION} component={Users} />
        <AuthRoute path={ROUTES.DRIVERS} component={Drivers} />
      </ContentContainer>
    </Container>
  )
}

export default Main
