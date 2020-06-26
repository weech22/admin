import React from 'react'
import styled from 'styled-components'
import PromotionFileInput from './PromotionFileInput'
import assets from '../../assets'

const PreviewContainer = styled.div`
  margin-top: 19px;
  max-width: 100%;
  border-radius: 0 0 8px 8px;
  height: 175px;
  position: relative;
  overflow: hidden;
`

const PreviewImageOpacity = styled.div`
  z-index: 1;
  position: absolute;
  background: #162836;
  opacity: 0.6;
  width: 100%;
  height: 100%;
`

const PreviewImage = styled.img`
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
`

const PreviewDescriptionContainer = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 59px;
  left: 20px;
  background: #ffffff;
  width: 230px;
  border-radius: 2px;
  padding: 10px 16px 14px 16px;
`

const PreviewTitle = styled.div`
  font-family: FuturaBookC;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.01em;

  :first-letter {
    color: #f0640c;
  }
`

const PreviewDescription = styled.div`
  font-family: FuturaBookC;
  font-size: 11px;
  line-height: 12px;
  color: #162836;
  opacity: 0.5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-top: 6px;
  width: 198px;
`

const DescriptionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  align-items: center;
`

const Discount = styled.div`
  font-family: FuturaDemiC;
  font-size: 23px;
  line-height: 27px;
  color: #f0640c;
`

const PromotionArrow = styled.img.attrs({ src: assets.img.promotionArrow })`
  margin-left: auto;
`

const PromotionFile = ({
  input,
  previewTitle,
  previewDescription,
  previewDiscount,
}) => (
  <>
    <PromotionFileInput input={input} />
    <PreviewContainer selected={!!input.value}>
      <PreviewImageOpacity />
      {input.value && <PreviewImage src={input.value} />}
      <PreviewDescriptionContainer>
        <PreviewTitle>{previewTitle || 'Название'}</PreviewTitle>
        <PreviewDescription>
          {previewDescription || 'Описание'}
        </PreviewDescription>
        <DescriptionFooter>
          {!!previewDiscount && <Discount>{previewDiscount}%</Discount>}
          <PromotionArrow />
        </DescriptionFooter>
      </PreviewDescriptionContainer>
    </PreviewContainer>
  </>
)

export default PromotionFile
