import React from 'react'
import styled from 'styled-components'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { PageBlock, Loader, CategoriesEmptyList } from '../common'
import {
  getIsLoading,
  getDriverList,
  selectDriver,
  getSelectedDriver,
  startCreatingDriver,
} from '../../modules/drivers'
import assets from '../../assets'

const PlusIcon = styled.img``

const HeaderWrap = styled.div`
  display: flex;
  margin-bottom: 4px;
`

const Header = styled.div`
  outline: none;

  padding: 11px 0 9px 20px;
  background: #ffffff;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
  border-radius: 8px 0px 0px 8px;

  flex: 1;
  font-family: FuturaMediumC;
  font-size: 14px;

  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.4);
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

const StyledLoader = styled(Loader)`
  margin: auto;
  align-self: center;
`

const DriverButton = styled.button`
  padding: 12px 20px 12px 20px;
  background: ${({ isSelected }) =>
    isSelected
      ? 'linear-gradient(171.1deg, #F49355 0%, #F0640C 100%);'
      : '#fff'};

  outline: none;
  border: none;
  text-align: left;
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 4px;
`
const Name = styled.span`
  font-family: FuturaBookC;
  font-size: 20px;
  line-height: 23px;

  color: ${({ isSelected }) => (isSelected ? '#fff' : '#000')};

  opacity: ${({ isSelected }) => (isSelected ? '0.8' : '0.6')};
`

const DriverListDump = ({
  isLoading,
  drivers,
  selectDriver,
  selectedDriver,
  startCreatingDriver,
}) => {
  return (
    <PageBlock>
      <HeaderWrap>
        <Header>Водители</Header>
        <AddButton onClick={startCreatingDriver}>
          <PlusIcon src={assets.img.plus} />
        </AddButton>
      </HeaderWrap>
      {isLoading && <StyledLoader />}
      {!isLoading &&
        drivers.map(({ id, name, login }) => (
          <DriverButton
            isSelected={id === selectedDriver}
            key={id}
            onClick={() => selectDriver(id)}
          >
            <Name isSelected={id === selectedDriver}>{name || login}</Name>
          </DriverButton>
        ))}
      {!isLoading && !drivers.length && (
        <CategoriesEmptyList title={`Водители отсутствуют`} />
      )}
    </PageBlock>
  )
}

const DriverList = connect(
  R.applySpec({
    isLoading: getIsLoading,
    drivers: getDriverList,
    selectedDriver: getSelectedDriver,
  }),
  { selectDriver, startCreatingDriver },
)(DriverListDump)

export default DriverList
