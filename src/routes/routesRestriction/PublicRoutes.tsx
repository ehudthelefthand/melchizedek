import { Navigate, Outlet } from "react-router-dom"
import { useService } from "../../service/service"

function PublicRoutes() {
   const service = useService()
   const isLoggedIn = service.reactStore.store.user

   return isLoggedIn ? <Navigate to={'/transaction'} /> : <Outlet />
}

export default PublicRoutes