import * as React from 'react'
import { useQueryClient } from 'react-query'
import useNames from '../../hooks/use-names'
import useDesign from '../../hooks/use-design'
import { USE_NAMES_DEFAULT } from '../../constants'

const Debug = () => {
  const queryClient = useQueryClient()
  const [names, setNames] = useNames()
  const [design] = useDesign()

  const resetUsernames = (e) => {
    e.preventDefault()
    setNames(USE_NAMES_DEFAULT)
  }

  const refreshApp = () => {
    window.location.reload()
  }

  const invalidateHome = async (e) => {
    e.preventDefault()
    await queryClient.invalidateQueries('username')
  }

  return (
    <div className="mt-4">
      <div className="flex flex-row space-x-3">
        <button
          className="bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-300 px-3 py-1 rounded-lg"
          onClick={invalidateHome}
        >
          Invalidate Home
        </button>
        <button
          className="bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-300 px-3 py-1 rounded-lg"
          onClick={resetUsernames}
        >
          Reset usernames
        </button>
        <button
          className="bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-300 px-3 py-1 rounded-lg"
          onClick={refreshApp}
        >
          Reload app
        </button>
      </div>
      <div className="mt-4">
        <p>design-options</p>
        <pre className="mt-2 overflow-auto">
          {JSON.stringify(design, null, 2)}
        </pre>
      </div>
      <div className="mt-4">
        <p>names</p>
        <pre className="mt-2 overflow-auto">
          {JSON.stringify(names, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default Debug
