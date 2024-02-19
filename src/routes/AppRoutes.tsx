import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import LoginPage from '../pages/login/LoginPage'
import ErrorPage from '../pages/error/ErrorPage'
import TransactionFormPage from '../pages/transaction/form/TransactionFormPage'
import TransactionListPage from '../pages/transaction/list/TransactionListPage'
import UserFormPage from '../pages/user/UserFormPage'
import TransactionReportListPage from '../pages/transaction/report/TransactionReportListPage'
import UserListPage from '../pages/user/UserListPage'
import DonorListPage from '../pages/donor/DonorListPage'
import { DashboardLayout } from '../layout/DashboardLayout'
import PrivateRoutes from './routesRestriction/PrivateRoutes'
import PublicRoutes from './routesRestriction/PublicRoutes'
import { useService } from '../service/service'
import DonorFormPage from '../pages/donor/DonorFormPage'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <LoginPage />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: '/user',
//     element: <DashboardLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: '',
//         element: <UserListPage />,
//         errorElement: <ErrorPage />,
//       },
//       {
//         path: 'create',
//         element: <UserFormPage />,
//         errorElement: <ErrorPage />,
//       },
//     ],
//   },
//   {
//     path: '/donor',
//     element: <DashboardLayout />,
//     errorElement: <ErrorPage />,
//     // TODO:  Donor Form Page
//     children: [
//       {
//         path: '',
//         element: <DonorListPage />,
//         errorElement: <ErrorPage />,
//       },
//       // {
//       //   path: 'create',
//       //   element: <DonorFormPage />,
//       //   errorElement: <ErrorPage />,
//       // },
//     ],
//   },
//   {
//     path: '/transaction',
//     element: <DashboardLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: '',
//         element: <TransactionListPage />,
//         errorElement: <ErrorPage />,
//       },
//       {
//         path: 'create',
//         element: <TransactionFormPage />,
//         errorElement: <ErrorPage />,
//       },
//       {
//         path: 'edit/:id',
//         element: <TransactionFormPage />,
//         errorElement: <ErrorPage />,
//       },
//       {
//         path: 'historyReport',
//         element: <TransactionReportListPage />,
//         errorElement: <ErrorPage />,
//       },
//     ],
//   },
// ])

const AppRoutes: React.FC = () => {
  const service = useService()
  const isAdmin = service.reactStore.store.user?.role

  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Routes>
          {/* Private routes */}
          <Route element={<PrivateRoutes />}>
            {isAdmin === 'admin' && (
              <>
                <Route path="/user" element={<DashboardLayout />}>
                  <Route path="" element={<UserListPage />} />
                  <Route path="create" element={<UserFormPage />} />
                  <Route path="edit/:id" element={<UserFormPage />} />
                </Route>
                <Route path="/donor" element={<DashboardLayout />}>
                  <Route path="" element={<DonorListPage />} />
                  <Route path="create" element={<DonorFormPage />} />
                </Route>
              </>
            )}
            <Route path="/transaction" element={<DashboardLayout />}>
              <Route path="" element={<TransactionListPage />} />
              <Route path="create" element={<TransactionFormPage />} />
              <Route path="edit/:id" element={<TransactionFormPage />} />
              <Route
                path="historyReport"
                element={<TransactionReportListPage />}
              />
            </Route>
          </Route>

          {/* Public routes */}
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<LoginPage />} />
          </Route>

          {/* Error routes */}
          <Route path="*" element={<ErrorPage status={400} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoutes
