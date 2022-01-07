import { connect } from "react-redux";


function NoResult() {
  return <h1>404</h1>;
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NoResult);
