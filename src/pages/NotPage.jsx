import { Container } from "react-bootstrap";
import { Link, useRouteError } from "react-router-dom";

const NotPage = () => {
  const notFound = useRouteError();
  if (notFound.status === 404) {
    return (
      <section className="py-3 bg-secondary-subtle">
        <Container>
          <div>
            <Link to="/" className="btn btn-primary btn-sm">
              <i className="ri-arrow-left-line me-2"></i>
              Back to Home
            </Link>
          </div>
          <div className="d-flex justify-content-center align-items-center py-5 text-bg-secondary-subtle">
            <h4 className="fm-3 my-5">404 | Not Found Page</h4>
          </div>
        </Container>
      </section>
    );
  } else if (notFound.status === 500) {
    return (
      <section className="py-3 bg-secondary-subtle">
        <Container>
          <div className="d-flex justify-content-center align-items-center py-5 text-bg-secondary-subtle">
            <h4 className="fm-3 mb-2">500 | Internal Server Error</h4>
            <p className="fm-3 mb-5">Please comeback at 15 minutes later</p>
          </div>
        </Container>
      </section>
    );
  }
};

export default NotPage;
