import { Link } from "react-router-dom";
//============== Category ===================
export function CategoryDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3">
      <Link to="/admin" className="text-white-50 text-decoration-none">
        Dashboard
      </Link>
      <span> &gt; </span>
      <p>Kategori</p>
    </div>
  );
}
export function AddCategoryDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3">
      <Link to="/admin" className="text-white-50 text-decoration-none">
        Dashboard
      </Link>
      <span> &gt; </span>
      <Link to="/admin/category" className="text-white-50 text-decoration-none">
        Kategori
      </Link>
      <span> &gt; </span>
      <p>Tambah Kategori</p>
    </div>
  );
}
export function EditCategoryDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3">
      <Link to="/admin" className="text-white-50 text-decoration-none">
        Dashboard
      </Link>
      <span> &gt; </span>
      <Link to="/admin/category" className="text-white-50 text-decoration-none">
        Kategori
      </Link>
      <span> &gt; </span>
      <p>Edit Kategori</p>
    </div>
  );
}
//======================================

//=========== Products =================
export function ProductsDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3">
      <Link to="/admin" className="text-white-50 text-decoration-none">
        Dashboard
      </Link>
      <span> &gt; </span>
      <p>Produk Mebel</p>
    </div>
  );
}
export function AddProductDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3">
      <Link to="/admin" className="text-white-50 text-decoration-none">
        Dashboard
      </Link>
      <span> &gt; </span>
      <Link to="/admin/products" className="text-white-50 text-decoration-none">
        Produk Mebel
      </Link>
      <span> &gt; </span>
      <p>Tambah Mebel</p>
    </div>
  );
}
export function EditProductDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3">
      <Link to="/admin" className="text-white-50 text-decoration-none">
        Dashboard
      </Link>
      <span> &gt; </span>
      <Link to="/admin/products" className="text-white-50 text-decoration-none">
        Produk Mebel
      </Link>
      <span> &gt; </span>
      <p>Edit Mebel</p>
    </div>
  );
}
//=====================================

//=========== Orders ==================
export function OrdersDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3">
      <Link to="/admin" className="text-white-50 text-decoration-none">
        Dashboard
      </Link>
      <span> &gt; </span>
      <p>Daftar Pesanan</p>
    </div>
  );
}
export function DetailOrderDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3">
      <Link to="/admin" className="text-white-50 text-decoration-none">
        Dashboard
      </Link>
      <span> &gt; </span>
      <Link to="/admin/orders" className="text-white-50 text-decoration-none">
        Daftar Pesanan
      </Link>
      <span> &gt; </span>
      <p>Detail Pesanan</p>
    </div>
  );
}
//=====================================

//=========== Customers ===================
export function CustomersDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3">
      <Link to="/admin" className="text-white-50 text-decoration-none">
        Dashboard
      </Link>
      <span> &gt; </span>
      <p>Daftar Pelanggan</p>
    </div>
  );
}
export function EditCustomerDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3">
      <Link to="/admin" className="text-white-50 text-decoration-none">
        Dashboard
      </Link>
      <span> &gt; </span>
      <Link
        to="/admin/customers"
        className="text-white-50 text-decoration-none"
      >
        Daftar Pelanggan
      </Link>
      <span> &gt; </span>
      <p>Edit Pelanggan</p>
    </div>
  );
}
//=========================================


//================ Shop ===================
export function ShopDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3 text-dark">
      <Link to="/" className="text-body-secondary text-decoration-none">
        Beranda
      </Link>
      <span> &gt; </span>
      <p>Katalog</p>
    </div>
  );
}
export function ProductDetailDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3 text-dark">
      <Link to="/" className="text-body-secondary text-decoration-none">
        Beranda
      </Link>
      <span> &gt; </span>
      <Link to="/shop" className="text-body-secondary text-decoration-none">
        Katalog
      </Link>
      <span> &gt; </span>
      <p>Detail</p>
    </div>
  );
}
//==========================================

//============ Profile =====================
export function ProfileDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3 text-dark">
      <Link to="/" className="text-body-secondary text-decoration-none">
        Beranda
      </Link>
      <span> &gt; </span>
      <p>Profil</p>
    </div>
  );
}
export function HistoryDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3 text-dark">
      <Link to="/" className="text-body-secondary text-decoration-none">
        Beranda
      </Link>
      <span> &gt; </span>
      <Link to="/profile" className="text-body-secondary text-decoration-none">
        Profil
      </Link>
      <span> &gt; </span>
      <p>Riwayat Pesanan</p>
    </div>
  );
}
export function DetailOrderCustomerDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3 text-dark">
      <Link to="/" className="text-body-secondary text-decoration-none">
        Beranda
      </Link>
      <span> &gt; </span>
      <Link to="/profile" className="text-body-secondary text-decoration-none">
        Profil
      </Link>
      <span> &gt; </span>
      <Link to="/orders" className="text-body-secondary text-decoration-none">
        Riwayat Pesanan
      </Link>
      <span> &gt; </span>
      <p>Detail Pesanan</p>
    </div>
  );
}
//=====================================

//=============== Checkout ============
export function CartDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3 text-dark">
      <Link to="/shop" className="text-body-secondary text-decoration-none">
        Katalog
      </Link>
      <span> &gt; </span>
      <p>Keranjang</p>
    </div>
  );
}
export function CheckoutDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3 text-dark">
      <Link to="/shop" className="text-body-secondary text-decoration-none">
        Katalog
      </Link>
      <span> &gt; </span>
      <Link to="/cart" className="text-body-secondary text-decoration-none">
        Keranjang
      </Link>
      <span> &gt; </span>
      <p>Pembayaran</p>
    </div>
  );
}
//=====================================