import React from 'react'
import styled from 'styled-components'
import { ifExpression } from '../../utils/functions'
import { getSelectedPromotion } from '../../modules/promotions'
import { useSelector } from 'react-redux'
import assets from '../../assets'

const ifOpen = (onTrue, onFalse) => ifExpression(onTrue, onFalse, 'isOpen')
const ifSearchOpen = (onTrue, onFalse) =>
  ifExpression(onTrue, onFalse, 'isSearchOpen')
const ifEnable = (onTrue, onFalse) => ifExpression(onTrue, onFalse, 'isEnable')
const ifBottom = (onTrue, onFalse) => ifExpression(onTrue, onFalse, 'bottom')
const ifTop = (onTrue, onFalse) => ifExpression(onTrue, onFalse, 'top')
const ifError = (onTrue, onFalse) => ifExpression(onTrue, onFalse, 'error')

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${ifOpen(74, 36)}px;
`

const DescriptionContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background: #fff;
  padding: 0 14px 0 20px;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
  border-radius: 8px ${ifEnable(0, 8)}px ${ifEnable(0, 8)}px 8px;
  flex: 1;
  margin-bottom: 4px;
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Button = styled.div`
  display: flex;
  cursor: pointer;
  width: 36px;
  height: 36px;
  background: ${ifSearchOpen(
    'linear-gradient(92.15deg, #F6A26D -38.69%, #F87C2E 107.08%);',
    'linear-gradient(0deg, #ffffff, #ffffff),linear-gradient(92.15deg, #f6a26d -38.69%, #f87c2e 107.08%)',
  )};
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);

  border-radius: 0px ${ifOpen(ifTop(8, 0), 8)}px ${ifOpen(ifBottom(8, 0), 8)}px
    0px;
  margin-left: 2px;

  margin-top: ${ifBottom('auto', 0)};
`

const Title = styled.div`
  margin-top: 11px;

  font-family: FuturaMediumC;
  font-size: 14px;
  text-transform: uppercase;
  color: ${ifOpen('#F0640C', '#000000')};
  opacity: ${ifOpen(1, 0.4)};
`

const Description = styled.div`
  font-family: FuturaBookC;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  margin-top: 6px;
  opacity: 0.4;
`

const ButtonIcon = styled.img`
  margin: auto;
`

const SearchInput = styled.input`
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 0 0 0 8px;
  border: 1px solid ${ifError('#F55555', '#f49355')};
  height: 34px;
  width: 260px;
  padding: 0 15px;
  outline: none;
`

const ProductHeader = ({
  isEnable,
  isSearchOpen,
  setSearchOpen,
  searchValue,
  onChangeSearchValue,
  isOpen,
  error,
  setOpen,
}) => {
  const selectedPromotionId = useSelector(getSelectedPromotion)

  React.useEffect(() => {
    if (!isOpen) {
      setSearchOpen(false)
    }
  }, [isOpen])

  React.useEffect(() => {
    if (!selectedPromotionId) {
      setOpen(false)
    }
  }, [selectedPromotionId])

  const onTopButtonClick = React.useCallback(() => {
    setOpen(!isOpen)
  }, [isOpen])

  const onBottomButtonClick = React.useCallback(() => {
    setSearchOpen(!isSearchOpen)
  }, [isSearchOpen])

  const onChange = React.useCallback(({ target: { value } }) => {
    onChangeSearchValue(value)
  }, [])

  return (
    <Container isOpen={isOpen}>
      <DescriptionContainer isEnable={isEnable}>
        <Title isOpen={isOpen}>
          {isOpen ? 'Изменение акционного товара' : 'Товар акции'}
        </Title>
        {isOpen && !isSearchOpen && (
          <Description>
            Выберите товар который необходимо добавить к акции
          </Description>
        )}
        {isSearchOpen && (
          <SearchInput
            value={searchValue}
            onChange={onChange}
            error={error}
            autoFocus
          />
        )}
      </DescriptionContainer>
      <ButtonsContainer>
        {isEnable && (
          <Button top isOpen={isOpen} onClick={onTopButtonClick}>
            <ButtonIcon
              src={isOpen ? assets.img.cancel : assets.img.pencilRed}
            />
          </Button>
        )}
        {isOpen && (
          <Button
            isSearchOpen={isSearchOpen}
            onClick={onBottomButtonClick}
            isOpen={isOpen}
            bottom
          >
            <ButtonIcon
              src={isSearchOpen ? assets.img.searchWhite : assets.img.searchRed}
            />
          </Button>
        )}
      </ButtonsContainer>
    </Container>
  )
}

export default ProductHeader
