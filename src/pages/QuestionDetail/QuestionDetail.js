import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";
import { NoResult } from "..";
import { handleAnswer } from "../../actions/shared";

class QuestionDetail extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: "",
      setHelperText: "",
      resultPage: false,
    };
  }

  onValueChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
      setHelperText: "",
    });
  };

  formSubmit = (event) => {
    event.preventDefault();
    const { authedUser, id, dispatch } = this.props;

    const { selectedOption } = this.state;

    if (selectedOption === "") {
      this.setState({
        setHelperText: "Please select an option.",
      });
    } else {
      dispatch(handleAnswer(authedUser, id, selectedOption));
      this.setState({
        resultPage: true,
      });
    }
  };

  badge = () => {
    const title = "I vote for";
    return <Badge bg="success">{title}</Badge>;
  };

  displayForm = () => {
    const title = "Would you rather:";
    const submitTitle = "Submit";
    const { id, questions } = this.props;
    const { optionOne, optionTwo } = questions[id];
    const { setHelperText } = this.state;
    return (
      <form
        className="needs-validation"
        noValidate
        onSubmit={this.formSubmit}
      >
        <p className="display-8 mb-2 fw-bold">{title}</p>

        <div className="form-check">
          <input
            type="radio"
            value="optionOne"
            className="form-check-input"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            checked={this.state.selectedOption === "optionOne"}
            onChange={this.onValueChange}
          />

          <label className="form-check-label" htmlFor="flexRadioDefault1">
            {optionOne.text}
          </label>
        </div>
        <div className="form-check my-0">
          <input
            type="radio"
            value="optionTwo"
            className="form-check-input"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked={this.state.selectedOption === "optionTwo"}
            onChange={this.onValueChange}
          />

          <label className="form-check-label" htmlFor="flexRadioDefault2">
            {optionTwo.text}
          </label>
        </div>
        <div className="col-12 mt-2 d-flex justify-content-center">
          <Button variant="dark" type="submit">
            {submitTitle}
          </Button>
        </div>

        {setHelperText ? (
          <div className="text-danger" role="alert">
            {setHelperText}
          </div>
        ) : (
          ""
        )}
      </form>
    );
  };

  nbVotes = (props) => {
    const nbPeople = "Number of people who voted for that option";

    return (
      <p className="">
        <span className="">{nbPeople}</span>
        <span className="mx-2 p-2 bg-success border border-light text-white rounded-circle">
          {props}
        </span>
      </p>
    );
  };

  progress = (props) => {
    return (
      <ProgressBar now={props} label={`${props}%`}/>
    );
  };

  render() {
    const { id, questions, users, authedUser } = this.props;

    if (questions[id] === undefined) {
      return <NoResult />;
    }

    const { optionOne, optionTwo, author } = questions[id];
    const optionOneNbVotes = optionOne.votes.length;
    const optionTwoNbVotes = optionTwo.votes.length;

    const total = optionOneNbVotes + optionTwoNbVotes;
    const optionOnePercentageVotes = Math.round(
      (optionOneNbVotes * 100) / total
    );
    const optionTwoPercentageVotes = Math.round(
      (optionTwoNbVotes * 100) / total
    );

    const { resultPage } = this.state;
    const name = users[author].name;
    const avatar = users[author].avatarURL;

    return (
      <div className="d-flex justify-content-center mb-4">
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
              
              {resultPage ? (
                <div>
                  <p className="display-8 mb-2 fw-bold">Results:</p>
                  <div>
                    {optionOne.votes.includes(authedUser) ? this.badge() : ""}

                    <h5 className="card-title">{optionOne.text} </h5>
                    {this.nbVotes(optionOneNbVotes)}
                    {this.progress(optionOnePercentageVotes)}
                  </div>

                  <hr />
                  <div>
                    <div>
                      {optionTwo.votes.includes(authedUser) ? this.badge() : ""}
                    </div>
                    <h5 className="card-title">{optionTwo.text} </h5>
                    {this.nbVotes(optionTwoNbVotes)}
                    {this.progress(optionTwoPercentageVotes)}
                  </div>
                </div>
                ) : (
                  this.displayForm()
                )}
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;

  return {
    id,
    authedUser,
    questions,
    users,
  };
}
export default connect(mapStateToProps)(QuestionDetail);
