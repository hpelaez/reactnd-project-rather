import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { handleInitialData } from "../actions/shared";
import { Header } from "../_partials";
import {
  NoResult,
  Homepage,
  Leaderboard,
  LoginPage,
  QuestionCreate,
  QuestionDetail,
} from "../pages";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { authedUser } = this.props;

    return (
      <Router>
        <div className="App">
          {authedUser === null ? (
            <Route render={() => <LoginPage />} />
          ) : (
            <Fragment>
              <Header />
              <Container>
                <Row>
                  <Col className="mt-3">
                    <Switch>
                      <Route path="/" exact component={Homepage} />
                      <Route path="/leaderboard" component={Leaderboard} />
                      <Route path="/add" component={QuestionCreate} />
                      <Route
                        exact
                        path="/questions/:id"
                        component={QuestionDetail}
                      />
                      <Route path="*">
                        <NoResult />
                      </Route>
                    </Switch>
                  </Col>
                </Row>
              </Container>
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps, { handleInitialData })(App);
