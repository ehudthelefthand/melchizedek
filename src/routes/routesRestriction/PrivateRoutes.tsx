import { Navigate, Outlet } from "react-router-dom"
import { useService } from "../../service/service"

function PrivateRoutes() {
   const service = useService()
   const isLoggedIn = service.reactStore.store.user

   return isLoggedIn ? <Outlet /> : <Navigate to={'/'} />
}

export default PrivateRoutes