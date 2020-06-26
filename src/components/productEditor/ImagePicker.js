import React, { useRef, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import assets from '../../assets'
import Photo from './Photo'

const PhotosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -20px;
`

const Container = styled.div`
  margin-top: 10px;
`

const AddButton = styled.button`
  display: block;
  outline: none;
  cursor: pointer;
  margin-top: 10px;
  background: #ffffff;
  border: 1px solid #f0640c;
  box-sizing: border-box;
  border-radius: 8px;
  width: 80px;
  height: 60px;
`

const AddIcon = styled.img.attrs({ src: assets.img.plus })``

const ImagePicker = ({
  input: { onChange, value = [], ...input },
  onPhotoDelete,
  ...props
}) => {
  const imagePicker = useRef(null)

  const onClick = React.useCallback(() => {
    imagePicker.current.click()
  }, [imagePicker])

  const onDeleteClick = useCallback(
    imageToDelete => {
      imageToDelete.id && onPhotoDelete(imageToDelete.id)
      onChange(
        value.filter(image =>
          image.id ? imageToDelete.id !== image.id : image !== imageToDelete,
        ),
      )
    },
    [onChange, onPhotoDelete, value],
  )

  return (
    <Container>
      <input
        type="file"
        ref={imagePicker}
        accept="image/jpeg,image/png"
        style={{ display: 'none' }}
        onChange={({ target: { files } }) => {
          const filesArray = [...files]

          filesArray.forEach(file => {
            file.uri = 'blob:' + URL.createObjectURL(file).slice(5)
          })

          onChange([...value, ...filesArray])
          imagePicker.current.value = ''
        }}
        {...input}
        {...props}
        multiple
      />

      <PhotosContainer>
        {value &&
          value.map(image => (
            <Photo
              key={image && image.uri}
              src={image && image.uri}
              onDeleteClick={onDeleteClick}
              image={image}
            />
          ))}
        <AddButton onClick={onClick}>
          <AddIcon />
        </AddButton>
      </PhotosContainer>
    </Container>
  )
}
export default ImagePicker
