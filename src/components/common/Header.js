import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import styled from 'styled-components'
import assets from '../../assets'
import { getToken, logout } from '../../modules/auth'

const hasToken = (onTrue, onFalse) => ({ token }) => (token ? onTrue : onFalse)

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px;
  height: 58px;
  background: #ecf1f4;
  justify-content: space-between;

  background: ${hasToken(
    'linear-gradient(177.04deg, #3d4751 0%, #162836 108.75%)',
    '#ecf1f4',
  )};
`

const Icon = styled.img`
  :last-child {
    margin-left: 15px;
  }
`

const UserLogin = styled.div`
  font-family: FuturaBookC;
  font-size: 19px;
  color: #ffffff;
  opacity: 0.6;
`

const UserPanel = styled.div`
  display: flex;
  align-items: center;
  height: 100;
  cursor: pointer;
`

const HeaderDump = ({ token, logout }) => {
  const logoSource = React.useMemo(
    () => (token ? assets.img.logoLogin : assets.img.logo),
    [token],
  )

  const logoutUser = React.useCallback(() => {
    logout()
  }, [logout])

  return (
    <Container token={token}>
      <Icon src={logoSource} />
      {token && (
        <UserPanel onClick={logoutUser}>
          <UserLogin>Admin</UserLogin>
          <Icon src={assets.img.logout} />
        </UserPanel>
      )}
    </Container>
  )
}

const Header = connect(
  R.applySpec({ token: getToken }),
  { logout },
)(HeaderDump)

export default Header
