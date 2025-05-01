export default [
    {
        path: '/home',
        name: 'home',
        label: 'Home',
        icon: 'HomeOutlined',
        url: '/home/index'
    },
    {
        path: '/mall',
        name: 'mall',
        label: 'Mall',
        icon: 'ShopOutlined',
        url: '/mall/index'
    },
    {
        path: '/user',
        name: 'user',
        label: 'User',
        icon: 'UserOutlined',
        url: '/user/index'
    },
    {
        path: '/other',
        label: 'Other',
        icon: 'SettingOutlined',
        children: [
            {
                path: '/other/pageOne',
                name: 'page1',
                label: 'Page 1',
                icon: 'SettingOutlined'
            },
            {
                path: '/other/pageTwo',
                name: 'page2',
                label: 'Page 2',
                icon: 'SettingOutlined'
            }
        ]
    }
]