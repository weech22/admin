import React from 'react'
import { change, reset, SubmissionError } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux'
import {
  getPromotionsList,
  setSelectedPromotion,
  getSelectedPromotion,
  togglePromotionDisable,
  deletePromotionRequest,
  getIsCreatingPromotion,
  updatePromotionRequest,
  getPromotionProduct,
  setPromotionCreating,
  resetSelectedPromotion,
  setPromotionProduct,
  createPromotionRequest,
} from '../modules/promotions'
import {
  getPromotionFormValues,
  getPromotionDiscount,
  getPromotionFormProduct,
} from '../modules/redux-form'
import {
  getIsLoading as getIsLoadingProducts,
  getProductsRequest,
  getProductsList,
  clearProducts,
} from '../modules/products'

import useAction from './useAction'
import { taskService } from '../utils'
import { FORMS } from '../constants'

export const usePromotions = () => {
  const promotions = useSelector(getPromotionsList)
  const [deletePromotionId, setDeletePromotionId] = React.useState(null)
  const createPromotionAction = useAction(setPromotionCreating)
  const resetPromotion = useAction(resetSelectedPromotion)

  const dispatch = useDispatch()

  const createPromotion = React.useCallback(() => {
    createPromotionAction(true)
    resetPromotion()

    dispatch(reset(FORMS.PROMOTION_EDITOR))
  }, [createPromotionAction, dispatch, resetPromotion])

  return {
    promotions,
    requestDelete: setDeletePromotionId,
    deletePromotionId,
    createPromotion,
  }
}

export const usePromotionElement = ({
  id,
  requestDelete,
  deletePromotionId,
}) => {
  const createPromotionAction = useAction(setPromotionCreating)
  const selectPromotion = useAction(setSelectedPromotion)
  const deletePromotion = useAction(deletePromotionRequest)
  const disablePromotion = useAction(togglePromotionDisable)

  const selectedPromotion = useSelector(getSelectedPromotion)

  const selected = React.useMemo(() => selectedPromotion === id, [
    selectedPromotion,
    id,
  ])

  const isDeleting = React.useMemo(() => deletePromotionId === id, [
    deletePromotionId,
    id,
  ])

  const onPromotionItemClick = React.useCallback(() => {
    createPromotionAction(false)
    selectPromotion(id)
    requestDelete(null)
  }, [createPromotionAction, id, requestDelete, selectPromotion])

  const onTopActionButtonClick = React.useCallback(() => {
    if (isDeleting) {
      deletePromotion(id)
    } else {
      requestDelete(id)
    }
  }, [deletePromotion, id, isDeleting, requestDelete])

  const onBottomActionButtonClick = React.useCallback(() => {
    if (isDeleting) {
      requestDelete(null)
    } else {
      disablePromotion(id)
    }
  }, [disablePromotion, id, isDeleting, requestDelete])

  return {
    onPromotionItemClick,
    selected,
    onTopActionButtonClick,
    onBottomActionButtonClick,
    isDeleting,
  }
}

export const usePromotionsEditor = ({ handleSubmit }) => {
  const selectedId = useSelector(getSelectedPromotion)
  const selectedPromotion = useSelector(getSelectedPromotion)
  const promotionValues = useSelector(getPromotionFormValues)
  const isCreating = useSelector(getIsCreatingPromotion)

  const dispatch = useDispatch()

  const updatePromotion = useAction(updatePromotionRequest)
  const createPromotion = useAction(createPromotionRequest)

  const [withPromotion, setWithPromotion] = React.useState('0')

  const promotionDiscountInputs = React.useMemo(
    () => [
      { value: '0', label: 'Скидка на товар' },
      { value: '1', label: 'Реклама на товар' },
    ],
    [],
  )

  React.useEffect(() => {
    setWithPromotion(promotionValues.discount === 0 ? '1' : '0')
  }, [selectedPromotion])

  React.useEffect(() => {
    if (isCreating) {
      setWithPromotion('0')
    }
  }, [isCreating])

  const onSavePromotionClick = React.useCallback(() => {
    handleSubmit(props => {
      if (!props.product) {
        throw new SubmissionError({ product: 'Error' })
      }

      return isCreating
        ? createPromotion(
            withPromotion === '1' ? { ...props, discount: null } : props,
          )
        : updatePromotion(
            withPromotion === '1' ? { ...props, discount: null } : props,
          )
    })()
  }, [handleSubmit, isCreating, createPromotion, updatePromotion])

  return {
    visible: !!selectedId || isCreating,
    withPromotion: withPromotion === '0',
    promotionDiscountInputs,
    promotionDiscountInput: {
      value: withPromotion,
      onChange: value => {
        setWithPromotion(value)
        value === '1' && dispatch(change(FORMS.PROMOTION_EDITOR, 'discount', 0))
      },
    },
    promotionValues,
    onSavePromotionClick,
    isCreating,
    selectedPromotion,
  }
}

export const usePromotionProducts = ({ submitFailed, submitting }) => {
  const selectedPromotion = useSelector(getSelectedPromotion)
  const product = useSelector(getPromotionProduct)
  const formProduct = useSelector(getPromotionFormProduct)
  const isCreating = useSelector(getIsCreatingPromotion)
  const isLoading = useSelector(getIsLoadingProducts)
  const products = useSelector(getProductsList)
  const discount = useSelector(getPromotionDiscount)

  const dispatch = useDispatch()

  const searchProductsAction = useAction(getProductsRequest)
  const clearProductsState = useAction(clearProducts)
  const setProduct = useAction(setPromotionProduct)
  const setIsCreating = useAction(setPromotionCreating)

  const [searchValue, setSearchValue] = React.useState('')
  const [isSearchOpen, setSearchOpen] = React.useState(false)
  const [isOpen, setOpen] = React.useState(false)

  const searchProducts = React.useMemo(
    () =>
      taskService(value => {
        searchProductsAction(value)
      }, 500),
    [],
  )

  const onChangeSearchValue = React.useCallback(value => {
    setSearchValue(value)

    searchProducts({
      discountType: 'simple',
      searchLine: value,
      withoutPromotion: '1',
    })
  }, [])

  React.useEffect(() => {
    return () => {
      clearProductsState()
      setIsCreating()
    }
  }, [])

  React.useEffect(() => {
    if (submitFailed && !formProduct) {
      setOpen(true)
      setSearchOpen(true)
    }
  }, [formProduct, submitFailed])

  React.useEffect(() => {
    if (!isSearchOpen) {
      setSearchOpen('')
    }
  }, [isSearchOpen])

  React.useEffect(() => {
    setOpen(false)
    setSearchOpen(false)
  }, [submitting, selectedPromotion])

  const onProductClick = React.useCallback(
    id => {
      dispatch(change(FORMS.PROMOTION_EDITOR, 'product', id))
      setProduct(products.find(product => product.id === id))
      setOpen(false)
      setSearchOpen(false)
      setSearchValue('')
      clearProductsState()
    },
    [clearProductsState, dispatch, products, setProduct],
  )

  return {
    isEnable: (!!selectedPromotion || isCreating) && !isLoading,
    formProduct,
    product,
    productVisible: !!formProduct && !isSearchOpen && !isLoading,
    isEmptyListVisible: !formProduct && !isSearchOpen && !isLoading,
    isCreating,
    selectedPromotion,
    isSearchOpen,
    setSearchOpen,
    isLoading,
    searchValue,
    onChangeSearchValue,
    products,
    onProductClick,
    isOpen,
    setOpen,
    error: submitFailed && !formProduct,
    discount,
  }
}
