import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Loader } from '../components/common'
import { getDriversRequest, getIsLoading } from '../modules/drivers'
import { DriverList, DriversInfo } from '../components/drivers'

const Wrap = styled.div`
  background: #ecf1f4;
  display: flex;
  flex: 1;
  overflow-y: scroll;
  padding: 0 10px;
`

const StyledLoader = styled(Loader)`
  margin: auto;
  align-self: center;
`

const DriversDump = ({ getDrivers, isLoading }) => {
  React.useEffect(() => {
    getDrivers()
  }, [getDrivers])

  return (
    <Wrap>
      {isLoading ? (
        <StyledLoader />
      ) : (
        <>
          <DriverList />
          <DriversInfo />
        </>
      )}
    </Wrap>
  )
}

const Drivers = connect(
  R.applySpec({
    isLoading: getIsLoading,
  }),
  { getDrivers: getDriversRequest },
)(DriversDump)

export default Drivers
