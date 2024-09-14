import { Nav, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import PropTypes from "prop-types";

const NavDescription = ({ description }) => {
  const [activeTab, setActiveTab] = useState("description");
  return (
    <>
      <Nav
        fill
        variant="tabs"
        defaultActiveKey="description"
        className="fm-4 fw-semibold"
      >
        <Nav.Item>
          <Nav.Link
            eventKey="description"
            className="text-dark border-0"
            active={activeTab === "description"}
            onClick={() => setActiveTab("description")}
          >
            Description
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="reviews"
            className="text-dark border-0"
            active={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "description" && (
        <Card
          className={`p-3 border-0 border-top-0 rounded-0 rounded-bottom ${
            activeTab === "description" ? "rounded-end" : ""
          }`}
        >
          <Card.Body>
            <Card.Text className="fm-2">{description}</Card.Text>
          </Card.Body>
        </Card>
      )}
      {activeTab === "reviews" && (
        <Card
          className={`p-3 border-0 border-top-0 rounded-0 rounded-bottom ${
            activeTab === "reviews" ? "rounded-start" : ""
          }`}
        >
          <Card.Body>
            <Card.Text className="fm-2">
              No reviews yet. Be the first to review!
            </Card.Text>
            <hr />
            <Form className="w-100">
              <Form.Group className="mb-2">
                <Form.Label className="fw-semibold">Your Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="fw-semibold">Your Comments</Form.Label>
                <Form.Control as="textarea" />
              </Form.Group>
              <Form.Group className="mb-2">
                <i className="ri-star-line"></i>
                <i className="ri-star-line"></i>
                <i className="ri-star-line"></i>
                <i className="ri-star-line"></i>
                <i className="ri-star-line"></i>
              </Form.Group>
            
              <Form.Group className="mb-3">
                <Form.Control type="file" size="sm" />
              </Form.Group>
              <Form.Group className="mb-2">
                <Button variant="success">Send</Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

NavDescription.propTypes = {
  description: PropTypes.string,
};

export default NavDescription;
