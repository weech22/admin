import cookie from 'react-cookies'

export const setToken = token =>
  cookie.save('accessToken', token, { path: '/' })

export const getToken = () => cookie.load('accessToken')
