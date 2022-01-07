import { connect } from "react-redux";
import User from "./User";
const ListOfUsers = (props) => {
  const { usersIds } = props;

  return (
    <div className="row">
      {usersIds.map((id) => (
        <div className="col" key={id}>
          <User id={id} />
        </div>
      ))}
    </div>
  );
};

function mapStateToProps({ users }) {
  return {
    usersIds: Object.keys(users),
  };
}
export default connect(mapStateToProps)(ListOfUsers);
