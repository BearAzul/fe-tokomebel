import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"

export function LoginButton ({link}) {
  return (
    <NavLink to={`/${link}`} className="btn btn-outline-light btn-sm fm-2">Login</NavLink>
  )
}


LoginButton.propTypes = {
  link: PropTypes.string.isRequired,
}



