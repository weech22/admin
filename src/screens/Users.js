import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { UsersTable } from '../components/users'
import { getUsersRequest, getIsLoading, getUsersList } from '../modules/users'

const Wrap = styled.div`
  background: #ecf1f4;
  display: flex;
  flex: 1;
  overflow-y: scroll;
  padding: 20px 20px 20px 30px;
`

const UsersDump = ({ userList, getUsers, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    getUsers({ page: 0 })
  }, [])

  const containerRef = useBottomScrollListener(() => {
    setCurrentPage(currentPage + 1)
    getUsers({ page: currentPage + 1 })
  })

  return (
    <Wrap ref={containerRef}>
      <UsersTable setCurrentPage={setCurrentPage} users={userList} />
    </Wrap>
  )
}

const Users = connect(
  R.applySpec({
    isLoading: getIsLoading,
    userList: getUsersList,
  }),
  { getUsers: getUsersRequest },
)(UsersDump)

export default Users
