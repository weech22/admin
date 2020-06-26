import React, { useCallback, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import * as R from 'ramda'
import { connect } from 'react-redux'
import assets from '../../assets'
import {
  getCategoriesList,
  getSelectedCategory,
  getSelectedCategoryEntity,
} from '../../modules/categories'
import {
  getIsCreatingProduct,
  getSelectedProductInfo,
} from '../../modules/products'

const Container = styled.div`
  position: relative;
  margin-top: 14px;
`

const StyledSelect = styled.select`
  width: 100%;
  background: #ffffff;
  border: 1px solid #f49355;
  box-sizing: border-box;
  border-radius: 8px;
  appearance: none;
  padding: 9.5px 15px;
  outline: none;
  font-family: FuturaBookC;
  font-size: 14px;
`

const SubcategoryButton = styled.button`
  cursor: pointer;
  width: 5.5px;
  height: 8px;
  border: none;
  outline: none;
  background: transparent url(${assets.img.triangle}) 0px 0px no-repeat;
  position: absolute;
  right: 15px;
  top: 16px;
  padding: 0;
`

const PlaceholderOption = styled.option`
  font-family: FuturaBookC;
  font-size: 14px;
  line-height: 15px;
`

const Error = styled.span`
  font-family: FuturaBookC;
  font-size: 15px;
  line-height: 17px;

  color: #f55555;
`

const SelectDump = ({
  categories,
  selectedCategory,
  selectedCategoryEntity,
  isCreatingProduct,
  selectedProduct: { categoryId } = {},
  meta: { touched, error },
  input: { value, onChange },
}) => {
  const isMainCategory = useMemo(
    () => R.prop('subcategories', selectedCategoryEntity) !== undefined,
    [selectedCategoryEntity],
  )

  const parentCategory = useMemo(
    () =>
      selectedCategory
        ? isMainCategory
          ? selectedCategoryEntity
          : categories.find(({ subcategories }) =>
              subcategories.map(x => x.id).includes(selectedCategory),
            )
        : categories.find(({ subcategories }) =>
            subcategories.map(x => x.id).includes(categoryId),
          ),
    [
      categories,
      isMainCategory,
      selectedCategory,
      selectedCategoryEntity,
      categoryId,
    ],
  )

  const handleChange = useCallback(
    e => {
      onChange(e.target.value)
    },
    [onChange],
  )

  useEffect(() => {
    if (isCreatingProduct && !isMainCategory) {
      onChange(selectedCategory)
    }
  }, [])

  return (
    <Container>
      <StyledSelect onChange={handleChange} value={value}>
        {isCreatingProduct && isMainCategory && (
          <PlaceholderOption value="" disabled hidden>
            Подкатегория
          </PlaceholderOption>
        )}
        {parentCategory &&
          parentCategory.subcategories.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
      </StyledSelect>
      <SubcategoryButton />
      {touched && (error && <Error>{error}</Error>)}
    </Container>
  )
}

const Select = connect(
  R.applySpec({
    categories: getCategoriesList,
    selectedCategory: getSelectedCategory,
    selectedCategoryEntity: getSelectedCategoryEntity,
    isCreatingProduct: getIsCreatingProduct,
    selectedProduct: getSelectedProductInfo,
  }),
)(SelectDump)

export default Select
