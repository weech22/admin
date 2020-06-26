import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Loader from './Loader'
import { getTaskModalVisible } from '../../modules/ui'

const Container = styled.div`
  position: absolute;
  display: flex;
  z-index: 10;
  background: #ecf1f4;
  opacity: 0.8;
  width: 100%;
  height: 100%;
`

const StyledLoader = styled(Loader)`
  margin: auto;
`

const TaskLoader = () => {
  const isVisible = useSelector(getTaskModalVisible)

  return (
    isVisible && (
      <Container>
        <StyledLoader />
      </Container>
    )
  )
}

export default TaskLoader
