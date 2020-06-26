import React, { useMemo } from 'react'
import styled from 'styled-components'
import assets from '../../assets'

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 50%;
  outline: none;
  border: none;
  cursor: pointer;
  background: #ffffff;
  border-radius: ${({ type, isAccepted }) =>
    isAccepted === null
      ? type === 'accept'
        ? '8px 0px 0px 8px'
        : '0px 8px 8px 0px'
      : type === 'accept'
      ? '0'
      : '0px 8px 8px 0px'};
  margin-right: ${({ type }) => (type === 'accept' ? '2' : '0')}px;
  padding: ${({ isAccepted, type }) =>
    isAccepted === null
      ? '17px 13px 13px 14px'
      : isAccepted === true
      ? type === 'accept'
        ? '6px 10px'
        : '17px 13px 13px 14px'
      : type === 'accept'
      ? '17px 13px 13px 14px'
      : '11px 13px 7px 13px'};
`

const Caption = styled.span`
  font-family: FuturaBookC;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: ${({ isAccepted, type }) =>
    isAccepted === null
      ? type === 'accept'
        ? '#0BD781'
        : '#F55555'
      : isAccepted === true
      ? type === 'accept'
        ? '#000'
        : '#F55555'
      : type === 'accept'
      ? '#0BD781'
      : '#000'};

  opacity: ${({ isAccepted, type }) =>
    isAccepted === null
      ? '1'
      : isAccepted === true
      ? type === 'accept'
        ? '0.4'
        : '0.7'
      : type === 'accept'
      ? '0.7'
      : '0.4'};
`

const Icon = styled.img`
  height: ${({ type }) => (type === 'accept' ? '16.7' : '12')}px;
  width: ${({ type }) => (type === 'accept' ? '16.7' : '12')}px;
  display: block;
`

const ConfirmButtonButton = ({ onClick = () => {}, isAccepted, type }) => {
  const caption = useMemo(() => {
    if (isAccepted === null) {
      return type === 'accept' ? 'Одобрить' : 'Отклонить'
    } else if (isAccepted === true) {
      return type === 'accept' ? 'Одобрено' : 'Отклонить'
    } else if (isAccepted === false) {
      return type === 'accept' ? 'Одобрить' : 'Отклонено'
    }
    return ''
  }, [isAccepted, type])

  const isIconShown = useMemo(
    () =>
      (isAccepted === true && type === 'accept') ||
      (isAccepted === false && type === 'reject'),
    [isAccepted, type],
  )

  const src = useMemo(() => {
    if (isAccepted === true) {
      return type === 'accept' ? assets.img.greenTick : ''
    } else if (isAccepted === false) {
      return type === 'accept' ? assets.img.greenTick : assets.img.redCross
    }
  })

  return (
    <Button type={type} isAccepted={isAccepted} onClick={onClick}>
      {isIconShown && <Icon type={type} src={src} />}
      <Caption type={type} isAccepted={isAccepted}>
        {caption}
      </Caption>
    </Button>
  )
}

export default ConfirmButtonButton
