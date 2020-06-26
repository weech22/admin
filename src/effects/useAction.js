import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

const useAction = actionCreator => {
  const dispatch = useDispatch()
  const dispatchableActionCreator = useCallback(
    data => {
      dispatch(actionCreator(data))
    },
    [actionCreator, dispatch],
  )

  return dispatchableActionCreator
}

export default useAction
