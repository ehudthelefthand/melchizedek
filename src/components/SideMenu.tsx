import { Divider, Menu } from 'antd'
import {
  DesktopOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const SideMenu: React.FC = () => {
  const location = useLocation()
  const selectedKey = location.pathname || '/'
  const [t] = useTranslation('translation')
  const userFullName = localStorage.getItem('fullName')

  useEffect(() => {
    console.log('user SideMenu', userFullName)
  }, [])

  const items = [
    {
      key: '#',
      label: 'username',
      icon: <UserAddOutlined />,
    },
    {
      key: 'transactionPage',
      label: <Link to={''}>{t('menu.transaction')}</Link>,
      icon: <DesktopOutlined />,
    },
  ]

  const logoutItem = {
    key: 'logout',
    label: <Link to={'/'}>{t('menu.logout')}</Link>,
    icon: <LogoutOutlined />,
  }

  return (
    <div
      className="menu"
      style={{
        flex: 1,
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div className="menu-item-1" key={12}>
        <Menu
          defaultSelectedKeys={[selectedKey]}
          mode="inline"
          theme="light"
          items={items}
        />
      </div>

      <div className="menu-item-2" key={13}>
        <Divider />
        <Menu
          defaultSelectedKeys={[selectedKey]}
          mode="inline"
          theme="light"
          items={[logoutItem]}
        />
      </div>
    </div>
  )
}

export default SideMenu
