import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"

const RequireAuth = ({ allowedRoles }) => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
    const { roles } = useAuth()

    const content = (
        roles.some(role => allowedRoles.includes(role))
            ? <Outlet />
            : token ? 
            <Navigate to="/dash" state={{ from: location }} replace />  
            :  <Navigate to="/" state={{ from: location }} replace />  
    )

    return content
}
export default RequireAuth
