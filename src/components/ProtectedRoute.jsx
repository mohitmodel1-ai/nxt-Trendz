import { Navigate,} from "react-router"
export const ProtectedRoute = ({children,auth}) => {
    return auth ? children : <Navigate to="/login"/>
}