import React from "react";
import { connect } from "react-redux";
import { toggleEditing } from "./../actions/titleActions";

const TitleDisplay = (props) => {
  const handleClick = () => {
    props.toggleEditing();
  };

  return (
    <h2>
      {props.title} <i className="far fa-edit" onClick={handleClick} />
    </h2>
  );
};

const mapStateToProps = (state) => {
  return {
    title: state.title.title,
  };
};

const mapActionsToProps = {
  toggleEditing,
};

export default connect(mapStateToProps, { toggleEditing })(TitleDisplay);
