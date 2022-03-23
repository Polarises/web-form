import {
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined,
    MailOutlined,
    HomeOutlined,
    UserOutlined,
    SafetyOutlined,
    UnorderedListOutlined,
    SettingOutlined,
  } from "@ant-design/icons";
const menuConfig = [{
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的 path
        icon: <HomeOutlined/>, // 图标名称
    },
    {
        title: '表单设计',
        key: '/setting',
        icon: <SettingOutlined />
    },
    {
        title: '表单管理',
        key: '/manage',
        icon: <UnorderedListOutlined/>
    },
    {
        title: '仪表盘',
        key: '/dashboard',
        icon: <SafetyOutlined />,
    },
]

export default menuConfig
