import { useEffect } from 'react'
import { sagaMiddleware } from '../configureStore'

const useSaga = (saga, deps = [], cancelOnUnmount = true) => {
  useEffect(() => {
    const worker = sagaMiddleware.run(saga)
    return () => {
      cancelOnUnmount && worker.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useSaga
