import { Link } from "react-router-dom";
//============== Category ===================
export function CategoryDirect() {
  return (
    <div className="d-flex gap-2 fm-2 fs-7 mb-3">
      <Link to="/admin" className="text-white-50 text-decoration-none">
        Dashboard
      </Link>
      <span> &gt; </span>
      <p>Category</p>
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
        Products
      </Link>
      <span> &gt; </span>
      <p>Add Product</p>
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
        Products
      </Link>
      <span> &gt; </span>
      <p>Edit Product</p>
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
