import React from 'react';
import MenuConfig from '../../config'
import * as Icon from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { selectMenuList } from '../../store/reducers/tab'

const { Sider } = Layout;
const iconToElement = (name) => React.createElement(Icon[name])

const items = MenuConfig.map((icons) => {
    const child = {
        key: icons.path,
        icon: iconToElement(icons.icon),
        label: icons.label
    }

    if (icons.children) {
        child.children = icons.children.map(item =>{
            return {
                key: item.path,
                label: item.label
            }
        })
    }
    return child;
})

const CommonAside = ({ collapsed }) => {
    const navigate = useNavigate()
    const appName = collapsed ? 'ATZ' : 'ATZ System'
    const dispatch = useDispatch()

    const setTabsList = (val) => {
        dispatch(selectMenuList(val))
    }

    //click menu
    const selectMenu = (e) => {
        console.log(e)
        navigate(e.key)
        let data
        //debugger;
        MenuConfig.forEach((item) => {
            if (item.path === e.keyPath[e.keyPath.length - 1]) {
                data = item
                if (e.keyPath.length > 1) {
                    data = item.children.find((child) => {
                        return child.path === e.key
                    })
                }
            }
        })
        setTabsList({
            path: data.path,
            name: data.name,
            label: data.label
        })
    }

    return (
        <Sider width={200} collapsed={collapsed}>
            
            <h3 className="app-name" >{appName}</h3>
            <Menu
                theme="dark"
                mode="inline"
                items={items}
                style={{
                    height: '100vh',
                    borderRight: 0,
                }}
                onClick={selectMenu}
            />
        </Sider >
    )
}

export default CommonAside;