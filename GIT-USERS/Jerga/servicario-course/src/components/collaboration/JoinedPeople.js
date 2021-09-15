import React from "react";

const JoinedPeople = ({ users }) => {
  const statusClass = (status) => {
    return status === "online" ? "is-success" : "is-danger";
  };

  const renderUsers = (users) => {
    if (users.length > 0) {
      return users.map((user) => (
        <div key={user.id} className="viewWrapItem">
          <img className="viewAvatarItem" src={user.avatar} alt="icon avatar" />
          <div className="viewWrapContentItem">
            <span className="textItem">{user.fullName}</span>
            <span className={`tag textItem ${statusClass(user.state)}`}>
              {user.state}
            </span>
          </div>
        </div>
      ));
    } else {
      return null;
    }
  };

  return renderUsers(users);
};

export default JoinedPeople;
