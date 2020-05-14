import React, { Component } from 'react';
import { Button , Form,Table,Popconfirm,Space,Input} from 'antd';
import history from "../../History"
import CreditService from "../../service/CreditService"
import {  EditFilled , SearchOutlined,  DeleteFilled } from '@ant-design/icons';
import {NavLink} from "react-router-dom"
import {Breadcrumb} from "antd";
class CustomerProfile extends Component{

    constructor(props) {
        super(props)
        this.state = {
            pcd: [],
            message: null,
            searchText: '',
            searchedColumn: '',
            filteredInfo: null,
            sortedInfo: null,
            columns :[
                {
                    title: 'S.No',
                    dataIndex: 0,
                    key: 0,
                    width:110,
                    ...this.getColumnSearchProps(0),
                    sorter: (a, b) => a[0]- b[0],
                    ellipsis: true,
                },
                {
                    title: 'Customer Name',
                    dataIndex: 1,
                    key: 1,
                    width:110,
                    ...this.getColumnSearchProps(1),
                    
                    ellipsis: true,

                },
                {
                    title: 'Profile Id',
                    dataIndex: 0,
                    key: 0,
                    width:110,
                    ...this.getColumnSearchProps(0),
                    sorter: (a, b) => a[0]- b[0],
                    ellipsis: true,

                },
                {
                    title: 'Status',
                    dataIndex: 2,
                    key: 2,
                    width:110,
                    render :key =>this.mapstatus(key),
                    filters: [
                        { text: 'BLOCKED', value: 0 },
                        { text:  'LIVE' ,value:1},
                        { text: 'NON LIVE', value: 2 },
                        { text: 'DUMMY', value:3 },
                        ],
                  
                    onFilter: (value, record) => record[2]===value,
                    ellipsis: true,

                },
                {
                    title: 'Edit',
                    dataIndex: 'edit',
                    key: 'edit',
                    width:40,
                    render: (text,record) => <EditFilled onClick={() => this.editCustomer(record[0])} />,
                },
                {
                    title: 'Delete',
                    dataIndex: 'delete',
                    key: 'delete',
                    width:50,
                    render: (text,record) =>  <Popconfirm
                    title="Are you sure delete this row?"
                    onConfirm={this.deleteCustomer.bind(this,record[0])}
                    okText="Yes"
                    cancelText="No">
                    <DeleteFilled/></Popconfirm>
                }

            ]
            }
            this.editCustomer = this.editCustomer.bind(this);
            this.addCustomer = this.addCustomer.bind(this);
            this.reloadProfileList = this.reloadProfileList.bind(this);
            this.mapstatus=this.mapstatus.bind(this);
        
    }

    componentDidMount(){
        this.reloadProfileList();
    }
    reloadProfileList() {
        CreditService.fetchProfiledetails()
            .then((res) => {
                this.setState({profile: res.data.result})
            });
            
      }
    addCustomer(){
        window.localStorage.removeItem("profile_id");
        history.push('/add-customer');
    }
    deleteCustomer(profile_id) {
        
        CreditService.deleteProfile(profile_id)
            .then(res => {
                this.setState({message : 'Profile deleted successfully.'});
                this.setState({profile: this.state.profile.filter(profile => profile[0] !==profile_id )});
        })
    }
      
  
    editCustomer(profile_id) {
        window.localStorage.setItem("profile_id", profile_id);
        history.push('/add-customer');
          
    }
    mapstatus=(key)=>{
        switch(key){
            case 0:key="BLOCKED";break;
            case 1:key="LIVE";break;
            case 2:key="NOT LIVE";break;
            case 3:key="DUMMY";
        }
        return key;
    }
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
      });
    };
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
          let { sortedInfo,filteredInfo} = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo=filteredInfo || {};
        return(
            <div>
            <div className='topline'>Customer Credit Profile Details</div> 
            <div className="setcrumb">
            <Breadcrumb.Item> Environment Setup </Breadcrumb.Item>
                <Breadcrumb.Item key="customerProfile">
                    <NavLink to="/environmentSetup-customerprofile">Customer Credit Profile</NavLink>
                </Breadcrumb.Item>  </div>
              <Form className="formset">
             
                <center>
            <Form.Item>
               <Button type="primary" onClick={() => this.addCustomer()}>Add
                </Button>
                
                </Form.Item>
                <Form.Item>
               <Table
                    columns={columns} 
                    dataSource={this.state.profile} 
                    id="students"
                    bordered 
                    //onChange={this.handleChange} 
                    size="small" 
                    style={{width:700}}
             />
             </Form.Item>
             </center>
             
             </Form>
          </div>
          
        )
    }
}

export default CustomerProfile;
