import { Modal, Image } from "react-bootstrap"
import { PropTypes } from "prop-types"
import BlankImages from "../assets/Image/landscape-placeholder.svg"

const ZoomModal = ({ show, onHide, imageUrl, altText }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Body className="p-0 bg-dark">
        <Image
          src={imageUrl || BlankImages}
          alt={altText || "Zoom Images"}
          className="w-100"
          style={{ objectFit: "cover" }}
        />
      </Modal.Body>
    </Modal>
  )
}

ZoomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  altText: PropTypes.string,
};

export default ZoomModal