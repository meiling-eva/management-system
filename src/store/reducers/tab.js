import { createSlice } from '@reduxjs/toolkit'

const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        isCollapse: false,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label:'Home'
            }
        ],
        currentMenu: {}
    },
    reducers: {
        collapseMenu: state => {
            state.isCollapse = !state.isCollapse
        },
        selectMenuList: (state, { payload: val }) => {
            //debugger
            if (val.name === 'home' && state.tabsList.length === 0){
                state.currentMenu = val
            }
            else{
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name)
                //if tab not in the list, push the tab to the list
                if (result === -1) {
                    state.tabsList.push(val)
                    console.log(state.tabsList, 'selectMenuList')
                }
            }
            //else if (val.name === 'home' && state.tabsList.length === 1) {
            //    state.currentMenu = {}
            //}
        },
        setCurrentMenu: (state, { payload: val }) => {
            if (val.name === 'home') {
                state.currentMenu = {}
            } else {
                state.currentMenu = val
            }
        },
        closeTab: (state, { payload: val }) => {
            let res = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(res, 1)
        }
    }
})

export const { collapseMenu, selectMenuList, setCurrentMenu, closeTab } = tabSlice.actions
export default tabSlice.reducer