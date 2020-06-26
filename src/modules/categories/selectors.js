import * as R from 'ramda'

const getCategories = R.prop('categories')

const getById = R.pipe(
  getCategories,
  R.prop('byId'),
)

const getAllIds = R.pipe(
  getCategories,
  R.prop('allIds'),
)

export const getCategoriesList = R.converge(
  (byId, allIds) => R.map(x => byId[x])(allIds),
  [getById, getAllIds],
)

export const getIsLoading = R.pipe(
  getCategories,
  R.prop('isLoading'),
)

export const getSelectedCategory = R.pipe(
  getCategories,
  R.prop('selectedCategory'),
)

export const getSelectedCategoryEntity = R.converge(
  (byId, selected) => byId[selected],
  [getById, getSelectedCategory],
)

export const getMainCategoryById = state => {
  const categories = getCategoriesList(state)
  const selectedCategory = getSelectedCategory(state)
  return categories.find(
    x =>
      x.id === selectedCategory ||
      !!x.subcategories.find(x => x.id === selectedCategory),
  )
}
