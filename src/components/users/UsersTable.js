import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DocumentButton from './DocumentButton'
import ConfirmButtonsBlock from './ConfirmButtonsBlock'
import assets from '../../assets'
import { Loader } from '../../components'
import {
  getUsersRequest,
  getIsLoading,
  getUsersList,
  clearUsers,
} from '../../modules/users'

const PhoneBlock = styled.div`
  display: flex;
  justify-content: center;
`

const PhoneIcon = styled.img.attrs({ src: assets.img.phone })`
  width: 17.7px;
  height: 17.7px;
  cursor: pointer;
`

const PhoneNumber = styled.a`
  text-decoration: none;
  font-amily: FuturaMediumC;
  font-size: 14px;
  line-height: 16px;
  margin-right: 8px;
  margin-top: 4px;
  color: #f0640c;
`

const SortingArrow = styled.img.attrs({ src: assets.img.sortingArrow })`
  width: 11px;
  height: 6.3px;
  margin-left: 6px;
  cursor: pointer;
  transform: rotate(
    ${({ sortingDirection }) => (sortingDirection === 'asc' ? 180 : 0)}deg
  );
`

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    background: 'transparent',
  },
  table: {
    minWidth: 980,
    borderSpacing: '2px',
    borderCollapse: 'separate',
  },

  leftCell: {
    borderRadius: '8px 0px 0px 8px',
  },
  rightCell: {
    borderRadius: '0px 8px 8px 0px',
  },
  headerCell: {
    background: '#fff',
    padding: '11px 10px 9px 10px',
    fontFamily: 'FuturaMediumC',
    fontSize: '14px',
    lineHeight: '16px',
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.4)',
    textAlign: 'center',
  },
  regularCell: {
    background: '#fff',
    padding: '16px 10px 14px 10px',
    fontFamily: 'FuturaBookC',
    fontSize: '14px',
    lineHeight: '16px',
    color: 'rgba(0,0,0,0.8)',
    textAlign: 'center',
  },
  documentCell: {
    background: '#fff',
    padding: '14px 10px 7px 10px',
    textAlign: 'center',
  },
  phoneCell: {
    padding: '10px 0',
  },
  confirmCell: {
    padding: '0 !important',
  },
}))

const StyledLoader = styled(Loader)`
  margin: auto;
  align-self: center;
`

const UsersTableDump = ({
  getUsers,
  users,
  isLoading,
  setCurrentPage,
  clearUsers,
}) => {
  const classes = useStyles()
  const [sortingDirection, setSortingDirection] = useState('desc')

  const sortByDate = useCallback(() => {
    setCurrentPage(0)
    clearUsers()
    if (sortingDirection === 'desc') {
      setSortingDirection('asc')
      getUsers({ direction: 'asc', page: 0 })
    } else {
      setSortingDirection('desc')
      getUsers({ direction: 'desc', page: 0 })
    }
  }, [setCurrentPage, sortingDirection, getUsers])

  return isLoading && !users.length ? (
    <StyledLoader />
  ) : (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={`${classes.headerCell} ${classes.leftCell}`}>
            ФИО
          </TableCell>
          <TableCell className={classes.headerCell}>Организация</TableCell>
          <TableCell className={classes.headerCell}>
            <span>Дата</span>
            <SortingArrow
              sortingDirection={sortingDirection}
              onClick={sortByDate}
            />
          </TableCell>
          <TableCell className={classes.headerCell}>Номер телефона</TableCell>
          <TableCell className={classes.headerCell}>Документ</TableCell>
          <TableCell className={`${classes.headerCell} ${classes.rightCell}`}>
            Действия
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell
              className={`${classes.regularCell} ${classes.leftCell}`}
              component="th"
              scope="row"
            >
              {user.lastName} {user.firstName} {user.patronymic}
            </TableCell>
            <TableCell className={classes.regularCell}>
              {user.organization}
            </TableCell>

            <TableCell className={classes.regularCell}>
              {moment(user.registrationTime).format('DD.MM.YYYY')}
            </TableCell>
            <TableCell
              className={`${classes.regularCell} ${classes.phoneCell}`}
            >
              <PhoneBlock>
                <PhoneNumber href={`tel:+${user.phone}`}>
                  {user.phone}
                </PhoneNumber>
                <a href={`tel:+${user.phone}`}>
                  <PhoneIcon />
                </a>
              </PhoneBlock>
            </TableCell>
            <TableCell className={classes.documentCell}>
              <DocumentButton
                documentLink={user.filedocument}
                fileLink={user.filedocument}
              />
            </TableCell>
            <TableCell className={`${classes.confirmCell}`}>
              <ConfirmButtonsBlock status={user.status} userId={user.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const UsersTable = connect(
  R.applySpec({
    isLoading: getIsLoading,
    userList: getUsersList,
  }),
  { getUsers: getUsersRequest, clearUsers },
)(UsersTableDump)

export default UsersTable
