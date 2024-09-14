import "./Navbar.css";

const FreeShipping = () => {
  return (
    <header className="bg-white text-color py-2 w-100">
      <div className="container">
        <div className="row fm-2 align-items-center">
          <div className="col">
            <div className="d-flex gap-2 align-items-center justify-content-start">
              <i className="ri-truck-fill"></i>
              <p className="m-0">Free Shipping</p>
            </div>
          </div>
          <div className="col">
            <div className="d-flex gap-2 align-items-center justify-content-center">
              <p className="m-0 text-center">
                Free Shipping On Oders Over Rp. 500.000,-
              </p>
            </div>
          </div>
          <div className="col">
            <div className="d-flex gap-2 align-items-center justify-content-end">
              <i className="ri-truck-fill"></i>
              <p className="m-0">Free Shipping</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FreeShipping;
