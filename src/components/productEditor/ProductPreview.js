import React from 'react'
import styled from 'styled-components'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import assets from '../../assets'
import { FORMS } from '../../constants'
import { ifFirst } from '../../utils/functions'
import { EmptyImage } from '../common'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
  border-radius: 8px;
  margin-top: 4px;
  padding: 18px 20px 24px 20px;
`

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.12);
  border-radius: 2px;
`

const ButtonsBlock = styled.div`
  display: flex;
  margin-top: 2px;
  background: transparent;
`

const Button = styled.button`
  border: none;
  outline: none;
  background: #ffffff;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 0;
  flex: 1;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.12);
  margin-right: ${ifFirst('1', '0')}}px;
  margin-left: ${ifFirst('0', '1')}}px;
`

const Image = styled.img`
  width: 50%;
  height: 100%;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.12);
`

const Description = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 10px 14px 6px 14px;
  margin-left: 1px;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.12);
  flex-basis: 50%;
  width: 115px;
`

const Info = styled.div`
  display: flex;
  height: 93px;
`

const Title = styled.h3`
  font-family: FuturaBookC;
  font-size: 15px;
  line-height: 16px;
  margin: 4px 0 0 0;
  padding: 0;
  color: #3d4751;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const CategoryName = styled.span`
  font-family: FuturaDemiC;
  font-size: 7px;
  text-transform: uppercase;
  color: #162836;
  opacity: 0.3;
`

const Price = styled.span`
  font-family: FuturaDemiC;
  font-size: 15px;
  color: #f0640c;
  opacity: 0.7;
  margin-left: 4px;
`

const Discount = styled.span`
  font-family: FuturaDemiC;
  font-size: 8px;
  text-decoration-line: line-through;
  color: #535f69;
`

const Units = styled.span`
  font-family: FuturaBookC;
  font-size: 15px;
  color: #8e9192;
  margin-left: 3px;
`

const PriceBlock = styled.div`
  display: flex;
  margin-top: 10px;
`

const ButtonCaption = styled.span`
  font-family: FuturaBookC;
  font-size: 11px;
  margin-bottom: -2px;
  color: #f0640c;
  margin-left: 5px;
`

const ButtonIcon = styled.img`
  width: 13px;
  height: 13px;
`

const SectionTitle = styled.h2`
  font-family: FuturaMediumC;
  font-size: 12px;
  text-transform: uppercase;
  color: #000000;
  opacity: 0.2;
  margin: 0;
  padding: 0;
`

const Sup = styled.sup`
  font-family: FuturaDemiC;
  font-size: 8px;
  line-height: 9px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #8e9192;
`

const ProductPreviewDump = ({
  title,
  price,
  discount,
  measurement,
  image,
  category,
}) => {
  return (
    <Container>
      <SectionTitle>Превью товара</SectionTitle>
      <MainBlock>
        <Info>
          {image && <Image src={image && image.uri} />}
          {!image && <EmptyImage width="62%" height="100%" />}
          <Description>
            <CategoryName>{category}</CategoryName>
            <Title>{!!title ? title : 'Нет названия'}</Title>
            <PriceBlock>
              {!!discount && (
                <>
                  <Discount>{price} ₽</Discount>
                  <Price>{discount} ₽</Price>
                </>
              )}
              {!discount && <Price>{price || 0} ₽</Price>}
              <Units>
                {measurement === 'м3' ? (
                  <span>
                    м<Sup>3</Sup>
                  </span>
                ) : (
                  measurement
                )}
              </Units>
            </PriceBlock>
          </Description>
        </Info>
        <ButtonsBlock>
          <Button isFirst>
            <ButtonIcon src={assets.img.star} />
            <ButtonCaption>В избранное</ButtonCaption>
          </Button>
          <Button>
            <ButtonIcon src={assets.img.plus} />
            <ButtonCaption>Заказать</ButtonCaption>
          </Button>
        </ButtonsBlock>
      </MainBlock>
    </Container>
  )
}

const selector = formValueSelector(FORMS.PRODUCT_EDITOR)

const mapStateToProps = state => {
  const { title, price, discount, measurement } = selector(
    state,
    'title',
    'price',
    'discount',
    'measurement',
  )

  const image = selector(state, 'files') && selector(state, 'files')[0]

  return {
    title,
    price,
    discount,
    measurement,
    image,
  }
}

const ProductPreview = R.compose(connect(mapStateToProps))(ProductPreviewDump)

export default ProductPreview
