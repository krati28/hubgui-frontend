import React, { Component } from 'react';
import history from "../../History";
// import {Button} from "react-bootstrap";
import ApiService from "../../service/ApiService";
import { Table, Button } from 'antd';
import {  EditFilled , DeleteFilled , PlusCircleFilled, AlignCenterOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Form, Input, Radio } from 'antd';
import '../../styling/Styletable.css';

const { Search } = Input;

class OperatorCluster extends Component{

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        ApiService.fetchUsers()
            .then((res) => {
                this.setState({users: res.data.result})
            });
    }

    deleteUser(clusterId) {
        ApiService.deleteUser(clusterId)
           .then(res => {
               this.setState({message : 'User deleted successfully.'});
               this.setState({users: this.state.users.filter(user => user.cluster_id !== clusterId)});
           })

    }

    editUser(cluster_id) {
        window.localStorage.setItem("clusterId", cluster_id);
        // alert(window.localStorage.getItem("clusterId"));
        history.push('/add-operatorCluster');
    }

    addUser() {
        window.localStorage.removeItem("clusterId");
        history.push('/add-operatorCluster');
    }
    
    state = {
                sortedInfo: null,
        
            };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters',pagination, filters, sorter);
        this.setState({
            sortedInfo: sorter,
        });
    };
              
    clearAll = () => {
        this.setState({
            sortedInfo: null,
        });
    };
            
    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };

    mapclustertype = (cluster_type) =>{
        switch(cluster_type){
            case 1 : cluster_type="Default"
            break;
            case 2: cluster_type="Roaming"
            break;
        }
        return cluster_type;
    }
    
    render(){
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};
        const columns = [
            {
                title: 'Cluster Id',
                dataIndex: 'cluster_id',
                key: 'cluster_id',
                sorter: (a, b) => a.cluster_id - b.cluster_id,
                sortOrder: sortedInfo.columnKey === 'cluster_id' && sortedInfo.order,
                ellipsis: true,
            },
            {
            title: 'Cluster Name',
            dataIndex: 'cluster_name',
            key: 'cluster_name',
            sorter: (a, b) => a.cluster_name.localeCompare(b.cluster_name),
                sortOrder: sortedInfo.columnKey === 'cluster_name' && sortedInfo.order,
                ellipsis: true,
            },
            {
            title: 'Cluster Type',
            dataIndex: 'cluster_type',
            key: 'cluster_type',
            
            render :cluster_type =>this.mapclustertype(cluster_type),
            },
            {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
            render: (text, record) => <EditFilled 
               onClick={() => { this.editUser(record.cluster_id);}}
            />,
            },
            {
                title: 'Delete',
                dataIndex: 'delete',
                key: 'delete',
            render: (text, record) => <DeleteFilled 
            onClick={() => { this.deleteUser(record.cluster_id); }}/>,
            }
        ];
        return(
            // <div>
            // <form>
            //     <h2>Cluster List</h2>
                
            //     <Button  icon={<PlusCircleFilled/>} onClick={() => this.addUser()}>add
            //     </Button><br /><br/>
                
            //     {/* <div>
            //         <label>Search:</label>
            //         <Search placeholder="input search text"
            //         onSearch={value => console.log(value)}
            //         style={{ width: 200 }} enterButton />
            //     </div> */}
            //     <Radio.Group name="type"  onChange={this.onChangeradio} 
            //         // value={this.state.value}
            //         >
            //             <Radio value={1} >CLuster Name</Radio>
            //             <Radio value={2}>Cluster Id</Radio>

            //         </Radio.Group>
            //     {/* <label><input type="radio" id="cluster_id" name="cluster_id" value="clusterid" />
            //             Cluster Id</label>
            //             <label><input type="radio" id="cluster_name" name="cluster_name" value="clustername" />
            //             Cluster Name</label><br /><br /> */}
            //     {/* <table className="table table-striped" id="students" >
            //         <thead>
            //             <tr>
            //                 <th className="hidden">Cluster Id</th>
            //                 <th>Cluster Name</th>
            //                 <th>Cluster Type</th>
            //                 <th>Edit</th>
            //                 <th>Delete</th>
            //             </tr>
            //         </thead>
            //         <tbody>
            //             {
            //                 this.state.users.map(
            //             user =>
            //                         <tr key={user.id}>
            //                             <td>{user.clustername}</td>
            //                             <td>{user.clustertype}</td>
            //                             <td><EditFilled onClick={() => this.editUser(user.id)}/></td>
            //                             <td><DeleteFilled onClick={() => this.deleteUser(user.id)}/></td>
            //                         </tr>
            //                 )
            //             }
            //         </tbody>
            //         </table> */}
            // </form>
            <div >
                
              <div className='topline'>Operator List</div>
            <Form className='formset' >
                <Form.Item>
                <Button  icon={<PlusCircleFilled/>} onClick={() => this.addUser()}>add
                </Button>
                </Form.Item>

                {/* <Form.Item 
                label = "Search"
                name = "search">
                    <Search placeholder="input search text"
                    onSearch={value => console.log(value)}
                   style={{ width: 200 }} enterButton />
                </Form.Item>

                <Form.Item>
                <Radio.Group name="type"  onChange={this.onChangeradio} 
                    // value={this.state.value}
                    >
                        <Radio value={1} >CLuster Name</Radio>
                        <Radio value={2}>Cluster Id</Radio>

                    </Radio.Group>
                </Form.Item> */}
            <Form.Item><Table
             columns={columns} 
             dataSource={this.state.users} 
             id="students" 
             bordered
             onChange={this.handleChange} 
             size="small"
             style={{width:1000}} /></Form.Item>
            </Form>
            
          </div>
        //    </div> 
        );
    }
}

export default OperatorCluster;
