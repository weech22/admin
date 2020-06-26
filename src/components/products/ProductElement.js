import React, { useCallback } from 'react'
import styled from 'styled-components'
import { ifSelected, ifExpression } from '../../utils/functions'
import assets from '../../assets'
import { useProductItem } from '../../effects/products'
import { EmptyImage } from '../common'

const delay = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

const ifDiscount = (onTrue, onFalse) =>
  ifExpression(onTrue, onFalse, 'discount')

const Container = styled.div`
  cursor: pointer;
  display: flex;
  border-radius: 8px;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
  margin-top: 4px;
  overflow: hidden;
  height: 74px;
  flex-shrink: 0;
`

const DescriptionBlock = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1;
  max-width: ${({ withDiscount }) => (withDiscount ? '100%' : '182px')};
  justify-content: space-between;
  padding: 9px 20px 8px 15px;
  background: ${ifSelected(
    'linear-gradient(164.23deg, #F49355 0%, #F0640C 100%)',
    '#fff',
  )};
`

const Image = styled.img`
  width: 75px;
  height: 100%;
  display: block;
`

const Title = styled.h3`
  font-family: FuturaBookC;
  font-size: 14px;
  color: ${ifSelected('#fff', '#000')};
  opacity: ${ifSelected('1', '0.6')};
  margin: 0;
  padding: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const PriceBlock = styled.div`
  display: flex;
  align-items: flex-end;
`

const Price = styled.div`
  font-family: FuturaDemiC;
  font-size: ${ifDiscount(12, 16)}px;
  color: ${ifSelected('#fff', '#000')};
  opacity: ${ifDiscount(0.6, ifSelected('1', '0.8'))};
  line-height: 19px;
  text-decoration: ${ifDiscount('line-through', 'inherit')};
`

const DiscountPrice = styled.span`
  font-family: FuturaDemiC;
  font-size: 16px;
  line-height: 19px;
  color: #f0640c;
  opacity: 0.7;
  margin-left: 7px;
`

const Sup = styled.sup`
  font-family: FuturaDemiC;
  font-size: 7px;
  line-height: 8px;
  text-transform: uppercase;
  color: ${ifSelected('#fff', '#000')};
  opacity: ${ifSelected('1', '0.4')};
`

const Units = styled.span`
  font-family: FuturaBookC;
  font-size: 16px;
  color: ${ifSelected('#fff', '#000')};
  opacity: ${ifSelected('1', '0.4')};
  margin-left: 2px;
`

const TopButton = styled.button`
  cursor: pointer;
  appearance: none;
  outline: none;
  border: none;
  background: #ffffff;
  border-radius: 0px 8px 0px 0px;
  margin-bottom: 2px;
  width: 36px;
  height: 36px;
`

const BottomButton = styled(TopButton)`
  margin: auto 0 0 0;
  border-radius: 0px 0px 8px 0px;
`

const ButtonsBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2px;
`

const InfoBlock = styled.div`
  display: flex;
  background: #ffffff;

  flex: 1;

  opacity: ${ifSelected('0.8', '1')};

  box-shadow: ${ifSelected('0px 6px 14px rgba(2, 9, 75, 0.06)', 'none')};
`

const ButtonIcon = styled.img`
  margin: auto;
`

const IdentityDiscount = styled.div`
  display: flex;
  width: 37px;
  height: 22px;
  border: 1px solid #f0640c;
  border-radius: 11px;
  margin-left: auto;
`

const EmptyPercent = styled.div`
  display: flex;
  align-self: center;
  width: 22px;
  height: 22px;
  margin-left: 5px;

  border: 1px solid #f0640c;
  box-sizing: border-box;
  border-radius: 11px;
`

const IdentityDiscountText = styled.div`
  display: flex;
  align-items: center;
  font-family: FuturaMediumC;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.02em;
  text-align: center;
  color: #f0640c;
  margin: auto;
`

const IdentityPecent = styled.img.attrs({ src: assets.img.percent })`
  margin-bottom: 2px;
  margin-left: 2px;
`

const DescriptionContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 7px;
  display: ${({ isDescriptionVisible }) =>
    isDescriptionVisible ? 'flex' : 'none'};
  justify-content: space-between;
  align-items: center;
  width: 240px;
  height: 38px;
  background: #ffffff;
  border: 1px solid #e5e6ec;
  box-sizing: border-box;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.17);
  border-radius: 40px;
  padding: 0 15px;
  opacity: ${({ currentOpacity }) => currentOpacity};
  transition: opacity 0.1s 0s;
  overflow: hidden;
`

const DescriptionText = styled.div`
  position: absolute;
  font-family: FuturaBookC;
  font-size: 14px;
  color: #000000;
  opacity: 0.4;
`

const nop = () => {}

const ProductElement = ({
  title,
  price,
  measurement,
  id,
  requestDelete = nop,
  deletingProductId,
  onProductClick = nop,
  isSelected,
  files,
  disableButtonsBlock,
  disabled,
  discount,
  withDiscount,
  productEmptyDiscount,
}) => {
  const { isDeleting, onTopButtonClick, onBottomButtonClick } = useProductItem({
    id,
    deleteId: deletingProductId,
    requestDelete,
  })

  const [isDescriptionVisible, setDescriptionVisible] = React.useState(false)
  const [currentOpacity, setOpacity] = React.useState(0)

  const onClick = useCallback(() => {
    onProductClick(id)
  }, [id, onProductClick])

  return (
    <Container>
      <InfoBlock onClick={onClick}>
        {files && files[0] ? (
          <Image src={files[0].uri} />
        ) : (
          <EmptyImage width="75px" height="74px" />
        )}
        <DescriptionBlock withDiscount={withDiscount} isSelected={isSelected}>
          <Title isSelected={isSelected}>{title}</Title>

          <PriceBlock>
            <Price
              discount={!!discount && discount !== 0 && withDiscount}
              isSelected={isSelected}
            >
              {Number(price)} ₽{' '}
            </Price>
            {withDiscount &&
              !!discount && discount !== 0 && (
                  <DiscountPrice>
                    {Math.round(Number(price) * ((100 - discount) / 100))} ₽
                  </DiscountPrice>
                )}
            <Units isSelected={isSelected}>
              {measurement === 'м3' ? (
                <span>
                  м<Sup isSelected={isSelected}>3</Sup>
                </span>
              ) : (
                measurement
              )}
            </Units>
            {withDiscount && !!productEmptyDiscount && (
              <>
                <IdentityDiscount>
                  <IdentityDiscountText>
                    {productEmptyDiscount} <IdentityPecent />
                  </IdentityDiscountText>
                </IdentityDiscount>
                <EmptyPercent
                  onMouseEnter={() => {
                    setDescriptionVisible(true)
                    delay(300).then(() => {
                      setOpacity(1)
                    })
                  }}
                >
                  <IdentityPecent style={{ margin: 'auto' }} />
                </EmptyPercent>
              </>
            )}
          </PriceBlock>
          <DescriptionContainer
            isDescriptionVisible={isDescriptionVisible}
            currentOpacity={currentOpacity}
            onMouseLeave={() => {
              setDescriptionVisible(false)
              setOpacity(0)
            }}
          >
            <DescriptionText>Товар уже имеет скидку</DescriptionText>
            <IdentityDiscount style={{ marginLeft: 'auto' }}>
              <IdentityDiscountText>
                {productEmptyDiscount} <IdentityPecent />
              </IdentityDiscountText>
            </IdentityDiscount>
          </DescriptionContainer>
        </DescriptionBlock>
      </InfoBlock>
      {!disableButtonsBlock && (
        <ButtonsBlock>
          <TopButton onClick={onTopButtonClick}>
            <ButtonIcon
              src={isDeleting ? assets.img.acceptRed : assets.img.garbage}
            />
          </TopButton>
          <BottomButton onClick={onBottomButtonClick}>
            <ButtonIcon
              src={
                isDeleting
                  ? assets.img.cancel
                  : disabled
                  ? assets.img.hideDisable
                  : assets.img.hideEnable
              }
            />
          </BottomButton>
        </ButtonsBlock>
      )}
    </Container>
  )
}

export default ProductElement
