import React from 'react'
import styled from 'styled-components'
import assets from '../../assets'

const Container = styled.div`
  background: #f4f9fd;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img.attrs({ src: assets.img.noImage })`
  width: 50%;
  height: 50%;
`

const EmptyImage = ({ width, height }) => {
  return (
    <Container width={width} height={height}>
      <Image />
    </Container>
  )
}

export default EmptyImage
