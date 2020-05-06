import React, { Component } from 'react';
import RedirectionListService from "../../service/RedirectionListService";
import { Table,Button, Typography, Form, Popconfirm} from 'antd';
import {EditFilled, DeleteFilled} from '@ant-design/icons';

import 'antd/dist/antd.css'
import history from "../../History"
import '../../styling/Styletable.css'
 
const {Title} = Typography;

class RedirectionList extends Component{

    constructor(props){
        super(props)
        this.state = {
            users: [],
            message:null
        }
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        this.reloadUserList();
    }
    
    reloadUserList() {
        RedirectionListService.fetchUsers()
            .then((res) => {
                this.setState({users: res.data.result})
            })
    };

    deleteUser(userId){
        RedirectionListService.deleteUser(userId)
            .then(res => {
                this.setState({message : 'User deleted successfully'});
                this.setState({users: this.state.users.filter(user => user.id!== userId)});
            })
    }

    editUser(id){
        window.localStorage.setItem("id", id);
        history.push('/add-redirectionList');
    }

    addUser() {
        window.localStorage.removeItem("id");
        history.push('/add-redirectionList');
    }



    state = {
        sortedInfo: null,
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            sortedInfo: sorter,
        });
    };

    clearAll = () => {
        this.setState({
            sortedInfo: null,
        });
    };

    
    render(){

        let {sortedInfo} =this.state;
        sortedInfo = sortedInfo || {};

        const columns = [
            {
                title: 'List Id',
                dataIndex: 'id',
                key: 'id',
                sorter: (a,b) => a.id - b.id,
                sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'List Name',
                dataIndex: 'listname',
                key: 'listname',
                sorter: (a, b) => a.listname.localeCompare(b.listname),
                    sortOrder: sortedInfo.columnKey === 'listname' && sortedInfo.order,
                    ellipsis: true,
            },
            {
                title: 'List Type',
                dataIndex: 'listtype',
                key: 'listtype',
                sorter: (a, b) => a.listtype.localeCompare(b.listtype),
                    sortOrder: sortedInfo.columnKey === 'listtype' && sortedInfo.order,
                    ellipsis: true,
            },
            {
                title: 'Edit',
                dataIndex: 'edit',
                key: 'edit',
                render: (text,record) => <EditFilled onClick={() => this.editUser(record.id)}/>, 
            },
            {
                title: 'Delete',
                dataIndex: 'delete',
                key: 'delete',
                render: (text, record) =>
                <Popconfirm
                    title="Are you sure delete this entry?"
                    onConfirm = {this.deleteUser.bind(this,record.id) }
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteFilled />
                </Popconfirm>,
            }
        ];
        
        return(
            <div >
                
              <div className='topline'>Redirection List</div>
                <Form className='formset' >
                    <Form.Item>
                        <center>
                            <Button type="primary" onClick={()=>this.addUser()}> Add </Button>
                        </center>
                    </Form.Item>
                
                    <Form.Item>
                        <Table 
                            columns={columns}
                            dataSource={this.state.users}
                            bordered
                            id="students"
                            onChange={this.handleChange}
                            />
                    </Form.Item>
                </Form>
            </div>
        )
            
        
    }
}

export default RedirectionList;

