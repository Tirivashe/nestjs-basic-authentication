import { useSelector } from "react-redux"
import { selectToken } from "../redux/slices/authSlice"
import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = () => {
  const authToken = useSelector(selectToken)
  return (
    authToken ? <Outlet /> : <Navigate to="/login"/>
  )
}

export default ProtectedRoutes