import React from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'
import { TextInput } from '../common'
import SubcategorySelect from './SubcategorySelect'

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

const inputProps = {
  style: {
    padding: '10px 15px !important',
    fontFamily: 'FuturaBookC',
    fontSize: '14px',
    color: '#000000',
    opacity: '0.8',
  },
}

const ProductMainInfo = () => (
  <Container>
    <SectionTitle>Основные данные</SectionTitle>
    <Field
      name="title"
      component={TextInput}
      inputProps={inputProps}
      label="Название"
    />
    <Field
      name="description"
      component={TextInput}
      inputProps={inputProps}
      multiline
      label="Описание"
    />
    <Field
      name="categoryId"
      component={SubcategorySelect}
      inputProps={inputProps}
      label="Подкатегория"
    />
  </Container>
)

export default ProductMainInfo
