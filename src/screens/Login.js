import React from 'react'
import * as R from 'ramda'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { TextInput, Button } from '../components/common'
import { FORMS } from '../constants'
import { sendLogin } from '../modules/auth'
import { getLoginErrors } from '../modules/redux-form'
import { withRediretToMain } from '../utils'

const Container = styled.div`
  display: flex;
  flex: 1;
  background: #ecf1f4;
`

const LoginFormTitle = styled.div`
  font-family: FuturaBookC;
  font-size: 25px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.01em;
  color: linear-gradient(170.86deg, #3d4751 0%, #162836 108.75%);
`

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
  border-radius: 8px;
  height: 340px;
  padding: 44px 39px 0 38px;
`

const LoginTextInput = styled(TextInput)`
  width: 283px;
  margin-top: 16px;

  :first-child: {
    margin-top: 34px;
  }
`

const LoginButton = styled(Button)`
  margin-top: 27px;
  width: 100%;
`

const ErrorText = styled.div`
  font-family: FuturaBookC;
  text-align: center;
  margin-top: 16px;
  color: #f55555;
`

const FieldsContainer = styled.form`
  display: flex;
  flex-direction: column;
`

const inputLabelProps = {
  style: {
    color: '#000000',
    opacity: 0.4,
    fontFamily: 'FuturaBookC',
    fontSize: 17,
  },
}

const LoginDump = ({ sendLogin, handleSubmit, submitting, errors }) => (
  <Container>
    <LoginFormContainer>
      <LoginFormTitle>Авторизация</LoginFormTitle>
      <FieldsContainer>
        <Field
          name="login"
          component={LoginTextInput}
          inputLabelProps={inputLabelProps}
          label="Логин"
        />
        <Field
          name="password"
          component={LoginTextInput}
          inputLabelProps={inputLabelProps}
          type="password"
          label="Пароль"
        />
      </FieldsContainer>
      <LoginButton
        title="Войти"
        onClick={handleSubmit(sendLogin)}
        isLoading={submitting}
      />
      {errors.description && <ErrorText>{errors.description}</ErrorText>}
    </LoginFormContainer>
  </Container>
)

const Login = R.compose(
  reduxForm({
    form: FORMS.LOGIN,
  }),
  connect(
    R.applySpec({ errors: getLoginErrors }),
    { sendLogin },
  ),
  withRediretToMain(),
)(LoginDump)

export default Login
