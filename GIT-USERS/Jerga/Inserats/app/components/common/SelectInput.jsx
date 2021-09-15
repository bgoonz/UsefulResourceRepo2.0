import React from "react";

const SelectInput = (error, ref, placeholder) => {
  return (
    <div>
      <input type="text" ref={ref} placeholder={placeholder} />
    </div>
  );
};

export default SelectInput;
