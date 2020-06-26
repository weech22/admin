import React from 'react'
import styled from 'styled-components'
import assets from '../../assets'
import {
  SubcategoryWrapper,
  SubcategoryProductsText,
  SubcategoryTitle,
  SubcategoryContainer,
} from './category-element-components'
import SubcategoryCreator from './SubcategoryCreator'

const EditIcon = styled.img.attrs({ src: assets.img.pencil })``

const Icon = styled.img`
  margin: auto;
`

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 2px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  background: #ffffff;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
  border-radius: 0px 8px 8px 0px;
  margin-left: 2px;
`

const CancelButtonContainer = styled(ButtonContainer)`
  border-radius: 0;
`

const SubcategoryElement = ({
  deleteId,
  editId,
  selectedCategory,
  onDeleteButtonClick,
  onCancelDeleteClick,
  onAcceptDeleteClick,
  onSubcategoryContainerClick,
  onEditButtonClick,
  parentId,
  updateCategoryRequest,
  stopEdit,
  ...subcategory
}) => {
  return editId === subcategory.id ? (
    <SubcategoryCreator
      selectedCategory={selectedCategory}
      parentId={parentId}
      action={updateCategoryRequest}
      initialValue={subcategory.title}
      initialIsCreating
      onSend={stopEdit}
      onCancel={stopEdit}
      onBlurComponent={stopEdit}
      restDataForSending={subcategory}
    />
  ) : (
    <SubcategoryWrapper>
      <SubcategoryProductsText withoutOpacity={deleteId === subcategory.id}>
        {deleteId === subcategory.id ? (
          <Icon src={assets.img.basket} />
        ) : (
          subcategory.count
        )}
      </SubcategoryProductsText>
      <SubcategoryContainer
        onClick={() =>
          selectedCategory !== subcategory.id &&
          onSubcategoryContainerClick(subcategory.id)
        }
        selected={selectedCategory === subcategory.id}
      >
        <SubcategoryTitle selected={selectedCategory === subcategory.id}>
          {subcategory.title}
        </SubcategoryTitle>
        {selectedCategory === subcategory.id && deleteId !== subcategory.id && (
          <EditIcon
            onClick={() => {
              onEditButtonClick(subcategory.id)
            }}
          />
        )}
      </SubcategoryContainer>
      {selectedCategory === subcategory.id && deleteId !== subcategory.id && (
        <ButtonContainer onClick={() => onDeleteButtonClick(subcategory.id)}>
          <Icon src={assets.img.basket} />
        </ButtonContainer>
      )}
      {deleteId === subcategory.id && (
        <CancelButtonContainer onClick={onCancelDeleteClick}>
          <Icon src={assets.img.cancel} />
        </CancelButtonContainer>
      )}
      {deleteId === subcategory.id && (
        <ButtonContainer onClick={() => onAcceptDeleteClick(subcategory.id)}>
          <Icon src={assets.img.acceptRed} />
        </ButtonContainer>
      )}
    </SubcategoryWrapper>
  )
}

export default SubcategoryElement
