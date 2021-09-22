import React, { useState } from "react"
import { navigate } from "gatsby"

import UseLoader from "../components/UseLoader"

const SearchBox = (props) => {
  const [loader, showLoader, hideLoader] = UseLoader()
  const [inputValue, setInputValue] = useState("")

  const isLoading = () => {
    showLoader()
    setTimeout(() => hideLoader(), 1000)
  }

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    isLoading()
    e.preventDefault()
    let searchTerm = inputValue.toLowerCase()
    setTimeout(() => {
      navigate("/", {
        state: { searchTerm },
      })
    }, 100)
  }

  return (
    <div className="search-box text-center form-group mt-2">
      {loader}
      <label className="d-inline text-warning" htmlFor="nameSearch">
        Search Names
      </label>
      <input
        className="d-inline ml-3 rounded align-middle"
        type="text"
        value={inputValue}
        placeholder="Enter search term"
        onChange={handleChange}
      />
      <input
        className="btn btn-outline-warning btn-sm ml-3 mt-1"
        type="submit"
        onClick={handleSubmit}
      />
    </div>
  )
}

export default SearchBox
