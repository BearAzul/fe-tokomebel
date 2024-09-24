import { Container } from "react-bootstrap"
import {Link} from "react-router-dom"

const NotFoundView = () => {
  return (
    <section>
      <Container>
        <div className="d-flex justify-content-center align-items-center py-5 text-white">
          <h4 className="fm-3 mb-2">404 | Not Found</h4>
          <p className="fm-3 mb-5">Sorry, the page you`re looking for doesn`t exist.</p>
          <Link to="/admin" className="btn btn-primary">Back to Homepage</Link>
        </div>
      </Container>
    </section>
  )
}

export default NotFoundView