import React, { useCallback } from 'react'
import styled from 'styled-components'
import assets from '../../assets'

const Container = styled.div`
  position: relative;

  margin-top: 10px;
  margin-right: 10px;

  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
`

const Picture = styled.img`
  display: block;

  width: 78px;
  height: 58px;
`
const DeleteIcon = styled.img.attrs({ src: assets.img.cross })``

const DeleteButton = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 16px;
  height: 16px;

  border: none;
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(2, 9, 75, 0.24);
  border-radius: 8px;

  cursor: pointer;
  outline: none;
`

const Photo = React.memo(({ src, onDeleteClick, image }) => {
  const onClick = useCallback(() => {
    onDeleteClick(image)
  }, [onDeleteClick, src])

  return (
    <Container>
      <Picture src={src} />
      <DeleteButton onClick={onClick}>
        <DeleteIcon />
      </DeleteButton>
    </Container>
  )
})

export default Photo
