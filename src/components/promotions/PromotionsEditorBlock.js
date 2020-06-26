import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import styled from 'styled-components'
import {
  PageBlock,
  ListHeaderBlock,
  ListTitleBlock,
  CategoriesEmptyList,
  RadioInput,
  TextInput,
  NumberFormatCustom,
} from '../common'
import { usePromotionsEditor } from '../../effects/promotions'
import { FORMS } from '../../constants'
import PromotionFile from './PromotionFile'
import { getInitialPromotionValues } from '../../modules/promotions'
import assets from '../../assets'

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
  border-radius: 8px;
  margin-top: 4px;
  padding: 18px 20px 24px 20px;
`

const EditorContainerPreview = styled(EditorContainer)`
  padding: 18px 0 0 0;
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

const PreviewSectionTitle = styled(SectionTitle)`
  margin-left: 20px;
`

const StyledRadioInput = styled(RadioInput)`
  margin-top: 16px;
  .MuiFormControlLabel-root {
    margin-left: -3px;

    :last-child {
      margin-top: 10px;
    }
  }

  .MuiTypography-root {
    font-family: FuturaBookC;
    font-size: 14px;
    color: #000000;
    margin-left: 10px;
    opacity: 0.6;
  }
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

const Header = styled(ListHeaderBlock)`
  display: flex;
  justify-content: space-between;
  padding-top: 0;
  padding-bottom: 0;
  min-height: 36px;
  margin-bottom: 4px;
`

const HeaderTitle = styled(ListTitleBlock)`
  align-self: center;
`

const ConfirmIcon = styled.img.attrs({ src: assets.img.whiteTick })``

const inputProps = {
  style: {
    padding: '10px 15px !important',
    fontFamily: 'FuturaBookC',
    fontSize: '14px',
    color: '#000000',
    opacity: '0.8',
  },
}

const numberInputProps = {
  inputComponent: props => <NumberFormatCustom format="###" {...props} />,
  style: {
    padding: '10px 15px !important',
    fontFamily: 'FuturaBookC',
    fontSize: '14px',
    color: '#000000',
    opacity: '0.8',
    overflow: 'hidden',
  },
}

const promotionNormilizer = val => {
  const numberVal = Number(val)

  return numberVal > 100 ? 100 : numberVal < 0 ? 0 : numberVal
}

const PromotionsEditorBlockDump = ({ pristine, handleSubmit }) => {
  const {
    visible,
    promotionDiscountInputs,
    promotionDiscountInput,
    withPromotion,
    promotionValues,
    onSavePromotionClick,
    isCreating,
    selectedPromotion,
  } = usePromotionsEditor({ handleSubmit })

  return (
    <PageBlock>
      <Header>
        <HeaderTitle>Настройки акции</HeaderTitle>
        {!pristine && (!!selectedPromotion || isCreating) && (
          <ConfirmButton onClick={onSavePromotionClick}>
            <ConfirmIcon />
          </ConfirmButton>
        )}
      </Header>
      {visible ? (
        <>
          <EditorContainer>
            <SectionTitle>Основные данные</SectionTitle>
            <StyledRadioInput
              inputs={promotionDiscountInputs}
              input={promotionDiscountInput}
            />
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
            {withPromotion && (
              <Field
                name="discount"
                component={TextInput}
                inputProps={numberInputProps}
                label="Размер скидки"
                helperText="Новая цена на товар с учетом скидки высчитывается автоматически"
                parse={Number}
                onChangeNormilizer={promotionNormilizer}
              />
            )}
          </EditorContainer>
          <EditorContainerPreview>
            <PreviewSectionTitle>Превью</PreviewSectionTitle>
            <Field
              name="background"
              component={PromotionFile}
              previewTitle={promotionValues.title}
              previewDescription={promotionValues.description}
              previewDiscount={promotionValues.discount}
            />
          </EditorContainerPreview>
        </>
      ) : (
        <CategoriesEmptyList title="Выберите акцию" />
      )}
    </PageBlock>
  )
}

const validator = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Вы не ввели название'
  }
  if (!values.description) {
    errors.description = 'Вы не ввели описание'
  }

  if (!values.product) {
    errors.product = 'Выберите товар для акции'
  }

  return errors
}

const PromotionsEditorBlock = R.compose(
  connect(R.applySpec({ initialValues: getInitialPromotionValues })),
  reduxForm({
    form: FORMS.PROMOTION_EDITOR,
    enableReinitialize: true,
    validate: validator,
  }),
)(PromotionsEditorBlockDump)

export default PromotionsEditorBlock
