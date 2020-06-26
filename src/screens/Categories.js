import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Loader } from '../components/common'
import { CategoriesBlock } from '../components/categories'
import { ProductEditor } from '../components/productEditor'
import {
  getCategoriesRequest,
  getIsLoading,
  resetSelectedCategory,
} from '../modules/categories'
import { ProductsBlock } from '../components/products'

const Wrap = styled.div`
  background: #ecf1f4;
  display: flex;
  flex: 1;
  overflow-y: scroll;
  padding: 0 10px;
`

const StyledLoader = styled(Loader)`
  margin: auto;
  align-self: center;
`

const CategoriesDump = ({
  getCategories,
  isLoading,
  resetSelectedCategory,
}) => {
  React.useEffect(() => {
    getCategories()

    return () => {
      resetSelectedCategory()
    }
  }, [getCategories, resetSelectedCategory])

  return (
    <Wrap>
      {isLoading ? (
        <StyledLoader />
      ) : (
        <>
          <CategoriesBlock />
          <ProductsBlock />
          <ProductEditor />
        </>
      )}
    </Wrap>
  )
}

const Categories = connect(
  R.applySpec({
    isLoading: getIsLoading,
  }),
  { getCategories: getCategoriesRequest, resetSelectedCategory },
)(CategoriesDump)

export default Categories
