import React from "react";
import { connect } from "react-redux";

import Image from "react-bootstrap/Image";

import { Logout } from ".";

const AuthedUser = (props) => {
  function displayUserName() {
    const { authedUser, users } = props;
    const name = users[authedUser].name;
    if (authedUser in users) {
      return name;
    }
  }

  function displayUserAvatar() {
    const { authedUser, users } = props;
    const avatar = users[authedUser].avatarURL;
    const name = users[authedUser].name;

    if (authedUser in users) {
      return (
        <Image
          src={avatar}
          alt={name}
          roundedCircle
          width="50"
          height="50"
          className="mx-2"
        />
      );
    }
  }

  return (
    <div className="navbar-text">
      {displayUserName()}
      {displayUserAvatar()}
      <Logout />
    </div>
  );
};

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(AuthedUser);
