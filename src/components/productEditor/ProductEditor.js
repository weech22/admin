import React, { useCallback, useState, useMemo } from 'react'
import styled from 'styled-components'
import { reduxForm } from 'redux-form'
import * as R from 'ramda'
import { connect } from 'react-redux'
import ProductMainInfo from './ProductMainInfo'
import ProductPreview from './ProductPreview'
import PriceAndQuantity from './PriceAndQuantity'
import Photos from './Photos'
import {
  getSelectedProduct,
  updateProduct,
  createProductRequest,
  getIsCreatingProduct,
  getProductEditorInitialValues,
} from '../../modules/products'
import { CategoriesEmptyList, PageBlock } from '../common'
import assets from '../../assets'
import {
  getCategoriesList,
  getSelectedCategory,
  getSelectedCategoryEntity,
} from '../../modules/categories'
import { FORMS } from '../../constants'
import { validate } from '../../utils/functions'

const Container = styled.div``

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
  border-radius: 8px;
  padding-left: 20px;
  min-height: 36px;
  margin-bottom: 4px;
`

const ListTitle = styled.h2`
  font-family: FuturaMediumC;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  color: #000000;
  opacity: 0.4;
  padding: 0;
  margin: 2px 0 0 0;
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

const ConfirmIcon = styled.img.attrs({ src: assets.img.whiteTick })``

const ProductEditorDump = ({
  selectedProduct,
  pristine,
  handleSubmit,
  updateProduct,
  createProductRequest,
  selectedCategory,
  selectedCategoryEntity,
  categories,
  isCreatingProduct,
  initialValues = {},
}) => {
  const [deletedPhotos, setDeletedPhotos] = useState([])

  const isMainCategory = useMemo(
    () => R.prop('subcategories', selectedCategoryEntity) !== undefined,
    [selectedCategoryEntity],
  )

  const parentCategory = useMemo(
    () =>
      isMainCategory
        ? selectedCategoryEntity
        : categories.find(({ subcategories }) =>
            subcategories.map(x => x.id).includes(selectedCategory),
          ),

    [categories, isMainCategory, selectedCategory, selectedCategoryEntity],
  )

  const onPhotoDelete = useCallback(
    id => {
      setDeletedPhotos([...deletedPhotos, id])
    },
    [deletedPhotos, setDeletedPhotos],
  )

  const onSubmit = React.useCallback(() => {
    handleSubmit(
      isCreatingProduct
        ? createProductRequest
        : props => updateProduct({ ...props, deletedPhotos }),
    )()
  }, [
    createProductRequest,
    deletedPhotos,
    handleSubmit,
    isCreatingProduct,
    updateProduct,
  ])

  return (
    <PageBlock>
      <ListHeader>
        <ListTitle>
          {isCreatingProduct ? `Создание товара` : `Редактирование товара`}
        </ListTitle>
        {!pristine && (!!selectedProduct || isCreatingProduct) && (
          <ConfirmButton onClick={onSubmit}>
            <ConfirmIcon />
          </ConfirmButton>
        )}
      </ListHeader>
      {(selectedProduct || isCreatingProduct) && (
        <Container>
          <ProductMainInfo />
          <PriceAndQuantity discount={initialValues.discount} />
          <Photos onPhotoDelete={onPhotoDelete} />
          <ProductPreview category={parentCategory && parentCategory.title} />
        </Container>
      )}
      {!selectedProduct && !isCreatingProduct && (
        <CategoriesEmptyList title="Выберите товар" />
      )}
    </PageBlock>
  )
}

const ProductEditor = R.compose(
  connect(
    R.applySpec({
      selectedProduct: getSelectedProduct,
      initialValues: getProductEditorInitialValues,
      categories: getCategoriesList,
      selectedCategory: getSelectedCategory,
      selectedCategoryEntity: getSelectedCategoryEntity,
      isCreatingProduct: getIsCreatingProduct,
    }),
    { updateProduct, createProductRequest },
  ),
  reduxForm({
    form: FORMS.PRODUCT_EDITOR,
    enableReinitialize: true,
    validate,
  }),
)(ProductEditorDump)

export default ProductEditor
