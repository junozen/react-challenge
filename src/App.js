import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  return (
    <div className="header">
      <Container>
        <Row>
          <Col>
            <h1 className="text-center mt-3">Hello World</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
