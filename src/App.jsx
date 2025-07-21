import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import VerifyAccountPage from "./pages/auth/VerifyAccountPage.jsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.jsx";
import UpdatePasswordPage from "./pages/auth/UpdatePasswordPage.jsx";

// Public Pages
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import DetailProduct from "./pages/DetailProduct.jsx";
import Cart from "./pages/Cart.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import OrderDetailPage from "./pages/OrderDetailPage.jsx";
import NotPage from "./pages/NotPage.jsx";

// Admin Pages
import HomeView from "./pages/admin/HomeView.jsx";
import UserView from "./pages/admin/UserView.jsx";
import ProductsView from "./pages/admin/ProductsView.jsx";
import AddProductView from "./pages/admin/Form/AddProductView.jsx";
import EditProductView from "./pages/admin/Form/EditProductView.jsx";
import CategoryView from "./pages/admin/CategoryView.jsx";
import AddCategoryView from "./pages/admin/Form/AddCategoryView.jsx";
import EditCategoryView from "./pages/admin/Form/EditCategoryView.jsx";
import CustomersView from "./pages/admin/CustomersView.jsx";
import EditCustomersView from "./pages/admin/Form/EditCustomersView.jsx";
import OrdersView from "./pages/admin/OrdersView.jsx";
import OrderDetailView from "./pages/admin/OrderDetailView.jsx";
import NotFoundView from "./pages/admin/NotFoundView.jsx";

// Loaders
import { loader as SellerLoader } from "./components/Trending/BestSellerSection.jsx";
import { loader as ShopLoader } from "./pages/ShopPage.jsx";
import { loader as DetailProductLoader } from "./pages/DetailProduct.jsx";
import { loader as ProfileLoader } from "./pages/ProfilePage.jsx";
import { loader as PaymentLoader } from "./pages/PaymentPage.jsx";
import { loader as OrderLoader } from "./pages/OrderHistory.jsx";
import { loader as OrderDetailLoader } from "./pages/OrderDetailPage.jsx";
import { loader as AdminLoader } from "./layouts/AdminLayout.jsx";
import { loader as DashboardLoader } from "./pages/admin/HomeView.jsx";
import { loader as AdminProfileLoader } from "./pages/admin/UserView.jsx";
import { loader as ProductsLoader } from "./pages/admin/ProductsView.jsx";
import { loader as EditProductLoader } from "./pages/admin/Form/EditProductView.jsx";
import { loader as AddProductLoader } from "./pages/admin/Form/AddProductView.jsx";
import { loader as CustomersLoader } from "./pages/admin/CustomersView.jsx";
import { loader as EditCustomersLoader } from "./pages/admin/Form/EditCustomersView.jsx";
import { loader as OrdersAdminLoader } from "./pages/admin/OrdersView.jsx";
import { loader as OrderDetailAdminLoader } from "./pages/admin/OrderDetailView.jsx";
import { loader as CategoryLoader } from "./pages/admin/CategoryView.jsx";
import { loader as EditCategoryLoader } from "./pages/admin/Form/EditCategoryView.jsx";

// Actions
import { action as LoginAction } from "./pages/auth/LoginPage.jsx";
import { action as RegisterAction } from "./pages/auth/RegisterPage.jsx";
import { action as verifyAction } from "./pages/auth/VerifyAccountPage.jsx";
import { action as forgotPasswordAction } from "./pages/auth/ForgotPasswordPage.jsx";
import { action as updatePasswordAction } from "./pages/auth/UpdatePasswordPage.jsx";
import { action as EditCustomersAction } from "./pages/admin/Form/EditCustomersView.jsx";
import { action as OrderDetailAdminAction } from "./pages/admin/OrderDetailView.jsx";

// Redux Store
import { store } from "./store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <NotPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: SellerLoader,
      },
      {
        path: "shop",
        element: <ShopPage />,
        loader: ShopLoader,
      },
      {
        path: "shop/:id",
        element: <DetailProduct />,
        loader: DetailProductLoader
      },
      { path: "cart", element: <Cart /> },
      {
        path: "profile",
        element: <ProfilePage />,
        loader: ProfileLoader(store),
      },
      {
        path: "orders",
        element: <OrderHistory />,
        loader: OrderLoader(store),
      },
      {
        path: "orders/:id/shipping",
        element: <OrderDetailPage />,
        loader: OrderDetailLoader(store),
      },
      {
        path: "login",
        element: <LoginPage />,
        action: LoginAction(store),
      },
      {
        path: "register",
        element: <RegisterPage />,
        action: RegisterAction(store),
      },
      {
        path: "checkout",
        element: <PaymentPage />,
        loader: PaymentLoader(store),
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
        action: forgotPasswordAction,
      },
      {
        path: "verify-email",
        element: <VerifyAccountPage />,
        action: verifyAction,
      },

      {
        path: "reset-password/:token",
        element: <UpdatePasswordPage />,
        action: updatePasswordAction,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <NotFoundView />,
    loader: AdminLoader(store),
    children: [
      {
        index: true,
        element: <HomeView />,
        loader: DashboardLoader(store),
      },
      {
        path: "/admin/user",
        element: <UserView />,
        loader: AdminProfileLoader,
      },
      {
        path: "/admin/category",
        element: <CategoryView />,
        loader: CategoryLoader,
      },
      {
        path: "/admin/category/add",
        element: <AddCategoryView />,
      },
      {
        path: "/admin/category/:id/edit",
        element: <EditCategoryView />,
        loader: EditCategoryLoader
      },
      {
        path: "/admin/products",
        element: <ProductsView />,
        loader: ProductsLoader,
      },
      {
        path: "/admin/products/add",
        element: <AddProductView />,
        loader: AddProductLoader
      },
      {
        path: "/admin/products/:id/edit",
        element: <EditProductView />,
        loader: EditProductLoader
      },

      {
        path: "/admin/customers",
        element: <CustomersView />,
        loader: CustomersLoader,
      },
      {
        path: "/admin/customers/:id/edit",
        element: <EditCustomersView />,
        loader: EditCustomersLoader,
        action: EditCustomersAction
      },
      {
        path: "/admin/orders",
        element: <OrdersView />,
        loader: OrdersAdminLoader(store),
      },
      {
        path: "/admin/orders/:id",
        element: <OrderDetailView />,
        loader: OrderDetailAdminLoader,
        action: OrderDetailAdminAction
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
