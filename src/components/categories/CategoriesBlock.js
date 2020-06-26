import React, { useCallback } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import {
  deleteSubcategoryRequest,
  getCategoriesList,
  setSelectedCategory,
  getSelectedCategory,
} from '../../modules/categories'
import { PageBlock, ListHeaderBlock, ListTitleBlock } from '../common'
import CategoryEmelent from './CategoryEmelent'

const CategoriesBlockDump = ({
  categories,
  selectedCategory,
  deleteSubcategoryRequest,
  selectCategory,
}) => {
  const onCategoryElementClick = useCallback(
    id => {
      if (id !== selectedCategory) {
        selectCategory(id)
      }
    },
    [selectedCategory, selectCategory],
  )

  return (
    <PageBlock>
      <ListHeaderBlock>
        <ListTitleBlock>Категории</ListTitleBlock>
      </ListHeaderBlock>
      {categories.map(props => (
        <CategoryEmelent
          key={props.id}
          selectedCategory={selectedCategory}
          deleteSubcategoryRequest={deleteSubcategoryRequest}
          onClick={onCategoryElementClick}
          {...props}
        />
      ))}
    </PageBlock>
  )
}

const CategoriesBlock = connect(
  R.applySpec({
    categories: getCategoriesList,
    selectedCategory: getSelectedCategory,
  }),
  {
    deleteSubcategoryRequest,
    selectCategory: setSelectedCategory,
  },
)(CategoriesBlockDump)

export default CategoriesBlock
