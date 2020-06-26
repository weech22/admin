import React from 'react'
import styled from 'styled-components'
import { ifSelected } from '../../utils/functions'

const Button = styled.button`
  cursor: pointer;
  border: none;
  outline: none;

  background: ${ifSelected(
    'linear-gradient(135deg, #F49355 0%, #F0640C 100%)',
    '#ffffff',
  )};

  box-shadow: ${ifSelected(
    '0px 6px 10px rgba(247, 137, 68, 0.25)',
    '0px 6px 10px rgba(2, 9, 75, 0.06)',
  )};

  border-radius: 8px;
  width: 36px;
  height: 36px;
  margin-right: 10px;
  color: ${ifSelected('#fff', '#000')};
`

const Caption = styled.span`
  font-family: FuturaBookC;
  font-size: 16px;
  opacity: ${ifSelected('1', '0.6')};
`

const MeasurementButton = ({ isSelected, children, onClick }) => (
  <Button onClick={onClick} isSelected={isSelected}>
    <Caption>{children}</Caption>
  </Button>
)

export default MeasurementButton
