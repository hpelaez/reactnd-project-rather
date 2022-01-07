import { connect } from "react-redux";

import { setAuthedUser } from "../actions/authedUser";
import { Link } from "react-router-dom";

const Logout = (props) => {
  function handleClick(id) {
    const { dispatch } = props;
    dispatch(setAuthedUser(null));
  }

  const ctaLabel = "Logout";
  return (
    <Link to="/" onClick={handleClick} className="text-warning">
      {ctaLabel}
    </Link>
  );
};

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Logout);
