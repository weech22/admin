import React from 'react'
import styled from 'styled-components'
import assets from '../../assets'
import { saveAs } from 'file-saver'

const Button = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0;
`

const Icon = styled.img.attrs({ src: assets.img.document })`
  width: 13.5px;
  height: 18px;
  display: block;
`
const DocumentButton = ({ fileLink }) => (
  <Button
    onClick={() => {
      saveAs(fileLink)
    }}
  >
    <Icon />
  </Button>
)

export default DocumentButton
