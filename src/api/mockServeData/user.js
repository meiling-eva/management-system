﻿import Mock from 'mockjs'

// get config.url ，post config.body 
function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

let List = []
const count = 158

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.name(),
            email: Mock.mock('@email()'),
            'age|18-60': 1,
            birth: Mock.Random.date(),
            sex: Mock.Random.integer(0, 1)
        })
    )
}

export default {
    /**
     * get user list
     * name, page, limt; name can be null, page,limit default values。
     * @param name, page, limit
     * @return {{code: number, count: number, data: *[]}}
     */
    getUserList: config => {
        const { name, page = 1, limit = 20 } = param2Obj(config.url)
        const mockList = List.filter(user => {
            if (name && user.name.indexOf(name) === -1) return false
            return true
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        }
    },
    /**
     * add new users
     * @param name, email, age, birth, sex
     * @return {{code: number, data: {message: string}}}
     */
    createUser: config => {
        const { name, email, age, birth, sex } = JSON.parse(config.body)
        List.unshift({
            id: Mock.Random.guid(),
            name: name,
            email: email,
            age: age,
            birth: birth,
            sex: sex
        })
        return {
            code: 20000,
            data: {
                message: 'Successfully Add'
            }
        }
    },
    /**
     * delete users
     * @param id
     * @return {*}
     */
    deleteUser: config => {
        const { id } = JSON.parse(config.body)
        if (!id) {
            return {
                code: -999,
                message: 'Cannot Delete the User'
            }
        } else {
            List = List.filter(u => u.id !== id)
            return {
                code: 20000,
                message: 'Successfully Delete the user'
            }
        }
    },
    /**
     * Multiple Delete
     * @param config
     * @return {{code: number, data: {message: string}}}
     */
    batchremove: config => {
        let { ids } = param2Obj(config.url)
        ids = ids.split(',')
        List = List.filter(u => !ids.includes(u.id))
        return {
            code: 20000,
            data: {
                message: 'Successfully Delete users'
            }
        }
    },
    /**
     * modify user information
     * @param id, name, addr, age, birth, sex
     * @return {{code: number, data: {message: string}}}
     */
    updateUser: config => {
        const { id, name, email, age, birth, sex } = JSON.parse(config.body)
        const sex_num = parseInt(sex)
        List.some(u => {
            if (u.id === id) {
                u.name = name
                u.email = email
                u.age = age
                u.birth = birth
                u.sex = sex_num
                return true
            }
        })
        return {
            code: 20000,
            data: {
                message: 'Successfully Update'
            }
        }
    }
}
