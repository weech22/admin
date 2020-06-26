import React from 'react'
import styled from 'styled-components'
import { ifExpression } from '../../utils/functions'
import assets from '../../assets'

const Container = styled.div`
  display: flex;
  margin: 16px 20px 0 20px;
`

const ifSelected = (onTrue, onFalse) =>
  ifExpression(onTrue, onFalse, 'selected')

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const SelectFileButton = styled.div`
  display: flex;
  cursor: pointer;
  background: ${ifSelected(
    '#FFF',
    'linear-gradient(168.63deg, #f49355 0%, #f0640c 100%)',
  )};

  border: ${ifSelected('1px solid #F0640C', 'none')};

  border-radius: 8px;
  width: 200px;
  height: 36px;
  opacity: 0.7;
`

const ButtonText = styled.div`
  font-family: FuturaBookC;
  font-size: 17px;
  letter-spacing: 0.02em;
  color: ${ifSelected('#000', '#fff')};
  margin: auto;
`

const Image = styled.img`
  width: 61px;
  height: 36px;
  border-radius: 8px;
  object-fit: cover;
`

const EmptyFileContainer = styled.div`
  background: #f4f9fd;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  border-radius: 8px;
  width: 61px;
  height: 36px;
  display: flex;
`

const EmptyImage = styled.img.attrs({ src: assets.img.noImage })`
  margin: auto;
  height: 17.61px;
  width: 24.35px;
`

const PromotionFileInput = ({ input: { onChange, value } }) => {
  const imagePicker = React.useRef(null)

  const onClick = React.useCallback(() => {
    imagePicker.current.click()
  }, [imagePicker])

  return (
    <>
      <input
        type="file"
        ref={imagePicker}
        accept="image/jpeg,image/png"
        style={{ display: 'none' }}
        onChange={({ target: { files } }) => {
          const filesArray = [...files]

          filesArray.forEach(file => {
            file.toString = () => 'blob:' + URL.createObjectURL(file).slice(5)
          })

          onChange(filesArray[0])
          imagePicker.current.value = ''
        }}
      />

      <Container>
        <ButtonContainer>
          <SelectFileButton selected={!!value} onClick={onClick}>
            <ButtonText selected={!!value}>Выбрать фото</ButtonText>
          </SelectFileButton>
          {value ? (
            <Image src={value.toString()} />
          ) : (
            <EmptyFileContainer>
              <EmptyImage />
            </EmptyFileContainer>
          )}
        </ButtonContainer>
      </Container>
    </>
  )
}
export default PromotionFileInput
