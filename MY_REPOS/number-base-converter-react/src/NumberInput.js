import React from "react";

const NumberInput = (props) => {
  const { base, pattern, number, onChange } = props;
  return (
    <div class="numberBlock">
      <label>Base {base}</label>
      <input pattern={pattern} id={base} value={number} onChange={onChange} />
    </div>
  );
};

export default NumberInput;
