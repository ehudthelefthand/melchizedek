import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SideMenu from '../components/SideMenu'
import AppContent from '../components/Content'
import MzkHeader from '../components/Header'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import LoginPage from '../pages/login/LoginPage'
import ErrorPage from '../pages/error/ErrorPage'
import TransactionFormPage from '../pages/transaction/form/TransactionFormPage'
import TransactionListPage from '../pages/transaction/list/TransactionListPage'
import { useState } from 'react'
import UserFormPage from '../pages/user/UserFormPage'
import TransactionReportListPage from '../pages/transaction/report/TransactionReportListPage'
import UserListPage from '../pages/user/UserListPage'
import DonorListPage from '../pages/donor/DonorListPage'
import DonorFormPage from '../pages/donor/DonorFormPage'

const { Sider } = Layout

export const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 4,
          boxShadow: '0px 0px 5px #21212145',
        }}
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      >
        <SideMenu />
      </Sider>
      <Layout className={`app-content ${collapsed ? 'collapsed' : ''}`}>
        <MzkHeader />
        <AppContent />
      </Layout>
    </Layout>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/user',
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <UserListPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'create',
        element: <UserFormPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '/donor',
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <DonorListPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'create',
        element: <DonorFormPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'edit/:id',
        element: <DonorFormPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'historyReport',
        element: <DonorListPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  // {
  //   path: '/donor',
  //   element: <DashboardLayout />,
  //   errorElement: <ErrorPage />,
  //   // TODO:  Donor Form Page
  //   children: [
  //     {
  //       path: '',
  //       element: <DonorListPage />,
  //       errorElement: <ErrorPage />,
  //     },
  //     // {
  //     //   path: 'create',
  //     //   element: <DonorFormPage />,
  //     //   errorElement: <ErrorPage />,
  //     // },
  //   ],
  // },
  {
    path: '/transaction',
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <TransactionListPage />,
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
      {
        path: 'historyReport',
        element: <TransactionReportListPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
])

const AppRoutes: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes
