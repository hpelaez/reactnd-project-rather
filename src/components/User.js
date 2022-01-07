import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const User = (props) => {
  const { user } = props;
  const { id, name, avatarURL } = user;
  const text = "Choose Me!";
  function handleClick(id) {
    const { dispatch } = props;
    dispatch(setAuthedUser(id));
  }
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={avatarURL} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>

        <Button variant="dark" type="submit" onClick={() => handleClick(id)}>
          {text}
        </Button>
      </Card.Body>
    </Card>
  );
};

function mapStateToProps({ users }, { id }) {
  const user = users[id];
  return {
    user,
  };
}
export default connect(mapStateToProps)(User);
