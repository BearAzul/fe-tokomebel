import "./BannerHeader.css"
import PropTypes from "prop-types"

const BannerHeader = ({ bannerTitle }) => {
  return (
    <div className="header__page d-flex justify-content-center align-items-center">
      <h1 className="fm-1 fw-bold fs-2">{bannerTitle}</h1>
    </div>
  );
}

BannerHeader.propTypes = {
  bannerTitle: PropTypes.string,
}

export default BannerHeader