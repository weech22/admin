import React from 'react'
import styled from 'styled-components'
import { reduxForm, Field } from 'redux-form'
import * as R from 'ramda'
import { connect } from 'react-redux'
import {
  PageBlock,
  CategoriesEmptyList,
  ListHeaderBlock,
  ListTitleBlock,
  TextInput,
} from '../common'
import {
  getSelectedDriver,
  createDriverRequest,
  updateDriverRequest,
  getIsCreatingDriver,
  getFormInitialValues,
  getDriverError,
  getIsPostingDriver,
} from '../../modules/drivers'
import { FORMS } from '../../constants'
import assets from '../../assets'

const FormContainer = styled.div`
  background: #fff;
  padding: 20px;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
  border-radius: 8px;
`

const Header = styled(ListHeaderBlock)`
  display: flex;
  justify-content: space-between;
  padding-top: 0;
  padding-bottom: 0;
  min-height: 36px;
  margin-bottom: 4px;
`

const ConfirmButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: linear-gradient(135deg, #f49355 0%, #f0640c 100%);
  box-shadow: 0px 4px 10px rgba(247, 137, 68, 0.55);
  border-radius: 0px 8px 8px 0px;
  cursor: pointer;
  outline: none;
`

const ErrorText = styled.span`
  color: #f55555;
  font-family: FuturaBookC;
  font-size: 15px;
  line-height: 17px;
`

const HeaderTitle = styled(ListTitleBlock)`
  align-self: center;
`

const ConfirmIcon = styled.img.attrs({ src: assets.img.whiteTick })``

const required = value => (value ? undefined : 'Required')

const inputProps = {
  style: {
    padding: '10px 15px !important',
    fontFamily: 'FuturaBookC',
    fontSize: '14px',
    color: '#000000',
    opacity: '0.8',
  },
}

const DriversInfoDump = ({
  selectedDriver,
  isCreatingDriver,
  createDriver,
  updateDriver,
  pristine,
  handleSubmit,
  isPostingDriver,
  driverError,
}) => {
  return (
    <PageBlock>
      <Header>
        <HeaderTitle>Данные водителя</HeaderTitle>
        {!pristine && (!!selectedDriver || isCreatingDriver) && (
          <ConfirmButton
            disabled={isPostingDriver}
            onClick={handleSubmit(
              isCreatingDriver ? createDriver : updateDriver,
            )}
          >
            <ConfirmIcon />
          </ConfirmButton>
        )}
      </Header>
      {(!!selectedDriver || isCreatingDriver) && (
        <FormContainer>
          {driverError && <ErrorText>Водитель уже существует</ErrorText>}
          <Field
            name="name"
            inputProps={inputProps}
            component={TextInput}
            label="ФИО"
            validate={required}
          />
          <Field
            name="login"
            inputProps={inputProps}
            component={TextInput}
            label="Email"
            validate={required}
          />
          <Field
            name="phone"
            inputProps={inputProps}
            component={TextInput}
            label="Телефон"
            validate={required}
          />
          <Field
            name="password"
            inputProps={inputProps}
            component={TextInput}
            label="Пароль для входа в приложение"
            validate={required}
          />
        </FormContainer>
      )}
      {!selectedDriver && !isCreatingDriver && (
        <CategoriesEmptyList title={`Выберите водителя`} />
      )}
    </PageBlock>
  )
}

const DriversInfo = R.compose(
  connect(
    R.applySpec({
      initialValues: getFormInitialValues,
      selectedDriver: getSelectedDriver,
      driverError: getDriverError,
      isCreatingDriver: getIsCreatingDriver,
      isPostingDriver: getIsPostingDriver,
    }),
    {
      createDriver: createDriverRequest,
      updateDriver: updateDriverRequest,
    },
  ),
  reduxForm({
    form: FORMS.DRIVER,
    enableReinitialize: true,
  }),
)(DriversInfoDump)

export default DriversInfo
