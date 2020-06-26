import * as R from 'ramda'
import {
  getSelectedCategoryEntity,
  getSelectedCategory,
  getMainCategoryById,
  getCategoriesList,
} from '../categories'

const getProducts = R.prop('products')

export const getById = R.pipe(
  getProducts,
  R.prop('byId'),
)

export const getAllIds = R.pipe(
  getProducts,
  R.prop('allIds'),
)

export const getIsLoading = R.pipe(
  getProducts,
  R.prop('isLoading'),
)

export const getProductsList = R.converge(
  (byId, allIds) => allIds.map(x => byId[x]),
  [getById, getAllIds],
)

export const getSelectedProduct = R.pipe(
  getProducts,
  R.prop('selectedProduct'),
)

export const getSelectedProductInfo = R.converge(
  (byId, selectedId) => byId[selectedId],
  [getById, getSelectedProduct],
)

export const getProductEditorInitialValues = state => {
  const currentProduct = getSelectedProductInfo(state)
  const isCreating = getIsCreatingProduct(state)

  if (currentProduct) {
    return currentProduct
  }

  if (!isCreating) {
    return {}
  }

  const selectedCategory = getSelectedCategory(state)
  const allCategories = getCategoriesList(state)

  const selectedSubcategory = R.pipe(
    R.map(R.prop('subcategories')),
    R.flatten,
    R.find(x => x.id === selectedCategory),
    R.prop('id'),
  )(allCategories)

  return {
    categoryId: selectedSubcategory,
  }
}

export const getIsCreatingProduct = R.pipe(
  getProducts,
  R.prop('isCreatingProduct'),
)
