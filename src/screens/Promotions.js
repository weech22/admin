import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Loader } from '../components'
import {
  PromotionsBlock,
  PromotionsEditorBlock,
  PromotionProductBlock,
} from '../components/promotions'
import { useAction } from '../effects'
import {
  getPromotionsRequest,
  getIsLoadingPromotions,
} from '../modules/promotions'

const StyledLoader = styled(Loader)`
  margin: auto;
  align-self: center;
`

const Wrap = styled.div`
  background: #ecf1f4;
  display: flex;
  flex: 1;
  overflow-y: scroll;
  padding: 0 10px;
`

const Promotions = () => {
  const isLoading = useSelector(getIsLoadingPromotions)
  const getPromotions = useAction(getPromotionsRequest)

  React.useEffect(() => {
    getPromotions()
  }, [getPromotions])

  return (
    <Wrap>
      {isLoading ? (
        <StyledLoader />
      ) : (
        <>
          <PromotionsBlock />
          <PromotionsEditorBlock />
          <PromotionProductBlock />
        </>
      )}
    </Wrap>
  )
}

export default Promotions
