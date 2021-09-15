import * as React from 'react'
import { useQuery } from 'react-query'
import useNames from '../../hooks/use-names'
import { fetchProfile } from '../../utils/fetch-profile'
import Plus from '../../icons/plus'
import { ErrorMessage } from '../information'

const UsernamesForm = () => {
  const [value, setValue] = React.useState('')
  const [names, setNames] = useNames()

  const { status, error, isLoading, refetch } = useQuery(
    ['profile-information', value],
    async () => {
      const data = await fetchProfile(value)
      const { id, picture, username } = data

      setNames([...names, { id, picture, username }])
      setValue('')

      return data
    },
    {
      enabled: false,
      retry: false,
    }
  )

  const addName = async (e) => {
    e.preventDefault()
    if (!value) return
    await refetch()
  }

  return (
    <>
      <form onSubmit={addName} className="flex flex-col mb-4">
        <label
          htmlFor="add-new-username"
          className="mb-2 font-medium text-black text-xl dark:text-white"
        >
          Add user
        </label>
        <div className="flex flex-nowrap flex-row">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="bg-gray-100 dark:bg-gray-600 rounded px-2 py-1 flex-1 text-gray-800 dark:text-gray-100"
            type="text"
            name="add-new-username"
            id="add-new-username"
            required
            disabled={isLoading}
          />
          <button
            disabled={isLoading}
            aria-label="Add username to list"
            type="submit"
            className="px-2 py-2 disabled:opacity-50 bg-blue-500 dark:bg-blue-600 text-white rounded ml-4"
          >
            <Plus />
          </button>
        </div>
      </form>
      {status === 'error' && <ErrorMessage message={error.message} />}
    </>
  )
}

export default UsernamesForm
