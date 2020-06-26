import React from 'react'
import styled from 'styled-components'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { PageBlock, Searchbar, Loader, CategoriesEmptyList } from '../common'
import ProductElement from './ProductElement'
import { useProduct } from '../../effects/products'
import {
  selectProduct,
  getSelectedProduct,
  createProduct,
  getIsCreatingProduct,
} from '../../modules/products'
import { getSelectedCategory } from '../../modules/categories'

const StyledLoader = styled(Loader)`
  margin: auto;
  align-self: center;
`

const ProductsBlockDump = ({ selectedProduct, isCreatingProduct }) => {
  const {
    onChangeSearchLine,
    searchLine,
    isLoading,
    products,
    requestDelete,
    deletingProductId,
    selectedCategory,
    onProductClick,
    onAddProductClick,
  } = useProduct()

  return (
    <PageBlock>
      <Searchbar
        caption="Товары"
        onChange={onChangeSearchLine}
        value={searchLine}
        onClick={onAddProductClick}
        isCreatingProduct={isCreatingProduct}
        disabled={!selectedCategory}
      />
      {isLoading && <StyledLoader />}
      {!isLoading &&
        products.map(props => (
          <ProductElement
            key={props.id}
            deletingProductId={deletingProductId}
            requestDelete={requestDelete}
            isSelected={props.id === selectedProduct}
            onProductClick={onProductClick}
            {...props}
          />
        ))}
      {!isLoading && !products.length && (
        <CategoriesEmptyList title={`Выберите категорию или\nподкатегорию`} />
      )}
    </PageBlock>
  )
}

const ProductsBlock = connect(
  R.applySpec({
    selectedProduct: getSelectedProduct,
    selectedCategory: getSelectedCategory,
    isCreatingProduct: getIsCreatingProduct,
  }),
  { selectProduct, createProduct },
)(ProductsBlockDump)

export default ProductsBlock
