import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Col } from "react-bootstrap";

const FormComponent = () => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    comment: "",
  });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const savedTableData = localStorage.getItem("tableData");
    if (savedTableData) {
      setTableData(JSON.parse(savedTableData));
    }
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClearClick = () => {
    setFormState({
      name: "",
      description: "",
      comment: "",
    });
  };

  const handleAddClick = () => {
    if (formState.name.trim() === "" || formState.description.trim() === "") {
      return;
    }

    const newTableData = {
      name: formState.name,
      description: formState.description,
      comment: formState.comment,
    };

    setTableData((prevState) => [...prevState, newTableData]);

    localStorage.setItem(
      "tableData",
      JSON.stringify([...tableData, newTableData])
    );

    setFormState({
      name: "",
      description: "",
      comment: "",
    });
  };

  const handleDeleteClick = (index) => {
    const newTableData = tableData.filter((_, i) => i !== index);

    setTableData(newTableData);

    localStorage.setItem("tableData", JSON.stringify(newTableData));
  };

  const handleDetailsClick = (index) => {
    const newTableData = [...tableData];

    newTableData[index] = {
      ...newTableData[index],
      showComment: !newTableData[index].showComment,
    };
    setTableData(newTableData);
  };

  return (
    <Container className="form-container">
      <h1>Input Form</h1>
      <Form>
        <Form.Group as={Col} controlId="formName">
          <Form.Label className="form-title">Name</Form.Label>
          <Form.Control
            className="form-input name-input"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formState.name}
            maxLength={40}
            onChange={handleFormChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formDescription">
          <Form.Label className="form-title">Description</Form.Label>
          <Form.Control
            className="form-input"
            as="textarea"
            rows={3}
            name="description"
            placeholder="Enter a description"
            value={formState.description}
            maxLength={800}
            onChange={handleFormChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formComment">
          <Form.Label className="form-title">Comment</Form.Label>
          <Form.Control
            className="form-input"
            as="textarea"
            rows={3}
            name="comment"
            placeholder="Enter a comment"
            value={formState.comment}
            maxLength={2000}
            onChange={handleFormChange}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <div className="d-flex justify-content-end">
            <Button
              variant="success"
              type="submit"
              onClick={handleAddClick}
              className="form-button"
            >
              Add
            </Button>
            <Button
              variant="warning"
              type="button"
              onClick={handleClearClick}
              className="form-button"
            >
              Clear
            </Button>
          </div>
        </Form.Group>
      </Form>

      <br />

      {tableData.map((data, index) => (
        <Card key={index} className="mb-2 card-container">
          <Card.Header>
            <div className="row">
              <div className="col-md-3">
                <h5>
                  <strong>Name</strong>
                </h5>
              </div>
              <div className="col-md-9">
                <h5>
                  <strong>Description</strong>
                </h5>
              </div>
            </div>
          </Card.Header>
          <Card.Body className="flex-column">
            <div className="row">
              <div className="col-md-3">
                <p>{data.name}</p>
              </div>
              <div className="col-md-9">
                <p>{data.description}</p>
              </div>
            </div>
            {data.showComment && (
              <React.Fragment>
                <hr />
                <h5 className="comment-title">
                  <strong>Comment: </strong>
                </h5>
                <p>{data.comment}</p>
              </React.Fragment>
            )}
          </Card.Body>
          <Card.Footer className="d-flex justify-content-end">
            <Button
              variant="primary"
              onClick={() => handleDetailsClick(index)}
              className="form-button"
            >
              {data.showComment ? "Hide" : "Details"}
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteClick(index)}
              className="form-button"
            >
              Delete
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </Container>
  );
};
export default FormComponent;
