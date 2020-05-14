import React, { Component } from 'react';
import { Button, Form, Table, Popconfirm, Breadcrumb, Input, Space} from 'antd';
import {  EditFilled , DeleteFilled, SearchOutlined} from '@ant-design/icons';
import history from '../../History';
import '../../styling/Styletable.css';
import DealService from '../../service/DealService';

class DealManagement extends Component{

    constructor(){
        super();
        this.state={
            deals:[],
            message:null,
            searchText: '',
            searchedColumn: '',
            filteredInfo: null,
            sortedInfo: null,

            columns : [
                {
                    title: 'Deal Id',
                    dataIndex: 'id',
                    key: 'id',
                    width:80,
                    sorter: (a,b) => a.id - b.id,
                    ...this.getColumnSearchProps('id'),
                    ellipsis: true,
                },
                {
                    title: 'Deal Name',
                    dataIndex: 'name',
                    key: 'name',
                    width:150,
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    ...this.getColumnSearchProps('name'),
                    ellipsis: true,
                },
                {
                    title: 'Deal Rate',
                    dataIndex: 'rate',
                    key: 'rate',
                    width:80,
                    sorter: (a, b) => a.rate.localeCompare(b.rate),
                    ellipsis: true,
                },
                {
                    title: 'Deal Type',
                    dataIndex: 'type',
                    key: 'type',
                    width:170,
                    filters:[
                        {text:"Customer",value:2},
                        {text:"Supplier", value:3},
                        {text:"Source Operator", value:4},
                        {text:"Source Country", value:5},
                        {text:"Customer and Destination Country",value:6},
                        {text:"Customer and Destination Operator", value:7},
                        {text:"Supplier and Destination Country", value:8},
                        {text:"Supplier and Destination Operator", value:9}
                    ],
                    onFilter: (value, record) => record.options===value,
                    render: type => this.mapDealtype(type),
                    ellipsis: true,
                },
                {
                    title: 'Deal Option',
                    dataIndex: 'options',
                    key: 'options',
                    width:130,
                    filters:[
                        {text:"Revenue Based",value:1},
                        {text:"Cost Based",value:2},
                        {text:"Volume Based", value:3}
                    ], 
                    onFilter: (value, record) => record.options===value,
                    render: options => this.mapDealOption(options),
                        ellipsis: true,
                },
                {
                    title: 'Edit',
                    dataIndex: 'edit',
                    key: 'edit',
                    width:50,
                    render: (text,record) => <EditFilled onClick={() => this.editDeal(record.id)}/>, 
                },
                {
                    title: 'Delete',
                    dataIndex: 'delete',
                    key: 'delete',
                    width:70,
                    render: (text, record) => 
                        <Popconfirm
                            title="Are you sure delete this entry?"
                            onConfirm = {this.deleteDeal.bind(this,record.id) }
                            okText="Yes"
                            cancelText="No"
                        >
                            <DeleteFilled/> 
                        </Popconfirm>,
                }
            ]
        }
        this.reloadDealList = this.reloadDealList.bind(this);
        this.editDeal = this.editDeal.bind(this);
        this.addDeal = this.addDeal.bind(this);
        this.mapDealtype = this.mapDealtype.bind(this);
        this.mapDealOption = this.mapDealOption.bind(this);
    }

    componentDidMount() {
        this.reloadDealList();
    }

    reloadDealList() {
        DealService.fetchDeals()
            .then((res) => {
                this.setState({deals: res.data.result})
            })
    };

    deleteDeal(dealId){
        DealService.deleteDeal(dealId)
            .then(res => {
                this.setState({message : 'User deleted successfully'});
                this.setState({deals: this.state.deals.filter(dd => dd.id!== dealId)});
            })
    }

    editDeal(id){
        window.localStorage.setItem("id",id);
        history.push('/add-deal');
    }
    
    addDeal(){
        window.localStorage.removeItem("id");
        this.props.history.push('/add-deal');
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
            
    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };

    clearAll = () => {
        this.setState({
            sortedInfo: null,
        });
    };

    mapDealtype = (dealtype) =>{
        switch(dealtype){
            case 1: dealtype="Customer"; 
                break;
            case 3: dealtype="Supplier";
                break;
            case 4: dealtype="Source Operator"; 
                break;
            case 5: dealtype="Source Country"; 
                break;
            case 6: dealtype="Customer and Destination Country"; 
                break;
            case 7: dealtype="Customer and Destination Operator";  
                break;
            case 8: dealtype="Supplier and Destination Country"; 
                break;
            case 9: dealtype="Supplier and Destination Operator"; 
                break;
            default: dealtype="Default"
                break;
        }
        return dealtype;
    }

    mapDealOption = (option) =>{
        switch(option){
            case 1: option="Revenue Based";
                break;
            case 2: option="Cost Based";
                break;
            case 3: option="Volume Based";
                break;
        }
        return option;
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

        let {sortedInfo} =this.state;
        sortedInfo = sortedInfo || {};
        
        
        return(
            <div>
                <div className='topline'>
                    Deal Management
                </div>
                
                <div className="setcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item>Environment Setup</Breadcrumb.Item>
                        <Breadcrumb.Item>Deal Management</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                
                <Form className="formset" >
                <center>
                    <Form.Item>
                            <Button type="primary" onClick={() => this.addDeal()}> 
                                Add 
                            </Button>
                    </Form.Item>
                    
                    <Form.Item>
                        <Table 
                            columns={columns}
                            dataSource={this.state.deals}
                            bordered
                            id="students"
                            size="small"
                            style={{width:1050}}
                            onChange={this.handleChange}
                        />
                    </Form.Item>  
                    </center>  
                </Form>
            </div>
        )
    }
}

export default DealManagement;

