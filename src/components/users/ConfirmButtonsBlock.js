import React, { useState, useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ConfirmButton from './ConfirmButton'
import { setUserStatusRequest } from '../../modules/users'

const Container = styled.div`
  display: flex;
  background: transparent;
`

const ConfirmButtonsBlockDump = ({ status, userId, setUserStatus }) => {
  const [isAccepted, setIsAccepted] = useState(null)

  const onAccept = useCallback(() => {
    if (!isAccepted) {
      setUserStatus({ userId, status: 'accepted' })
    }
    setIsAccepted(true)
  }, [userId, setUserStatus, isAccepted])

  const onReject = useCallback(() => {
    if (isAccepted) {
      setUserStatus({ userId, status: 'rejected' })
    }
    setIsAccepted(false)
  }, [userId, setUserStatus, isAccepted])

  useEffect(() => {
    switch (status) {
      case 'none':
        setIsAccepted(null)
        break
      case 'accepted':
        setIsAccepted(true)
        break
      case 'rejected':
        setIsAccepted(false)
        break
      default:
        setIsAccepted(null)
    }
  }, [status])

  return (
    <Container>
      <ConfirmButton type="accept" isAccepted={isAccepted} onClick={onAccept} />
      <ConfirmButton type="reject" isAccepted={isAccepted} onClick={onReject} />
    </Container>
  )
}

const ConfirmButtonsBlock = connect(
  null,
  { setUserStatus: setUserStatusRequest },
)(ConfirmButtonsBlockDump)

export default ConfirmButtonsBlock
