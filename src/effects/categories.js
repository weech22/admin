import { useState, useEffect, useCallback, useMemo } from 'react'
import * as R from 'ramda'

export const useCategoryElement = ({
  selectedCategory,
  subcategories,
  id,
  onAcceptDelete,
  deleteSubcategoryRequest,
  onBlockClick,
}) => {
  const [deleteId, setDelete] = useState(null)
  const [editId, setEditId] = useState(null)

  const stopEdit = useCallback(() => {
    setEditId(null)
  }, [])

  const onCancelDeleteClick = useCallback(() => {
    stopEdit()
    setDelete(null)
  }, [stopEdit])
  const globalSelected = useMemo(
    () =>
      selectedCategory === id ||
      R.any(({ id }) => id === selectedCategory, subcategories),
    [id, selectedCategory, subcategories],
  )

  const onAcceptDeleteClick = useCallback(
    subcategoryId => {
      setDelete(null)
      onAcceptDelete && onAcceptDelete(id)
      deleteSubcategoryRequest({
        id: subcategoryId,
        parentId: id,
      })
    },
    [deleteSubcategoryRequest, id, onAcceptDelete],
  )

  const onSubcategoryContainerClick = useCallback(
    subcategoryId => {
      onBlockClick(subcategoryId)
      setDelete(null)
    },
    [onBlockClick],
  )

  useEffect(() => {
    setDelete(null)
  }, [selectedCategory])

  return {
    editId,
    setEditId,
    deleteId,
    setDelete,
    onCancelDeleteClick,
    globalSelected,
    onAcceptDeleteClick,
    stopEdit,
    onSubcategoryContainerClick,
  }
}

export const useSubcategoryCreator = ({
  initialValue,
  initialIsCreating,
  onClick,
  action,
  parentId,
  selectedCategory,
  onSend,
  onCancel,
  onBlurComponent,
  restDataForSending,
  editId,
  stopEdit,
}) => {
  const [isCreating, setCreating] = useState(initialIsCreating)
  const [subcategoryTitle, setSubcategoryTitle] = useState(initialValue)
  const [isMount, setMount] = useState(false)

  const onFullFieldClick = useCallback(() => {
    if (!isCreating) {
      stopEdit()
      setCreating(true)
      onClick && onClick()
    }
  }, [isCreating, onClick, stopEdit])

  const onCreateSubcategoryClick = useCallback(() => {
    if (subcategoryTitle) {
      action({ ...restDataForSending, title: subcategoryTitle, parentId })
      setCreating(false)
      onSend && onSend()
      setSubcategoryTitle('')
    }
  }, [action, subcategoryTitle, parentId, onSend, restDataForSending])

  const onCancelClick = useCallback(() => {
    onCancel && onCancel()
    setCreating(!isCreating)
  }, [isCreating, onCancel])

  const onChangeInputText = useCallback(({ target: { value } }) => {
    setSubcategoryTitle(value)
  }, [])

  const onEnterPress = useCallback(
    ({ keyCode }) => {
      if (keyCode === 13) {
        onCreateSubcategoryClick()
      }
    },
    [onCreateSubcategoryClick],
  )

  useEffect(() => {
    if (isMount) {
      onBlurComponent && onBlurComponent()
      setCreating(false)
      setSubcategoryTitle('')
    } else {
      setMount(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory])

  useEffect(() => {
    if (isMount && editId) {
      setCreating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId])

  return {
    isCreating,
    setCreating,
    subcategoryTitle,
    setSubcategoryTitle,
    onFullFieldClick,
    onCreateSubcategoryClick,
    onCancelClick,
    onChangeInputText,
    onEnterPress,
  }
}
