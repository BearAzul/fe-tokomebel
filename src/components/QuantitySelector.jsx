import PropTypes from "prop-types"

const QuantitySelector = ({ amount, stock, handleDecrement, handleIncrement}) => {
  return (
    <div className="d-flex align-items-center">
      <button
        type="button"
        className="rounded-1 fw-bold rounded-end-0 border-0 btn btn-warning btn-sm"
        onClick={handleDecrement}
        disabled={amount === 1}
      >
        <i className="ri-subtract-fill"></i>
      </button>
      <input
        type="text"
        className="form-control form-control-sm text-center fw-semibold border-0 rounded-0"
        readOnly
        value={amount}
        style={{ maxWidth: "40px" }}
      />
      <button
        type="button"
        className="rounded-1 fw-bold rounded-start-0 border-0 btn btn-warning btn-sm"
        onClick={handleIncrement}
        disabled={amount === stock}
      >
        <i className="ri-add-fill"></i>
      </button>
    </div>
  );
};

QuantitySelector.propTypes = {
  amount: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  handleDecrement: PropTypes.func.isRequired,
  handleIncrement: PropTypes.func.isRequired,
}

export default QuantitySelector;
