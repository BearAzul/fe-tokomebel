import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Component
import PublicLayout from "./layouts/PublicLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import Cart from "./pages/Cart.jsx";
import DetailProduct from "./pages/DetailProduct.jsx";
import ProfilUser from "./pages/ProfilUser.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";

// Admin Component
import AdminLayout from "./layouts/AdminLayout.jsx";
import HomeView from "./pages/admin/HomeView.jsx";
import UserView from "./pages/admin/UserView.jsx";
import ProductsView from "./pages/admin/ProductsView.jsx";
import OrdersView from "./pages/admin/OrdersView.jsx";
import AddProductView from "./pages/admin/Form/AddProductView.jsx";
import EditProductView from "./pages/admin/Form/EditProductView.jsx";
import CustomersView from "./pages/admin/CustomersView.jsx";
import ReportsView from "./pages/admin/ReportsView.jsx";

// Page Not Found / Error
import NotPage from "./pages/NotPage.jsx";

// Loader
import { loader as SellerLoader } from "./components/Trending/BestSellerSection.jsx";
import { loader as ShopLoader } from "./pages/ShopPage.jsx";
import { loader as ProfilLoader } from "./pages/ProfilUser.jsx";
import { loader as PaymentLoader } from "./pages/PaymentPage.jsx";
import { loader as OrderLoader } from "./pages/OrderHistory.jsx";
import { loader as ProductsLoader } from "./pages/admin/ProductsView.jsx";
import { loader as AdminLoader } from "./layouts/AdminLayout.jsx";
import { loader as DashboardLoader } from "./pages/admin/HomeView.jsx";



// auth
import { action as LoginAction } from "./pages/auth/LoginPage.jsx";
import { action as RegisterAction } from "./pages/auth/RegisterPage.jsx";

// storage
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
      { path: "shop/:id", element: <DetailProduct /> },
      { path: "cart", element: <Cart /> },
      {
        path: "profile",
        element: <ProfilUser />,
        loader: ProfilLoader(store),
      },
      {
        path: "orders",
        element: <OrderHistory />,
        loader: OrderLoader(store),
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
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    loader: AdminLoader(store),
    children: [
      {
        index: true,
        element: <HomeView />,
        loader: DashboardLoader,
      },
      {
        path: "/admin/user",
        element: <UserView />,
      },
      {
        path: "/admin/products",
        element: <ProductsView />,
        loader: ProductsLoader,
      },
      {
        path: "/admin/products/add",
        element: <AddProductView />,
      },
      {
        path: "/admin/products/:id/edit",
        element: <EditProductView />,
      },
      {
        path: "/admin/orders",
        element: <OrdersView />,
      },
      {
        path: "/admin/customers",
        element: <CustomersView />,
      },
      {
        path: "/admin/reports",
        element: <ReportsView />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
