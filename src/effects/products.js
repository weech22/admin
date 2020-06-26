import { useEffect, useMemo, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { taskService } from '../utils'
import {
  getProductsRequest,
  deleteProductRequest,
  getIsLoading,
  getProductsList,
  disabledProductRequest,
  selectProduct,
  createProduct,
} from '../modules/products'
import {
  resetSelectedCategory,
  getSelectedCategory,
} from '../modules/categories'
import useAction from './useAction'

export const useProduct = () => {
  const selectedCategory = useSelector(getSelectedCategory)
  const isLoading = useSelector(getIsLoading)
  const products = useSelector(getProductsList)
  const selectProductAction = useAction(selectProduct)

  const createProductAction = useAction(createProduct)

  const dispatch = useDispatch()
  const [searchLine, setSearchLine] = useState('')

  const [deletingProductId, requestDeleteProductId] = useState(null)

  const requestDelete = useCallback(
    id => {
      requestDeleteProductId(id)
    },
    [requestDeleteProductId],
  )

  const searchProducts = useMemo(
    () =>
      taskService(
        value =>
          dispatch(
            getProductsRequest({ searchLine: value, discountType: 'simple' }),
          ),
        500,
      ),
    [],
  )

  const onChangeSearchLine = useCallback(
    value => {
      setSearchLine(value)
      searchProducts(value)
      selectedCategory && dispatch(resetSelectedCategory())
      dispatch(selectProduct(null))
    },
    [selectedCategory],
  )

  const onProductClick = useCallback(id => {
    selectProductAction(id)
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      selectProductAction(null)
    }
  }, [selectedCategory])

  useEffect(() => {
    if (selectedCategory) {
      setSearchLine('')
    }
  }, [selectedCategory])

  const onAddProductClick = useCallback(() => {
    createProductAction()
  }, [])

  return {
    searchLine,
    onChangeSearchLine,
    isLoading,
    products,
    deletingProductId,
    requestDelete,
    selectedCategory,
    onProductClick,
    onAddProductClick,
  }
}

export const useProductItem = ({ deleteId, id, requestDelete }) => {
  const selectedCategory = useSelector(getSelectedCategory)

  const isDeleting = useMemo(() => deleteId === id, [deleteId, id])

  const deleteProduct = useAction(deleteProductRequest)
  const requestDisableProduct = useAction(disabledProductRequest)

  const onTopButtonClick = useCallback(() => {
    if (!isDeleting) {
      requestDelete(id)
    } else {
      deleteProduct(id)
    }
  }, [isDeleting, requestDelete, id, deleteProduct])

  const onBottomButtonClick = useCallback(() => {
    if (isDeleting) {
      requestDelete(null)
    } else {
      requestDisableProduct(id)
    }
  }, [requestDelete, isDeleting, id])

  useEffect(() => {
    requestDelete(null)
  }, [selectedCategory])

  return { isDeleting, onTopButtonClick, onBottomButtonClick }
}
