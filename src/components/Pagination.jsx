import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({ totalPage, currentPage, onChangePage }) => {
  const pages = Array.from({ length: totalPage }, (_, index) => index + 1);

  return (
    <Pagination className="justify-content-center mt-5">
      {pages.map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => onChangePage(pageNumber)}
          className="fw-semibold"
        >
          {pageNumber}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

CustomPagination.propTypes = {
  totalPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default CustomPagination;
