import { useDispatch } from "react-redux";
import { loginUser } from "../../../features/userSlice.js";
import customAPI from "../../../api.js";
import { toast } from "react-toastify"
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom"

const Oauth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleGoogle = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const response = await customAPI.post("/auth/google-login", {
        token: credential,
      })
      dispatch(loginUser(response.data))
      toast.success("Login Google Berhasil!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center">
      <GoogleLogin
        onSuccess={handleGoogle}
        useOneTap
      />
    </div>
  )
}

export default Oauth;