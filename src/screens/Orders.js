import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { handleActions, createAction } from 'redux-actions'
import * as R from 'ramda'
import { useSaga } from '../effects'
import { ENDPOINTS } from '../API'
import { call, select } from 'redux-saga/effects'
import { getToken } from '../modules/auth'
import { handleStatuses } from '../utils'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}))

const getOrdersRequest = createAction('GET_ORDERS_REQUEST')
const getOrdersSuccess = createAction('GET_ORDERS_SUCCESS')
const getOrdersFailure = createAction('GET_ORDERS_FAILURE')

const ordersReducer = handleActions(
  {
    [getOrdersRequest]: () => ({ data: [], isLoading: true }),
    [getOrdersSuccess]: (state, { payload }) => ({
      data: payload,
      isLoading: false,
    }),
    [getOrdersFailure]: () => ({
      data: [],
      isLoading: false,
    }),
  },
  {
    isLoading: false,
    data: [],
  },
)

const getOrdersManager = ({ token }) =>
  fetch(ENDPOINTS.ORDERS(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleStatuses())
    .then(res => res.json())
    .then(R.map(R.evolve({ address: JSON.parse, date: JSON.parse })))

const Orders = () => {
  const classes = useStyles()

  const [state, dispatch] = React.useReducer(ordersReducer, {
    isLoading: false,
    data: [],
  })

  useSaga(function*() {
    try {
      yield call(() => dispatch(getOrdersRequest()))
      const token = yield select(getToken)
      const orders = yield call(getOrdersManager, { token })
      yield call(() => dispatch(getOrdersSuccess(orders)))
    } catch (ex) {
      yield call(() => dispatch(getOrdersFailure()))
    }
  }, [])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Товар</TableCell>
              <TableCell align="right">Адрес доставки</TableCell>
              <TableCell align="right">Дата</TableCell>
              <TableCell align="right">Количество</TableCell>
              <TableCell align="right">Комментарий</TableCell>
              <TableCell align="right">Телефон</TableCell>
              <TableCell align="right">Организация</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.data.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {(!!row.product && row.product.title) || '-'}
                </TableCell>
                <TableCell align="right">
                  {(!!row.address && row.address.address) || '-'}
                </TableCell>
                <TableCell align="right">
                  {(!!row.date && row.date.text) || '-'}
                </TableCell>
                <TableCell align="right">{row.count || '-'}</TableCell>
                <TableCell align="right">{row.comment || '-'}</TableCell>
                <TableCell align="right">
                  {(!!row.user && row.user.phone) || '-'}
                </TableCell>
                <TableCell align="right">
                  {(!!row.user && row.user.organization) || '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

export default Orders
