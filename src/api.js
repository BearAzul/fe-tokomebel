import axios from "axios"
const customAPI = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
})

export default customAPI