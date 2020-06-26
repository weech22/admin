import React from 'react'
import { usePromotions } from '../../effects/promotions'
import { PageBlock, Searchbar } from '../common'
import PromotionElement from './PromotionElement'

const PromotionsBlock = () => {
  const {
    promotions,
    deletePromotionId,
    requestDelete,
    createPromotion,
  } = usePromotions()

  return (
    <PageBlock>
      <Searchbar
        onClick={createPromotion}
        caption="Акции"
        disableSearchIcon
        disabled={false}
      />
      {promotions.map(promotion => (
        <PromotionElement
          key={promotion.id}
          deletePromotionId={deletePromotionId}
          requestDelete={requestDelete}
          {...promotion}
        />
      ))}
    </PageBlock>
  )
}

export default PromotionsBlock
