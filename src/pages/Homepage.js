import { connect } from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Question from "../components/Question";

function Homepage(props) {
  const { unAnsweredPolls, answeredPolls } = props;

  return (
    <div>
      <Tabs
        defaultActiveKey="unAnsweredPolls"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="unAnsweredPolls" title="Unanswered Questions">
          {unAnsweredPolls.map((question) => (
            <div key={question.id} className="d-flex justify-content-center mb-4">
              <Question question={question} answeredQuestion={false} />
            </div>
          ))}
        </Tab>
        <Tab eventKey="answeredPolls" title="Answered Questions">
          {answeredPolls.map((question) => (
            <div key={question.id} className="d-flex justify-content-center mb-4">
              <Question question={question} answeredQuestion={true} />
            </div>
          ))}
        </Tab>
      </Tabs>
    </div>
  );
}

function mapStateToProps({ authedUser, questions, users }) {
  const answeredIds = Object.keys(users[authedUser].answers);

  const unAnsweredPolls = Object.values(questions)
    .filter((question) => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const answeredPolls = Object.values(questions)
    .filter((question) => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  return {
    authedUser,
    questions,
    answeredPolls,
    unAnsweredPolls,
  };
}
export default connect(mapStateToProps)(Homepage);
