import React from "react";

const Select = ({ name, options, value, onChange }) => (
  <div>
    <div>
      <span>{name}:</span>
    </div>

    <select value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
