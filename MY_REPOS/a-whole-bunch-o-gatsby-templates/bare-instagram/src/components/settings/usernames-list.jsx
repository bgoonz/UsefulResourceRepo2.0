import * as React from 'react'
import { useIsFetching } from 'react-query'
import Delete from '../../icons/delete'
import useNames from '../../hooks/use-names'

const UsernamesList = () => {
  const isFetchingUsernames = useIsFetching()
  const [names, setNames] = useNames()

  const deleteName = (index) => {
    const newNames = [...names]
    newNames.splice(index, 1)
    setNames(newNames)
  }

  return (
    <div className="flex flex-col space-y-3 mt-4">
      {names.length > 0 ? (
        names.map((n, index) => (
          <div
            key={`names-list-${n.id}-${index}`}
            className="flex flex-row justify-between items-center"
          >
            <div className="flex flex-row flex-nowrap">
              {n.picture && (
                <img
                  className="rounded-full w-6 h-6 mr-2"
                  src={n.picture}
                  alt="Username"
                />
              )}{' '}
              {n.username}
            </div>
            <button
              className="text-white px-2 py-2 rounded bg-red-500 dark:bg-red-600"
              onClick={() => deleteName(index)}
              aria-label={`Delete ${n.username}`}
            >
              <Delete />
            </button>
          </div>
        ))
      ) : (
        <div>No usernames defined.</div>
      )}
      {isFetchingUsernames > 0 && (
        <div className="text-center font-medium">Loading information...</div>
      )}
    </div>
  )
}

export default UsernamesList
