import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Table, Popconfirm, message, Modal, InputNumber, Select, DatePicker } from 'antd'
import './user.css'
import { getUser, addUser, editUser, deleteUser } from '../../api'
import dayjs from 'dayjs'

const User = () => {
    const [listData, setListData] = useState({
        name: ""
    })

    const [tableData, setTableData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState(0)
    const [form] = Form.useForm()
    //const [searchForm] = Form.useForm() 

    //get user list to fill the table
    const getTableData = () => {
        getUser(listData).then(({ data }) => {
            setTableData(data.list)
        })
    }

    useEffect(() => {
        getTableData();
    }, [])

    //add or edit new user
    const handleClick = (type, rowData) => {
        setIsModalOpen(!isModalOpen)
        if (type == 'add') {
            setModalType(0)
        } else {
            setModalType(1)
            //fill the form
            const cloneData = JSON.parse(JSON.stringify(rowData)) //deep copy, no effect on original data
            cloneData.birth = dayjs(cloneData.birth)
            form.setFieldsValue(cloneData)
        }
    }

    //search
    const handleSearch = (val) => {
        console.log(val, val.searchValue)
        setListData({
            name: val.searchValue
        })
        console.log(listData)
    }

    useEffect(() => {
        getTableData()
    }, [listData])

    //delete the user
    const handleDeleteUser = ({ id }) => {
        deleteUser({ id }).then(() => {
            getTableData()
        })
    }

    const cancel = (e) => {
       // console.log(e);
        message.error('Click on No');
    }

    const handleModalOk = () => {
        form.validateFields().then((val) => {
            val.birth = dayjs(val.birth).format('YYYY-MM-DD')
            //console.log(val, 'val')
            if (modalType) { //modalType==1 edit
                editUser(val).then(() => {
                    handleModalCancel()
                    getTableData()
                })
            } else { //modalType == 0 add
                addUser(val).then(() => {
                    handleModalCancel()
                    getTableData()
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleModalCancel = () => {
        setIsModalOpen(false)
        form.resetFields()
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Age',
            dataIndex: 'age'
        },
        {
            title: 'Sex',
            dataIndex: 'sex',
            render: (val) => {
                return val ? 'Male' : 'Female'
            }
        },
        {
            title: 'Day of Birth',
            dataIndex: 'birth'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Edit/Delete',
            render: (rowData) => {
                return (
                    <div className='editButton'>
                        <Button style={{ marginRight: '5px' }} onClick={() => handleClick('Edit', rowData)}>Edit</Button>
                        <Popconfirm
                            title="Delete the user"
                            description="Are you sure to delete this user?"
                            onConfirm={() => handleDeleteUser(rowData)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" danger>Delete</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]

    return (
        <div className="user">
            <div className="flexbox">
                <Button type="primary" onClick={() => handleClick('add')}>Add User</Button>
                <Form
                   // form={searchForm}
                    layout='inline'
                    onFinish={handleSearch}
                >
                    <Form.Item name="searchValue">
                        <Input placeholder="Please input user name"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="Submit" type="primary">Search</Button>
                    </Form.Item>
                </Form>
            </div>
            <Table className="userTable" columns={columns} dataSource={tableData} rowKey={'id'}>
            </Table>
            <Modal
                open={isModalOpen}
                title={modalType ? 'Edit' : 'Add'}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form
                    form={form}
                    labelCol={{
                        span: 6
                    }}
                    wrapperCol={{
                        span: 18
                    }}
                    labelAlign='left'
                >
                    {modalType == 1 &&
                        <Form.Item
                            name='id'
                            hidden
                        >
                            <Input></Input>
                        </Form.Item>
                    }
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message:"Please Input Name"
                            }]
                        }
                    >
                        <Input placeholder='Please Input Name' />
                    </Form.Item>
                    <Form.Item
                        label="Age"
                        name="age"
                        rules={
                            [
                                {
                                    required: true,
                                    message: 'Please Input Age'
                                },
                                {
                                    type: 'number',
                                    message: 'Age must be number'
                                }
                            ]
                        }
                    >
                        <InputNumber placeholder="Please Input Age" />
                    </Form.Item>
                    <Form.Item
                        label="Sex"
                        name="sex"
                        rules={[
                            {
                                required: true,
                                message: "Please Select Sex"
                            }]
                        }
                    >
                        <Select
                            placeholder='Please Select Sex'
                            options={[
                                { value: 0, label: 'Female' },
                                { value: 1, label: 'Male' }
                            ] }
                        ></Select>
                    </Form.Item>
                    <Form.Item
                        label="Day of Birth"
                        name="birth"
                        rules={[
                            {
                                required: true,
                                message: "Please Select Day of Birth"
                            }]
                        }
                    >
                        <DatePicker
                            placeholder='Please Select Day of Birth'
                            format=''
                         >
                        </DatePicker>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please Input Email"
                            }]
                        }
                    >
                        <Input placeholder='Please Input Email' />
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    )
}

export default User;