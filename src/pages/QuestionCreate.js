import { Component } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import * as Yup from "yup";
import { connect } from "react-redux";

import { handleQuestion } from "../actions/shared";

const CustomError = (props) => {
  return <div className="text-danger">{props.children}</div>;
};

const CustomInput = ({ field, form, ...props }) => {
  return (
    <div className="form-group mb-1">
      <label>{props.label}</label>
      <input {...field} {...props} type="text" className="form-control" />
    </div>
  );
};

class QuestionCreate extends Component {
  constructor() {
    super();
    this.state = {
      successfulSubmission: false,
    };
  }

  questionSchema = Yup.object().shape({
    optionOne: Yup.string().required("required"),
    optionTwo: Yup.string().required("required"),
  });

  submit = (values, actions) => {
    const { dispatch, authedUser } = this.props;
    const { optionOne, optionTwo } = values;

    new Promise((res, rej) => {
      dispatch(handleQuestion(optionOne, optionTwo, authedUser));
      setTimeout(() => res("success"), 1000);
    }).then(() => {
      this.setState({ successfulSubmission: true });
    });

    actions.setSubmitting(false);
  };

  render() {
    const title = "Create New question";
    const subTitle = "Complete the question:";
    const ctaLabel = "Submit";


    const { successfulSubmission } = this.state;
    if (successfulSubmission === true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        
        <Card>
          <Card.Header className="text-center">{title}</Card.Header>
          <Card.Body>
            <Card.Title>{subTitle}</Card.Title>
            <Card.Text>
              Would you rather...
            </Card.Text>
            <Formik
            onSubmit={this.submit}
            initialValues={{ optionOne: "", optionTwo: "" }}
            validationSchema={this.questionSchema}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form
                onSubmit={handleSubmit}
                className=""
              >
                <Field
                  name="optionOne"
                  placeholder="Enter Option One Text Here"
                  component={CustomInput}
                />
                <ErrorMessage name="optionOne" component={CustomError} />
                <br />
                <p>Or</p>
                <Field
                  name="optionTwo"
                  placeholder="Enter Option Two Text Here"
                  component={CustomInput}
                />
                <ErrorMessage name="optionOne" component={CustomError} />
                <div className="mt-5">
                  <button
                    type="submit"
                    className="btn btn-small btn-dark "
                    disabled={successfulSubmission}
                  >
                    {ctaLabel}
                  </button>
                </div>
              </form>
            )}
          </Formik>
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
export default connect(mapStateToProps)(QuestionCreate);
