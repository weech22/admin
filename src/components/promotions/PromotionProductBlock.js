import React from 'react'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'
import { PageBlock, CategoriesEmptyList, Loader } from '../common'
import { ProductElement } from '../products'
import ProductHeader from './ProductHeader'
import { usePromotionProducts } from '../../effects/promotions'
import { ifExpression, getPercent } from '../../utils/functions'
import { FORMS } from '../../constants'

const ifEnable = (onTrue, onFalse) => ifExpression(onTrue, onFalse, 'isEnable')

const StyledLoader = styled(Loader)`
  margin: auto;
  align-self: center;
`

const EmptyList = styled(CategoriesEmptyList)`
  display: flex;
  ${ifEnable('color: #f0640c;', '')}
  ${ifEnable('opacity: 0.7;', '')}
`

const ErrorLabel = styled.div`
  font-family: FuturaBookC;
  font-size: 15px;
  line-height: 17px;
  color: #f55555;
  margin-top: 10px;
`

const PromotionsEditorBlockDump = ({ submitFailed, submitting }) => {
  const {
    isEnable,
    product,
    productVisible,
    isSearchOpen,
    setSearchOpen,
    isLoading,
    searchValue,
    onChangeSearchValue,
    products,
    selectedPromotion,
    isCreating,
    onProductClick,
    isEmptyListVisible,
    isOpen,
    setOpen,
    discount,
    error,
  } = usePromotionProducts({ submitFailed, submitting })

  return (
    <PageBlock>
      <ProductHeader
        isEnable={!!selectedPromotion || isCreating}
        isOpen={isOpen}
        setOpen={setOpen}
        isSearchOpen={isSearchOpen}
        setSearchOpen={setSearchOpen}
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
        error={error}
      />
      {isEmptyListVisible && (
        <EmptyList
          isEnable={isEnable}
          title={isEnable ? 'Выберите акционный товар' : 'Выберите акцию'}
        />
      )}
      {productVisible && (
        <ProductElement
          disableButtonsBlock
          {...product}
          discount={discount}
          withDiscount
        />
      )}
      {isLoading && <StyledLoader />}
      {!isLoading &&
        isSearchOpen &&
        !!products.length &&
        products.map(product => (
          <ProductElement
            key={`product.${product.id}`}
            onProductClick={onProductClick}
            disableButtonsBlock
            productEmptyDiscount={getPercent(
              product.price,
              product.simpleDiscount,
            )}
            {...product}
            discount={discount}
            withDiscount
          />
        ))}
      {error && !isEmptyListVisible && !products.length && (
        <ErrorLabel>Выберите товар для акции</ErrorLabel>
      )}
    </PageBlock>
  )
}

const PromotionsEditorBlock = reduxForm({
  form: FORMS.PROMOTION_EDITOR,
  destroyOnUnmount: false,
})(PromotionsEditorBlockDump)

export default PromotionsEditorBlock
