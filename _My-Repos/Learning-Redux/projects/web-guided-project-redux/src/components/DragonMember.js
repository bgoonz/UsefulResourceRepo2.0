import React from "react";

const DragonMember = (props) => {
  const { member } = props;

  return (
    <h4>
      {member.name}
      {member.dragonStatus && <i className="fas fa-dragon" />}
    </h4>
  );
};

export default DragonMember;
