import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

const Question = (props) => {
  const { question, users, answeredQuestion } = props;
  const { author, optionOne } = question;
  const avatar = users[author].avatarURL;
  const name = users[author].name;
  const title = "Would you rather ";
  const seePollTitle = "View Poll";

  return (
    <Card style={{ width: '40rem' }}>
      <Card.Header>{name} asks:</Card.Header>
      <Card.Body className="d-flex align-center align-items-center">
        <Image
          src={avatar}
          alt={name}
          roundedCircle
          width="80"
          height="80"
        />

      
        <div className="ms-2 ps-2 border-start">
          <p className="display-8 mb-2 fw-bold">{title}</p>
          <p className="mb-4">
            ...{optionOne.text}...
          </p>
          {!answeredQuestion && (
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link
                className="btn btn-success btn-outline btn-sm gap-3"
                to={{
                  pathname: `/questions/${question.id}`,
                }}
              >
                {seePollTitle}
              </Link>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

function mapStateToProps(users) {
  return users;
}
export default connect(mapStateToProps)(Question);
