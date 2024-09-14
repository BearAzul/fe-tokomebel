import { createSlice } from "@reduxjs/toolkit"
import {toast} from "react-toastify"

const initialState = {
  user: JSON.parse(localStorage.getItem("customer") || null)
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    loginUser: (state, action) => {
      
      const user = action.payload.data
      state.user = user

      localStorage.setItem('customer', JSON.stringify(user))
    },
    logoutUser: (state) => {
      state.user = null
      localStorage.removeItem('customer')
      toast.success("Logout Success")
    },
    registerUser: (state, action) => { 
      const user = action.payload.data
      state.user = user
    }
  }
})

export const { loginUser, logoutUser, registerUser } = userSlice.actions

export default userSlice.reducer