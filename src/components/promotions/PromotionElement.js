import React from 'react'
import styled from 'styled-components'
import { ifExpression } from '../../utils/functions'
import { usePromotionElement } from '../../effects/promotions'
import assets from '../../assets'

const ifSelected = (onTrue, onFalse) =>
  ifExpression(onTrue, onFalse, 'selected')

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 74px;
  margin-top: 4px;
`

const Container = styled.div`
  cursor: pointer;
  flex: 1;
  background: ${ifSelected(
    'linear-gradient(166.14deg, #F49355 0%, #F0640C 100%)',
    '#fff',
  )};
  border-radius: ${ifSelected('8px 0 0 8px', '8px')};
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
  padding: 12px 16px;
  min-height: 46px;
`

const Title = styled.div`
  font-family: FuturaBookC;
  font-size: 20px;
  letter-spacing: 0.01em;
  color: ${ifSelected('#fff', '#000')};
  opacity: ${ifSelected(1, 0.6)};
  max-width: 250px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const Discount = styled.div`
  font-family: FuturaDemiC;
  font-size: 23px;
  line-height: 27px;
  color: ${ifSelected('#fff', '#F0640C')};
  opacity: ${ifSelected(1, 0.7)};
  margin-top: 5px;
`

const Description = styled.div`
  font-family: FuturaBookC;
  font-size: 14px;
  color: ${ifSelected('#fff', '#000')};
  margin-top: 7px;
  margin-right: 0;
  opacity: ${ifSelected(0.8, 0.4)};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
`

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 36px;
  margin-left: 2px;
  justify-content: space-between;
`

const ActionButton = styled.div`
  display: flex;
  width: 36px;
  height: 36px;
  background: #fff;
  cursor: pointer;

  :first-child {
    border-top-right-radius: 8px;
  }

  :last-child {
    border-bottom-right-radius: 8px;
  }
`

const Icon = styled.img`
  margin: auto;
`

const PromotionElement = ({
  title,
  discount,
  description,
  id,
  requestDelete,
  deletePromotionId,
  disabled,
}) => {
  const {
    onPromotionItemClick,
    selected,
    isDeleting,
    onTopActionButtonClick,
    onBottomActionButtonClick,
  } = usePromotionElement({
    id,
    requestDelete,
    deletePromotionId,
  })

  return (
    <Wrapper>
      <Container onClick={onPromotionItemClick} selected={selected}>
        <Title selected={selected}>{title}</Title>
        {discount ? (
          <Discount selected={selected}>{discount} %</Discount>
        ) : description ? (
          <Description selected={selected}>{description}</Description>
        ) : null}
      </Container>
      {selected && (
        <ControlPanel>
          <ActionButton onClick={onTopActionButtonClick}>
            <Icon src={isDeleting ? assets.img.acceptRed : assets.img.basket} />
          </ActionButton>
          <ActionButton onClick={onBottomActionButtonClick}>
            <Icon
              src={
                isDeleting
                  ? assets.img.cancel
                  : disabled
                  ? assets.img.hideDisable
                  : assets.img.hideEnable
              }
            />
          </ActionButton>
        </ControlPanel>
      )}
    </Wrapper>
  )
}

export default PromotionElement
