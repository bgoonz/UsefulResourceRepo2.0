import React, { useState } from "react"
import Loader from "react-loader-spinner"

const UseLoader = (props) => {
  const [visible, setVisible] = useState(false)

  const showLoader = () => setVisible(true)
  const hideLoader = () => setVisible(false)
  const loader = visible ? (
    <div className="spinner">
      <Loader type="Puff" color="#00BFFF" height="100" width="100" />
      <p className="text-info ml-4">Loading. Please wait...</p>
    </div>
  ) : null

  return [loader, showLoader, hideLoader]
}

export default UseLoader
