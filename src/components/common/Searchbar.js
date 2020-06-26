import React from 'react'
import styled from 'styled-components'
import assets from '../../assets'

const PlusIcon = styled.img``

const Wrap = styled.div`
  display: flex;
  margin-bottom: 4px;
`

const Input = styled.input`
  outline: none;
  border: none;
  padding: 11px 0 9px 20px;
  background: #ffffff;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
  border-radius: 8px 0px 0px 8px;
  background-image: ${({ disableSearchIcon }) =>
    disableSearchIcon ? 'none' : `url(${assets.img.search})`};
  background-position: 97.5% center;
  background-repeat: no-repeat;

  flex: 1;
  font-family: FuturaMediumC;
  font-size: 14px;

  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.4);
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
`

const AddButton = styled.button`
  cursor: pointer;
  appearance: none;
  outline: none;
  border: none;
  border-radius: 0px 8px 8px 0px;
  padding: 0 9px;
  margin-left: 2px;
  background: ${({ isCreatingProduct }) =>
    isCreatingProduct
      ? 'linear-gradient(135deg, #F49355 0%, #F0640C 100%)'
      : '#fff'};
`

const Searchbar = ({
  caption,
  value = '',
  onChange,
  onClick,
  disabled,
  isCreatingProduct,
  disableSearchIcon = false,
  ...rest
}) => {
  return (
    <Wrap>
      <Input
        disableSearchIcon={disableSearchIcon}
        placeholder={caption}
        value={value}
        onChange={({ target: { value } }) => {
          onChange(value)
        }}
        {...rest}
      />
      <AddButton
        onClick={onClick}
        disabled={disabled}
        isCreatingProduct={isCreatingProduct}
      >
        <PlusIcon
          src={isCreatingProduct ? assets.img.whitePlus : assets.img.plus}
        />
      </AddButton>
    </Wrap>
  )
}
export default Searchbar
