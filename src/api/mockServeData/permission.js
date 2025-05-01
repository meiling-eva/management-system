import Mock from 'mockjs'
export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        // whether the user exist or not
        // whether account and password match
        if (username === 'admin' && password === 'admin') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: 'Home',
                            icon: 'HomeOutlined',
                            url: 'home/index'
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
                            label: 'Users',
                            icon: 'UserOutlined',
                            url: 'User/index'
                        },
                        {
                            label: 'Othrs',
                            icon: 'location',
                            children: [
                                {
                                    path: '/page1',
                                    name: 'page1',
                                    label: 'Page One',
                                    icon: 'SettingOutlined',
                                    url: 'other/pageOne.vue'
                                },
                                {
                                    path: '/page2',
                                    name: 'page2',
                                    label: 'Page Two',
                                    icon: 'SettingOutlined',
                                    url: 'other/pageTwo.vue'
                                }
                            ]
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: 'Success Login'
                }
            }
        } else if (username === 'xiao' && password === 'xiao') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/',
                            name: 'home',
                            label: 'Home',
                            icon: 'HomeOutlined',
                            url: 'home/index'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: 'Mall',
                            icon: 'ShopOutlined',
                            url: '/mall/index'
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: 'Success Login'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: 'Wrong Password'
                }
            }
        }

    }
}