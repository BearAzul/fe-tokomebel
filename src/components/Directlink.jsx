import { Link } from "react-router-dom";
//============== Category ===================
export function CategoryDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3">
      <Link to="/admin" className="text-white-50 text-decoration-none">
        Dashboard
      </Link>
      <span> &gt; </span>
      <p>Categories</p>
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
        Categories
      </Link>
      <span> &gt; </span>
      <p>Add Category</p>
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
        Categories
      </Link>
      <span> &gt; </span>
      <p>Edit Category</p>
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
      <p>Products</p>
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
        Products
      </Link>
      <span> &gt; </span>
      <p>Add Product</p>
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
        Products
      </Link>
      <span> &gt; </span>
      <p>Edit Product</p>
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
      <p>Orders</p>
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
        Orders
      </Link>
      <span> &gt; </span>
      <p>Order Detail</p>
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
      <p>Customers</p>
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
        Customers
      </Link>
      <span> &gt; </span>
      <p>Edit Customers</p>
    </div>
  );
}
//=========================================


//================ Shop ===================
export function ShopDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3 text-dark">
      <Link to="/" className="text-body-secondary text-decoration-none">
        Home
      </Link>
      <span> &gt; </span>
      <p>Shop</p>
    </div>
  );
}
export function ProductDetailDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3 text-dark">
      <Link to="/" className="text-body-secondary text-decoration-none">
        Home
      </Link>
      <span> &gt; </span>
      <Link to="/shop" className="text-body-secondary text-decoration-none">
        Shop
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
        Home
      </Link>
      <span> &gt; </span>
      <p>Profile</p>
    </div>
  );
}
export function HistoryDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3 text-dark">
      <Link to="/" className="text-body-secondary text-decoration-none">
        Home
      </Link>
      <span> &gt; </span>
      <Link to="/profile" className="text-body-secondary text-decoration-none">
        Profile
      </Link>
      <span> &gt; </span>
      <p>Order History</p>
    </div>
  );
}
//=====================================

//=============== Checkout ============
export function CartDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3 text-dark">
      <Link to="/shop" className="text-body-secondary text-decoration-none">
        Shop
      </Link>
      <span> &gt; </span>
      <p>Cart</p>
    </div>
  );
}
export function CheckoutDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3 text-dark">
      <Link to="/shop" className="text-body-secondary text-decoration-none">
        Shop
      </Link>
      <span> &gt; </span>
      <Link to="/cart" className="text-body-secondary text-decoration-none">
        Cart
      </Link>
      <span> &gt; </span>
      <p>Payment</p>
    </div>
  );
}
//=====================================