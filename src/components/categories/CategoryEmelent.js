import React from 'react'
import { connect } from 'react-redux'
import {
  Container,
  CategoryType,
  CategoryTitle,
} from './category-element-components'
import SubcategoryCreator from './SubcategoryCreator'
import SubcategoryElement from './SubcategoryElement'
import { useCategoryElement } from '../../effects/categories'
import {
  createCategoryRequest,
  updateCategoryRequest,
} from '../../modules/categories'

const CategoryElementDump = ({
  id,
  title,
  onClick,
  subcategories,
  selectedCategory,
  deleteSubcategoryRequest,
  createCategoryRequest,
  updateCategoryRequest,
}) => {
  const {
    deleteId,
    editId,
    setEditId,
    setDelete,
    onCancelDeleteClick,
    globalSelected,
    onAcceptDeleteClick,
    onSubcategoryContainerClick,
    stopEdit,
  } = useCategoryElement({
    selectedCategory,
    subcategories,
    id,
    deleteSubcategoryRequest: deleteSubcategoryRequest,
    onBlockClick: onClick,
  })

  return (
    <>
      <Container selected={selectedCategory === id} onClick={() => onClick(id)}>
        <CategoryType selected={selectedCategory === id}>
          {id === 1 ? 'Основная категория' : `Категория ${id}`}
        </CategoryType>
        <CategoryTitle selected={selectedCategory === id}>
          {title}
        </CategoryTitle>
      </Container>
      {globalSelected && (
        <>
          <SubcategoryCreator
            parentId={id}
            selectedCategory={selectedCategory}
            onClick={onCancelDeleteClick}
            action={createCategoryRequest}
            editId={editId}
            stopEdit={stopEdit}
          />
          {subcategories.map(subcategory => (
            <SubcategoryElement
              key={subcategory.id}
              deleteId={deleteId}
              parentId={id}
              editId={editId}
              selectedCategory={selectedCategory}
              onEditButtonClick={id => setEditId(id)}
              onDeleteButtonClick={setDelete}
              onCancelDeleteClick={onCancelDeleteClick}
              onAcceptDeleteClick={onAcceptDeleteClick}
              onSubcategoryContainerClick={onSubcategoryContainerClick}
              updateCategoryRequest={updateCategoryRequest}
              stopEdit={stopEdit}
              {...subcategory}
            />
          ))}
        </>
      )}
    </>
  )
}

const CategoryElement = connect(
  undefined,
  {
    createCategoryRequest,
    updateCategoryRequest,
  },
)(CategoryElementDump)

export default CategoryElement
