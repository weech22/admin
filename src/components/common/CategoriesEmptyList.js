import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: #ffffff;
  opacity: 0.7;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 48px;
  text-align: center;
  min-height: 74px;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
`

const EmptyListCaption = styled.span`
  font-family: FuturaBookC;
  font-size: 18px;
  line-height: 21px;
  color: #3d4751;
  opacity: 0.5;
`

const EmptyList = ({ title, className }) => (
  <Container>
    <EmptyListCaption className={className}>{title}</EmptyListCaption>
  </Container>
)

export default EmptyList
