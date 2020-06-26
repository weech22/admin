import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'
import assets from '../../assets'
import MeasurementsBlock from './MeasurementsBlock'
import { TextInput, NumberFormatCustom } from '../common'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background: #ffffff;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
  border-radius: 8px;

  margin-top: 4px;
  padding: 18px 20px 24px 20px;
`

const SectionTitle = styled.h2`
  font-family: FuturaMediumC;
  font-size: 12px;
  text-transform: uppercase;
  color: #000000;
  opacity: 0.2;

  margin: 0;
  padding: 0;
`

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  border: 1px solid #f0640c;
  box-sizing: border-box;
  border-radius: 2px;
  margin: 0;
  background: #ffffff;
  outline: none;
  appearance: none;
  cursor: pointer;
  width: 16px;
  height: 16px;
  &:checked {
    background-image: url(${assets.img.tick});
    background-repeat: no-repeat;
    background-position: center 1px;
  }
`

const DiscountLabel = styled.label`
  font-family: FuturaBookC;
  font-size: 14px;
  color: #000000;
  opacity: 0.6;
  margin-left: 10px;
`

const DiscountBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`

const PriceBlock = styled.div`
  display: flex;
  width: 100%;
`

const InputBlock = styled.div`
  flex: 1;
`

const DiscountInputBlock = styled(InputBlock)`
  margin-left: 10px;
`

const MinQuantity = styled.div`
  margin-top: 9px;
`

const inputProps = {
  inputComponent: NumberFormatCustom,
  style: {
    padding: '10px 15px !important',
    fontFamily: 'FuturaBookC',
    fontSize: '14px',
    color: '#000000',
    opacity: '0.8',
    overflow: 'hidden',
  },
}

const labelPropsStyle = {
  fontSize: 14,
}

const PriceAndQuantity = ({ discount, initialDiscountChecked = false }) => {
  const [isDiscountChecked, setDiscountChecked] = useState(
    initialDiscountChecked,
  )

  useEffect(() => {
    setDiscountChecked(!!discount)
  }, [discount])

  return (
    <Container>
      <SectionTitle>Цена и количество</SectionTitle>
      <DiscountBlock>
        <Checkbox
          onChange={() => setDiscountChecked(!isDiscountChecked)}
          checked={isDiscountChecked}
        />
        <DiscountLabel>Скидка</DiscountLabel>
      </DiscountBlock>
      <PriceBlock>
        <InputBlock>
          <Field
            name="price"
            component={TextInput}
            inputProps={inputProps}
            label="Цена"
            parse={Number}
          />
        </InputBlock>
        {isDiscountChecked && (
          <DiscountInputBlock>
            <Field
              name="discount"
              component={TextInput}
              inputProps={inputProps}
              label="Цена со скидкой"
              labelPropsStyle={labelPropsStyle}
              parse={Number}
            />
          </DiscountInputBlock>
        )}
      </PriceBlock>
      <Field name="measurement" component={MeasurementsBlock} />

      <MinQuantity>
        <Field
          name="minCount"
          component={TextInput}
          inputProps={inputProps}
          label="Минимальное кол-во"
          parse={Number}
        />
        <Field
          name="count"
          component={TextInput}
          inputProps={inputProps}
          label="Кол-во на складе"
          parse={Number}
        />
      </MinQuantity>
    </Container>
  )
}

export default PriceAndQuantity
