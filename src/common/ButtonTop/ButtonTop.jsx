import {useState, useEffect} from "react"
import {Button} from "react-bootstrap"
const ButtonTop = () => {

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <Button
          variant="danger"
          size="sm"
          className="position-fixed bottom-0 end-0 m-4"
          onClick={scrollToTop}
        >
          <i className="ri-arrow-up-s-line"></i>
        </Button>
      )}
    </>
  );
}

export default ButtonTop