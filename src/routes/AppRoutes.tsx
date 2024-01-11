import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Root } from '../App'

import LoginPage from '../pages/login/LoginPage'
import ErrorPage from '../pages/Error/ErrorPage'

import TransactionFormPage from '../pages/Transaction/transactionFormPage'
import TransactionPage from '../pages/Transaction/TransactionPage'

const AppRoutes: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/transaction',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <TransactionPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: 'form',
          element: <TransactionFormPage isEdit={false} />,
          errorElement: <ErrorPage />,
        },
        {
          path: 'edit/:id',
          element: <TransactionFormPage isEdit={true} />,
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
