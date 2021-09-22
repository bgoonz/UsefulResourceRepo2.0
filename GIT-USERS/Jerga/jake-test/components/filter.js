import React, { useState } from "react";
import Select from "react-select";
import { CATEGORY_LIST } from "../actions";

const Filter = (props) => {
  const [category, setCategory] = useState("");
  const [hideLabel, setLabel] = useState(false);
  // const classes = useStyles();

  const handleChange = (event) => {
    props.changeCategory(event.target.value);
    setCategory(event.target.value);
    setLabel(true);
  };

  const onChange = (value) => {
    console.log(value);
    props.changeCategory(value.label);
  };

  return (
    <>
      <Select
        className="react-select-container"
        maxMenuHeight={550}
        classNamePrefix="react-select"
        onChange={onChange}
        options={CATEGORY_LIST}
        placeholder="Discover amazing experiences"
        isSearchable={false}
      />

      <style jsx>{`
        .react-select-container {
          display: none !important;
        }

        .react-select__control {
          width: 350px !important;
        }
      `}</style>
    </>
  );
};

export default Filter;
