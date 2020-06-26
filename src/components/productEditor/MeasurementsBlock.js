import React, { useCallback } from 'react'
import styled from 'styled-components'
import MeasurementButton from './MeasurementButton'

const Container = styled.div`
  display: flex;
  margin-top: 15px;
`

const Sup = styled.sup`
  font-family: FuturaDemiC;
  font-size: 7px;
  line-height: 8px;
  text-transform: uppercase;
`

const Error = styled.span`
  font-family: FuturaBookC;
  font-size: 15px;
  line-height: 17px;

  color: #f55555;
`

const MeasurementsBlock = ({
  meta: { error, touched },
  input: { value, onChange } = {},
}) => {
  const onClick = useCallback(
    e => {
      onChange(e)
    },
    [onChange],
  )

  return (
    <>
      <Container>
        <MeasurementButton
          onClick={() => onClick('м3')}
          isSelected={value === 'м3'}
        >
          м<Sup>3</Sup>
        </MeasurementButton>
        <MeasurementButton
          onClick={() => onClick('кг')}
          isSelected={value === 'кг'}
        >
          кг
        </MeasurementButton>
        <MeasurementButton
          onClick={() => onClick('т')}
          isSelected={value === 'т'}
        >
          т
        </MeasurementButton>
        <MeasurementButton
          onClick={() => onClick('шт')}
          isSelected={value === 'шт'}
        >
          шт
        </MeasurementButton>
      </Container>
      {touched && (error && <Error>{error}</Error>)}
    </>
  )
}

export default MeasurementsBlock
