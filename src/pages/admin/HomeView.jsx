import { Row, Col } from "react-bootstrap";



const HomeView = () => {
  return (
    <section id="dashboard" className="p-2">
      <Row md="3" lg="4" className="g-2">
        <Col>
          <Row
            md="2"
            className="text-bg-dark border border-secondary rounded p-2 d-flex gap-3 fm-2 g-1"
          >
            <Col md="4">
              <div className="text-bg-primary rounded p-2 text-center">
                <i className="ri-settings-3-fill"></i>
              </div>
            </Col>
            <Col md="8">
              <h6>Dashboard</h6>
              <p>12%</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default HomeView;
