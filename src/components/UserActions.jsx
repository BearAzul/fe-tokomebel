

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProfileButton } from "./Button.jsx";

const UserActions = ({ className }) => {
  const user = useSelector((state) => state.userState.user);
  const countCart = useSelector((state) => state.cartState.numItemsInCart);
  const isVerified = user?.isVerified;

  return (
    <div className={className}>

      {isVerified ?
        <ProfileButton /> :
        <Link to="/login" className="btn btn-outline-light btn-sm fm-2">Login</Link>
      }

      <Link to="/cart" className="text-decoration-none text-white position-relative" aria-label="Link To Cart">
        <i className="ri-shopping-cart-2-fill fs-6"></i>

        <span className={`indicator__cart ${!countCart && "d-none"}`}>
          {countCart}
        </span>
      </Link>
    </div>
  );
};

export default UserActions;