import { connect } from "react-redux";
import Image from "react-bootstrap/Image";


const Leaderboard = (props) => {
  const { usersIds } = props;

  const questionsAsked = (props) => {
    return (
      <div>
        <div className="lead">
          Created questions{" "}
          <span className="fw-bold">{props}</span>
        </div>
      </div>
    );
  };

  const scoreTotal = (props) => {
    return (
      <div>
        <div className="lead">
          Score:{" "}
          <span className="badge rounded-pill bg-success">
            {props}
            <span className="visually-hidden"> total {props}</span>
          </span>
        </div>
      </div>
    );
  };

  const questionsAnswered = (props) => {
    return (
      <div>
        <div className="lead">
          Answered questions{" "}
            <span className="fw-bold">{props}</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      {usersIds.map((user) => {
        return (
          <div className="card mb-3" key={user.id}>
            <div className="row">
              <div className="col-md-2">
                <Image
                  src={user.avatarURL}
                  alt={user.name}
                  roundedCircle
                  width="80"
                  height="80"
                  className="m-2"
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  {questionsAsked(user.questionCount)}
                  {questionsAnswered(user.answerCount)}
                  <hr />
                  <h5 className="card-title">
                   {scoreTotal(user.questionCount + user.answerCount)}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

function mapStateToProps({ users }) {
  const usersIds = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3);
  return {
    usersIds,
  };
}

export default connect(mapStateToProps)(Leaderboard);
