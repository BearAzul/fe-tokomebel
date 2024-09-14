import "./Services.css";
import "../../styles/index.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import ListServices from "../../assets/data/ListService.jsx"
import PropTypes from "prop-types"

const CardService = (props) => {
  return (
    <Col data-aos="fade-up" data-aos-delay={props.delay}>
      <Card className="text-dark-dark w-100 h-100 p-3 bg-white-subtle fm-2 border-0" style={{ width: "100%" }}>
        <div className="d-flex align-items-start justify-content-center gap-3 flex-column flex-lg-row">
          <div className="icon__service p-3 text-white bg-dark-dark d-flex align-items-center justify-content-center rounded-circle">
            <i className={props.icons}></i>
          </div>
          <Card.Body className="p-0">
            <Card.Title className="fw-semibold fs-6">{props.title}</Card.Title>
            <Card.Text className="fs-7">{props.description}</Card.Text>
          </Card.Body>
        </div>
      </Card>
    </Col>
  );
};

CardService.propTypes = {
  icons: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

const ServiceSection = () => {
  return (
    <>
      <section
        id="service"
        className="py-5 bg-dark-green overflow-hidden"
      >
        <Container className="pb-5">
          <div
            className="title text-uppercase max-content ms-auto mb-4"
            data-aos="fade-left"
          >
            <p className="py-1 px-2 text-orange border border-secondary max-content ms-auto fm-1 fs-7 fw-bold fst-italic mb-1">
              Service
            </p>
            <h3 className="fm-2 fs-4 fw-bold text-white">Our Service</h3>
            <span className="d-block bg-white"></span>
          </div>
          <Row md="3" xs="2" lg="4" className="g-2">
            {ListServices.map((service) => (
              <CardService
                icons={service.icons}
                title={service.title}
                description={service.description}
                delay={service.delay}
                key={service.id}
              />
            ))}
          </Row>
        </Container>
      </section>
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250"><path fill="#135961" fillOpacity="1" d="M0,224L0,256L144,256L144,64L288,64L288,96L432,96L432,96L576,96L576,64L720,64L720,160L864,160L864,32L1008,32L1008,128L1152,128L1152,96L1296,96L1296,32L1440,32L1440,0L1296,0L1296,0L1152,0L1152,0L1008,0L1008,0L864,0L864,0L720,0L720,0L576,0L576,0L432,0L432,0L288,0L288,0L144,0L144,0L0,0L0,0Z"></path></svg>
      </div>
      
    </>
  );
};

export default ServiceSection;
