import React, { useCallback } from 'react'
import styled from 'styled-components'
import Loader from './Loader'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  width: 100%;
  background: #f0640c;
  border-radius: 8px;
  cursor: pointer;
`

const Title = styled.p`
  font-family: FuturaBookC;
  font-size: 17px;
  color: #fff;
  text-align: center;
`

const StyledLoader = styled(Loader).attrs({
  type: 'ball-scale',
  size: 20,
  color: 'secondary',
})``

const Button = ({ title, onClick, className, isLoading }) => {
  const onClickHandler = useCallback(() => {
    if (isLoading) {
      return
    }

    onClick()
  }, [isLoading, onClick])

  return (
    <Container onClick={onClickHandler} className={className}>
      {title && !isLoading && <Title>{title}</Title>}
      {isLoading && <StyledLoader />}
    </Container>
  )
}

export default Button
