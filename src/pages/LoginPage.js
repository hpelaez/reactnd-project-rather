import ListOfUsers from "../components/ListOfUsers";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function LoginPage() {
  const title = "Welcome to the Would Rather App!";
  const subTitle = "Select your user";

  return (
    <Container className="align-middle text-center">
      <Row>
        <Col>
          <h1>{title}</h1>
          <p>{subTitle}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListOfUsers />
        </Col>
      </Row>
    </Container>
  );
}
