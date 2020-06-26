import React from 'react'
import styled from 'styled-components'
import {
  SubcategoryWrapper,
  SubcategoryContainer,
  SubcategoryTitle,
} from './category-element-components'
import assets from '../../assets'
import { ifExpression } from '../../utils/functions'
import { useSubcategoryCreator } from '../../effects/categories'

const ifCreating = (onTrue, onFalse) =>
  ifExpression(onTrue, onFalse, 'isCreating')

const SubcategoryCreatorContainer = styled(SubcategoryContainer)`
  display: flex;
  padding-right: 0;
  padding-left: ${ifCreating(0, 15)}px;
`

export const StatusIcon = styled.img.attrs({ src: assets.img.plus })`
  transform: rotateZ(${ifCreating(45, 0)}deg);
`

const AcceptIcon = styled.img.attrs({ src: assets.img.accept })`
  margin: 7.69px 9.48px 11.48px 9.69px;
`

const AcceptContaner = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #f49355 0%, #f0640c 100%);
  box-shadow: 0px 4px 10px rgba(247, 137, 68, 0.55);
  border-radius: 0px 8px 8px 0px;
  margin-left: auto;
`

const Input = styled.input.attrs({ placeholder: 'Введите название' })`
  width: 100%;
  height: 100%;
  background: #ffffff;
  padding: 0 15px;
  border: 1px solid #f0640c;
  box-sizing: border-box;
  border-radius: 8px 0px 0px 8px
  border-right-width: 0;
  font-family: FuturaBookC;
  font-size: 17px;
  outline: none;
`

const SubcategoryCreator = ({
  parentId,
  selectedCategory,
  onClick,
  initialValue = '',
  initialIsCreating = false,
  action,
  onSend,
  onCancel,
  onBlurComponent,
  restDataForSending = {},
  editId,
  stopEdit,
}) => {
  const {
    isCreating,
    onFullFieldClick,
    onCancelClick,
    subcategoryTitle,
    onChangeInputText,
    onEnterPress,
    onCreateSubcategoryClick,
  } = useSubcategoryCreator({
    initialValue,
    initialIsCreating,
    onClick,
    parentId,
    selectedCategory,
    action,
    onSend,
    onCancel,
    onBlurComponent,
    restDataForSending,
    editId,
    stopEdit,
  })

  return (
    <SubcategoryWrapper onClick={onFullFieldClick}>
      <StatusIcon isCreating={isCreating} onClick={onCancelClick} />
      <SubcategoryCreatorContainer isCreating={isCreating}>
        {isCreating ? (
          <Input
            value={subcategoryTitle}
            onChange={onChangeInputText}
            onKeyDown={onEnterPress}
            autoFocus
          />
        ) : (
          <SubcategoryTitle isInsertButton>
            Добавить подкатегорию
          </SubcategoryTitle>
        )}
        {isCreating && (
          <AcceptContaner onClick={onCreateSubcategoryClick}>
            <AcceptIcon />
          </AcceptContaner>
        )}
      </SubcategoryCreatorContainer>
    </SubcategoryWrapper>
  )
}

export default SubcategoryCreator
