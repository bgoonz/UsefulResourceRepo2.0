import * as React from 'react'

/**
 * Checkbox component with custom styles without any pseudo-elements
 * The CSS for the tick comes from the global.css for "form-tick"
 */

const Checkbox = ({ name, checked, onChange, desc }) => (
  <label htmlFor={name} className="flex flex-row flex-nowrap justify-between">
    <span>{desc}</span>
    <input
      type="checkbox"
      className="form-tick appearance-none h-6 w-6 bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none cursor-pointer"
      name={name}
      checked={checked}
      onChange={onChange}
    />
  </label>
)

export default Checkbox
