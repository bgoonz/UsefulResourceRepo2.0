import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { clear } from '../redux/actions/auth'

const useAuthClear = () => {
  const error = useSelector((state) => state.auth.error)
  const dispatch = useDispatch()
  const [isInitial, setIsInitial] = useState(false)

  useEffect(() => {
    !isInitial && error && dispatch(clear())
    setIsInitial(true)
  }, [isInitial, setIsInitial, error, dispatch])
}

export default useAuthClear
