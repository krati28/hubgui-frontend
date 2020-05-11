import React, { Component } from 'react';
import history from "../../History";
import ApiService from "../../service/ApiService";
import { Table, Button } from 'antd';
import {  EditFilled , DeleteFilled , PlusCircleFilled, AlignCenterOutlined , SearchOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Form, Input, Popconfirm, Space, Breadcrumb} from 'antd';
import '../../styling/Styletable.css';
// import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

class OperatorCluster extends Component{

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            searchText: '',
            searchedColumn: '',
        filteredInfo: null,
            sortedInfo: null,
            message: null,
            columns : [
                {
                    title: 'Cluster Id',
                    dataIndex: 'cluster_id',
                    key: 'cluster_id',
                    width:100,
                    ...this.getColumnSearchProps('cluster_id'),
                    sorter: (a, b) => a.cluster_id - b.cluster_id,
                    // sortOrder: sortedInfo.columnKey === 'cluster_id' && sortedInfo.order,
                    ellipsis: true,
                },
                {
                    title: 'Cluster Name',
                    dataIndex: 'cluster_name',
                    key: 'cluster_name',
                    width:250,
                    ...this.getColumnSearchProps('cluster_name'),
                    sorter: (a, b) => a.cluster_name.localeCompare(b.cluster_name),
                    // sortOrder: sortedInfo.columnKey === 'cluster_name' && sortedInfo.order,
                    ellipsis: true,
                },
                {
                    title: 'Cluster Type',
                    dataIndex: 'cluster_type',
                    key: 'cluster_type',   
                    width:250,
                     filters:[
                        {text:'Default',value:1},
                        {text:'Roaming',value:2},
                    ],   
        
                    render :cluster_type =>this.mapclustertype(cluster_type),
                    
                    // filteredValue: filteredInfo.cluster_type || null,
                    onFilter: (value, record) => record.cluster_type===value,
                },
                {
                    title: 'Edit',
                    dataIndex: 'edit',
                    key: 'edit',
                    width:50,
                    render: (text, record) => <EditFilled 
                    onClick={() => { this.editUser(record.cluster_id);}}/>,
                },
                {
                    title: 'Delete',
                    dataIndex: 'delete',
                    key: 'delete',
                    width:50,
                    render: (text, record) => <Popconfirm
                    title="Are you sure delete this entry?"
                    onConfirm={this.deleteUser.bind(this,record.cluster_id)}
                    onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                  ><DeleteFilled 
                  />
                  </Popconfirm> ,
                }
            ]
        }
        // this.deleteUser = this.deleteUser.bind(this);
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

    cancel(){
        history.push('/environmentSetup-operatorCluster')
      }

    editUser(cluster_id) {
        window.localStorage.setItem("clusterId", cluster_id);
        history.push('/add-operatorCluster');
    }

    addUser() {
        window.localStorage.removeItem("clusterId");
        history.push('/add-operatorCluster');
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters',pagination, filters, sorter);
        this.setState({
            filteredInfo:filters,        
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

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys,
           selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
      });
    
      handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };
    
      
  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };
    
    render(){
        
    const columns = this.state.columns.map((col, index) => ({
        ...col,
        onHeaderCell: column => ({
          width: column.width,
          onResize: this.handleResize(index),
        }),
      }));
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        
        return(
            <div>
                <div className='topline'>Operator List</div>
                <div className='setcrumb'>
                    
<Breadcrumb.Item> Environment Setup </Breadcrumb.Item>
                <Breadcrumb.Item key="pathDetails">Operator Cluster
                </Breadcrumb.Item>  
                </div>
                <Form className='formset' >
                    
                    <Form.Item>
                        <div className="highlight">
                        <Button type="primary" onClick={() => this.addUser()}>Add
                        </Button>
                        </div>
                    </Form.Item>

                {/* <Form.Item 
                        label = "Search"
                        name = "search">
                            <Search placeholder="input search text"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }} enterButton />
                    </Form.Item>

                <Form.Item>
                    <Radio.Group name="type"  onChange={this.onChangeradio} >
                        <Radio value={1} >CLuster Name</Radio>
                        <Radio value={2}>Cluster Id</Radio>
                    </Radio.Group>
                    </Form.Item> */}
                    <center>
                    <Form.Item>
                        <Table
                            columns={columns} 
                            dataSource={this.state.users} 
                            id="students" 
                            bordered
                            onChange={this.handleChange} 
                            size="small"
                            style={{width:1000}} />
                    </Form.Item>
                    </center>
                </Form>
            </div>
        );
    }
}

export default OperatorCluster;
