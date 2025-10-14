import { Container } from "react-bootstrap";
import { HelmetHead } from "../../common/Helmet.jsx";
import "./MaintenancePage.css";

const MaintenancePage = () => {
  return (
    <>
      <HelmetHead title="Maintenance" />
      <section id="maintenance">
        <Container className="d-flex align-items-center justify-content-center vh-100 fm-2">
          <div className="text-center p-1 wrapp">
            <h1 className="fw-bold mb-1">🚧 Sedang dalam Pemeliharaan 🚧</h1>
            <p className="mb-3">Maaf atas ketidaknyamanannya. Aplikasi kami sedang dalam tahap maintenance untuk mencegah kerusakan dan meningkatkan layanan kami.</p>
            <p className="text-muted mb-2">Silakan kunjungi kembali nanti.</p>
            <p className="fw-medium">&copy; {new Date().getFullYear()} Aplikasi Toko Mebel - AkimDev.</p>
          </div>
        </Container>
      </section>
    </>
  )
}

export default MaintenancePage