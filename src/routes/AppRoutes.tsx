import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { DashboardLayout } from '../App'

import LoginPage from '../pages/login/LoginPage'
import ErrorPage from '../pages/error/ErrorPage'
import TransactionPage from '../pages/transaction/list/TransactionPage'
import TransactionFormPage from '../pages/transaction/form/transactionFormPage'

const AppRoutes: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/transaction',
      element: <DashboardLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <TransactionPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: 'create',
          element: <TransactionFormPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: 'edit/:id',
          element: <TransactionFormPage />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes
