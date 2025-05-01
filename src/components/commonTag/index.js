import React from 'react'
import { Tag, Space } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { closeTab, setCurrentMenu } from '../../store/reducers/tab'
import './index.css'

const CommonTag = () => {
    const tabsList = useSelector(state => state.tab.tabsList)
    const currentMenu = useSelector(state => state.tab.currentMenu)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //console.log(tabsList)

    const handleClose = (tag, index) => {
        //debugger
        let tagLength = tabsList.length - 1
        dispatch(closeTab(tag))
        //if close the last tag, set the front tag as the current tag
        if (index === tagLength) {
            const curTab = tabsList[index - 1]
            dispatch(setCurrentMenu(curTab))
            navigate(curTab.path)
        }
        else {
            //if not close the last tag, set the tag after as current tag
            if (tagLength > 1) {
                const nextData = tabsList[index + 1]
                dispatch(setCurrentMenu(nextData))
                navigate(nextData.path)
            }
        }
    }

    const handleChange = (tag) => {
        dispatch(setCurrentMenu(tag))
        navigate(tag.path)
    }

    const setTag = (flag, item, index) => {
        return (
            flag ?
                <Tag color="#55acee" closeIcon onClose={() => handleClose(item, index)} key={item.name}>{item.label}</Tag>
                :
                <Tag onClick={() => handleChange(item) } key={item.name}>{item.label}</Tag>
        )
    }

    return (
        <Space className="common-tag" size={[0,8]} wrap>
            {
                currentMenu.name && tabsList.map((item, index) => (setTag(item.path === currentMenu.path, item, index)))
            }
        </Space>
    )
}

export default CommonTag;