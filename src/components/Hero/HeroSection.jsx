
import HeroImg1 from "../../assets/Image/left-chair-img.png";
import HeroImg2 from "../../assets/Image/right-chair-img.png";
import {Row, Col, Button} from "react-bootstrap"
import "./Hero.css";
import { useNavigate } from "react-router-dom"
import "../../styles/index.css";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <section
        id="home"
        className="bg-dark-green py-md-5 d-flex align-items-center justify-content-center overflow-hidden px-lg-3 px-md-5"
      >

        <div className="mt-5 mt-md-0">
          <Row className="g-md-1 g-lg-0">
            <Col xs="6" lg="4"
              className="align-content-center"
              data-aos="fade-down-right"
              data-aos-delay="300"
            >
              <div className="img-container d-flex justify-content-start align-items-start me-auto">
                  <img className="w-100 h-100 d-block " src={HeroImg1} alt="Shofa Red" />
              </div>
            </Col>
            <Col xs="12" lg="4"
              className="order-first order-lg-0 mb-5 mx-auto"
              data-aos="zoom-in-down"
            >
              <div className="text-white text-center hero__cta my-5 mb-lg-0 px-3 px-md-5 px-lg-0">
                <h1 className=" m-0 fw-bold fm-4">
                  MAKE SURE YOUR <br /> HOME SHAPES YOUR <br /> PERSONALITY
                </h1>
                <span className="mx-auto mt-2 mb-3 rounded-3 d-block"></span>
                <p className="text-paragraf mb-4 fm-2">
                  Incredible home decor tips for your nest`s design!{" "}
                  <b>Get inspired</b> & make the design of your <b>Dreams!</b>
                </p>
                <Button variant="dark" size="md"
                  className="mx-auto rounded-0 py-2 px-3 fm-2 fs-6"
                  onClick={() => navigate("/shop")}
                >
                  SHOP NOW <i className="ri-arrow-right-circle-line ms-1"></i>
                </Button>
              </div>
            </Col>
            <Col xs="6" lg="4"
              className="align-content-center"
              data-aos="fade-up-left"
              data-aos-delay="300"
            >
              <div className="img-container d-flex justify-content-end align-items-end ms-auto">
                  <img  src={HeroImg2}  alt="Chair" className=" w-100 h-100 d-block"/>
              </div>
            </Col>
          </Row>    
        </div>
      </section>
    </>
  );
};

export default HeroSection;
