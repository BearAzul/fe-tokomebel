import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import "./Recent.css";
import { useState } from "react";
import { recents } from "../../assets/data/DummyData.jsx";

const RecentSection = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleButtonClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <>
      <div className="d-block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
          <path
            fill="#135961"
            fillOpacity="1"
            d="M0,224L0,256L144,256L144,64L288,64L288,96L432,96L432,96L576,96L576,64L720,64L720,160L864,160L864,32L1008,32L1008,128L1152,128L1152,96L1296,96L1296,32L1440,32L1440,0L1296,0L1296,0L1152,0L1152,0L1008,0L1008,0L864,0L864,0L720,0L720,0L576,0L576,0L432,0L432,0L288,0L288,0L144,0L144,0L0,0L0,0Z"
          ></path>
        </svg>
      </div>
      <section id="recent" className="py-4  overflow-hidden">
        <Container className="my-5 align-items-center ">
          <div
            className="title text-uppercase max-content mx-auto pt-5 mb-5"
            data-aos="fade-down"
          >
            <p className="text-orange py-1 px-2 border border-secondary max-content mx-auto fm-1 fs-7 fw-bold fst-italic mb-1">
              Recently
            </p>
            <h2 className="text-dark-dark fm-2 fs-4 fw-bold">
              TATA LETAK RUANGAN
            </h2>
          </div>
          <Row
            md="2"
            className="align-items-center justify-content-center pb-0"
          >
            <Col md="6" data-aos="fade-right">
              <div className="recent__project">
                <div className="recent__button fm-3 h-max-content border-bottom border-secondary-subtle">
                  {recents.map((recent, index) => (
                    <Button
                      key={index}
                      variant="base"
                      className="border-0 rounded-0 border-top border-secondary-subtle d-flex justify-content-between w-100 py-2 py-lg-3 fw-medium"
                      onClick={() => handleButtonClick(index)}
                    >
                      <div className="text-dark-dark d-flex gap-2">
                        <span>{recent.label}</span>
                        <p className="text-dark-dark m-0 text-start">{recent.title}</p>
                      </div>
                      <i className="text-dark-dark ri-arrow-right-up-fill"></i>
                    </Button>
                  ))}
                </div>
              </div>
            </Col>
            <Col md="6" className="d-flex align-items-end" data-aos="fade-left">
              <Carousel
                style={{ width: "100%" }}
                className="mx-auto"
                activeIndex={selectedImageIndex}
                onSelect={(selectedIndex) => setSelectedImageIndex(selectedIndex)}
              >
                {recents.map((recent, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100 h-100 object-fit-cover"
                      src={recent.image}
                      alt={`Image Recent ${index + 1}`}
                    />
                    <Carousel.Caption className="fm-3 bg-dark py-1 px-2">
                      <p className="m-0">
                        {recent.label} {recent.title}
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="d-block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180">
          <path
            fill="#212529"
            fillOpacity="1"
            d="M0,128L0,128L144,128L144,256L288,256L288,256L432,256L432,96L576,96L576,192L720,192L720,128L864,128L864,192L1008,192L1008,32L1152,32L1152,128L1296,128L1296,32L1440,32L1440,320L1296,320L1296,320L1152,320L1152,320L1008,320L1008,320L864,320L864,320L720,320L720,320L576,320L576,320L432,320L432,320L288,320L288,320L144,320L144,320L0,320L0,320Z"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default RecentSection;
