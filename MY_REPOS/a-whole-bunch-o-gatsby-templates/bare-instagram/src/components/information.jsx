import * as React from 'react'

const Loading = () => (
  <div className="text-center font-medium">Loading information...</div>
)

const ErrorMessage = ({ message }) => (
  <div className="px-4 py-2 mt-2 bg-red-100 text-gray-900 rounded">
    <span className="font-medium text-red-900">Error:</span> {message}
  </div>
)

export { Loading, ErrorMessage }
