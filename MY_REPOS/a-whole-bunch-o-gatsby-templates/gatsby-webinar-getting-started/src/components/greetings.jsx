import * as React from "react"
import { navigate } from "gatsby"

const Greetings = () => {
  const [value, setValue] = React.useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <form
      className="mt-6 inline-block px-6 py-4 bg-purple-50 w-full rounded-lg"
      onSubmit={(event) => {
        event.preventDefault()
        navigate(`/greetings/${value}`)
      }}
    >
      <label htmlFor="name" className="mr-4">
        Name:
      </label>
      <input
        value={value}
        onChange={onChange}
        className="py-1 px-4 mr-4 rounded-lg"
        id="name"
        type="text"
        autoComplete="name"
        required
        minLength="2"
      />
      <button type="submit" className="bg-purple-200 py-1 px-4 rounded-lg">
        Greet yourself!
      </button>
    </form>
  )
}

export default Greetings
