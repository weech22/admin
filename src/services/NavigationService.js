let _history

const setHistory = history => {
  _history = history
}

const navigate = (route, ...rest) => {
  _history.push(route, ...rest)
}

const NavigationService = {
  setHistory,
  navigate,
}

export default NavigationService
