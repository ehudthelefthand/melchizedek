import { Divider, Menu, MenuProps } from 'antd'
import {
  CloudDownloadOutlined,
  ContactsOutlined,
  DesktopOutlined,
  LogoutOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useService } from '../service/service'

const SideMenu: React.FC = () => {
  const location = useLocation()
  const selectedKey = location.pathname || '/'
  const [t] = useTranslation('translation')
  const service = useService()
  const navigate = useNavigate()

  const items = [
    {
      key: '#',
      label: service.reactStore.store.user?.username,
      icon: <UserOutlined />,
    },
    {
      key: 'transactionPage',
      label: t('menu.transaction'),
      icon: <DesktopOutlined />,
    },
    {
      key: 'transactionHistoryReport',
      // TODO: translation
      label: 'ประวัติการดาวโหลด',
      icon: <CloudDownloadOutlined />,
    },
    {
      key: 'user',
      label: 'จัดการผู้ใช้',
      icon: <TeamOutlined />,
      children: [
        {
          key: 'userPage',
          label: 'ผู้ใช้ทั้งหมด',
          icon: <SolutionOutlined />,
        },
        {
          key: 'donorPage',
          label: 'ผู้ถวายทั้งหมด',
          icon: <ContactsOutlined />,
        },
      ],
    },
  ]

  const logoutItem = {
    key: 'logout',
    label: t('menu.logout'),
    icon: <LogoutOutlined />,
  }

  const handleOnClickMenus: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'transactionPage':
        navigate('/transaction')
        break
      case 'transactionHistoryReport':
        navigate('/transaction/historyReport')
        break
      case 'userPage':
        navigate('/user')
        break
      case 'donorPage':
        navigate('/donor')
        break
      case 'logout':
        service.api.user.logout()
        service.reactStore.update((store) => {
          store.user = null
        })
        navigate('/')
        break
    }
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
          onClick={handleOnClickMenus}
          items={items}
        />
      </div>

      <div className="menu-item-2" key={13}>
        <Divider />
        <Menu
          defaultSelectedKeys={[selectedKey]}
          mode="inline"
          theme="light"
          onClick={handleOnClickMenus}
          items={[logoutItem]}
        />
      </div>
    </div>
  )
}

export default SideMenu
