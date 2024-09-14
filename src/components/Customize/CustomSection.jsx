import "./Customize.css";
import "../../styles/index.css";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import CustomizeImg1 from "../../assets/Image/Chair/arm-chair-01-blue.png";
import CustomizeImg2 from "../../assets/Image/Chair/arm-chair-01-green.png";
import CustomizeImg3 from "../../assets/Image/Chair/arm-chair-01-grey.png";
import CustomizeImg4 from "../../assets/Image/Chair/arm-chair-01-red.png";
import SketchImg from "../../assets/Image/sketch.jpg";
import { useState } from "react";

const CustomSection = () => {

   const [currentImage, setCurrentImage] = useState(CustomizeImg1);

   const handleChange = (color) => {
     switch (color) {
       case "blue":
         setCurrentImage(CustomizeImg1);
         break;
       case "green":
         setCurrentImage(CustomizeImg2);
         break;
       case "grey":
         setCurrentImage(CustomizeImg3);
         break;
       case "red":
         setCurrentImage(CustomizeImg4);
         break;
       default:
         setCurrentImage(CustomizeImg1);
     }
   };
  return (
    <>
     <div className="">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 259"><path fill="#135961" fillOpacity="1" d="M0,192L0,160L144,160L144,64L288,64L288,96L432,96L432,192L576,192L576,64L720,64L720,288L864,288L864,192L1008,192L1008,224L1152,224L1152,128L1296,128L1296,64L1440,64L1440,320L1296,320L1296,320L1152,320L1152,320L1008,320L1008,320L864,320L864,320L720,320L720,320L576,320L576,320L432,320L432,320L288,320L288,320L144,320L144,320L0,320L0,320Z"></path></svg>
      </div>
      <section id="customize" className="pt-3 pb-5 py-lg-5 bg-dark-green overflow-hidden">
        <Container className="my-lg-5 py-lg-5 my-3">
          <Row className="pt-5 gap-4 gap-md-5 gap-lg-0 align-items-end">
            <Col xs="12" md="12" lg="6">
              <Row className="g-4 align-items-end">
                <Col
                  xs="6"
                  md="6"
                  className="d-flex flex-column justify-content-start align-items-start gap-3 gap-md-4 gap-lg-5"
                  data-aos="fade-down-right"
                >
                  <div className="title">
                    <p className="text-orange box fm-1 fw-bold fst-italic fs-7 py-1 px-2 border border-secondary max-content text-uppercase">
                      Customize
                    </p>
                    <h3 className="text-white fw-bold text-uppercase m-0 fm-2">
                      Design Material and Color
                    </h3>
                    <p className="text-white m-0 fm-2 fw-medium">
                      Choose the color you want
                    </p>
                  </div>
                  <div className="color__pick fm-1 w-100">
                    <Button
                      variant="primary"
                      size="md"
                      className="w-100 fw-medium mb-2 rounded-0"
                      onClick={() => handleChange("blue")}
                    >
                      Blue
                    </Button>
                    <Button
                      variant="success"
                      size="md"
                      className="w-100 fw-medium mb-2 rounded-0"
                      onClick={() => handleChange("green")}
                    >
                      Green
                    </Button>
                    <Button
                      variant="secondary"
                      size="md"
                      className="w-100 fw-medium mb-2 rounded-0"
                      onClick={() => handleChange("grey")}
                    >
                      Grey
                    </Button>
                    <Button
                      variant="danger"
                      size="md"
                      className="w-100 fw-medium mb-2 rounded-0"
                      onClick={() => handleChange("red")}
                    >
                      Red
                    </Button>
                  </div>
                </Col>
                <Col xs="6" md="6"
                  data-aos="fade-down-left"
                  data-aos-delay="300"
                >
                  <Card
                    style={{ width: "100%", height: "max-content" }}
                    className="rounded-0 border-dark"
                  >
                    <Card.Img
                      variant="top"
                      src={currentImage}
                      style={{ width: "100%" }}
                      className="mx-auto d-block img__card"
                    />
                    <Card.Footer className="d-flex align-items-center justify-content-between fm-2 p-0 border-dark">
                      <p className="m-0 fw-semibold ps-lg-4 ps-md-3 ps-3">
                        Your Customize
                      </p>
                      <Button
                        variant="warning"
                        size="md"
                        className="rounded-0 px-md-4 px-3 fw-bold"
                      >
                        <i className="ri-settings-5-fill fs-6"></i>
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Col>

            <Col xs="12" md="12" lg="6" data-aos="fade-up" data-aos-delay="600">
              <div className="position-relative d-flex">
                <Image
                  src={SketchImg}
                  thumbnail
                  className="border-dark border-4 rounded-4 mx-auto object-fit-contain"
                  style={{ width: "max-content", height: "max-content" }}
                />
                <div className="position-absolute top-0 start-50 translate-middle text-bg-dark fm-4 py-1 px-2">
                  <p className="m-0 fs-7">Sketching</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CustomSection;
