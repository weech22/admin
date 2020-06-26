const taskService = (task, requestTime = 5) => {
  let lastTimeout

  return (...params) => {
    if (lastTimeout) {
      clearTimeout(lastTimeout)

      lastTimeout = setTimeout(() => {
        task(...params)
        lastTimeout = 0
      }, requestTime)

      return
    } else {
      lastTimeout = setTimeout(() => {
        task(...params)
      }, requestTime)
    }
  }
}

export default taskService
