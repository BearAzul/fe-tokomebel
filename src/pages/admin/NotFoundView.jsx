import { Container } from "react-bootstrap"
import {Link} from "react-router-dom"

const NotFoundView = () => {
  return (
    <section className="text-bg-dark">
      <Container>
        <div className="d-flex justify-content-center align-items-center py-5 text-white flex-column">
          <h4 className="fm-3 mb-2">404 | Not Found</h4>
          <p className="fm-3 mb-5">Sorry, the page you`re looking for doesn`t exist.</p>
          <Link to="/admin" className="btn btn-primary fm-2 btn-sm">Back to Dashboard</Link>
        </div>
      </Container>
    </section>
  )
}

export default NotFoundView