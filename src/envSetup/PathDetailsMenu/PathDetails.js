import React, { Component } from 'react';
import history from "../../History";
import PathService from "../../service/PathService";
import {  EditFilled , DeleteFilled , PlusCircleFilled , SearchOutlined} from '@ant-design/icons';
import { Table, Button,Space } from 'antd';
import 'antd/dist/antd.css';
import '../../styling/Styletable.css';
import { Form, Input, Radio, Popconfirm, Breadcrumb } from 'antd';

// const {Title} = Typography;


class PathDetails extends Component{
    constructor(props) {
        super(props)
        this.state = {
            pathdetails: [],
            searchText: '',
            searchedColumn: '',
        filteredInfo: null,
            sortedInfo: null,
            message: null,
             columns : [
                {
                  title: 'Path ID',
                  dataIndex: 'path_id',
                  key: 'path_id',
                  width:100,
                  ...this.getColumnSearchProps('path_id'),
                  sorter: (a, b) => a.path_id - b.path_id,
                //   sortOrder: sortedInfo.columnKey === 'path_id' && sortedInfo.order,
                  ellipsis: true,
                },
                {
                  title: 'Path Name',
                  dataIndex: 'path_name',
                  key: 'path_name',
                  width:250,
                  ...this.getColumnSearchProps('path_name'),
                  sorter: (a, b) => a.path_name.localeCompare(b.path_name),
                //   sortOrder: sortedInfo.columnKey === 'path_name' && sortedInfo.order,
                  ellipsis: true,
                },
                {
                  title:'Oc Compliance Flag',
                  dataIndex: 'oc_compliance_flag',
                  key:'oc_compliance_flag',
                  width:170,
                  filters:[
                    {text:'Enabled',value:"0"},
                    {text:'Disabled',value:"1"},
                ], 
                  render: oc_compliance_flag => this.mapoc_compliance_flag(oc_compliance_flag),
                //   filteredValue: filteredInfo.oc_compliance_flag || null,
                  onFilter: (value, record) => record.oc_compliance_flag===value,
                },
                {
                  title: 'Interface Type',
                  dataIndex: 'interface_type',
                  key: 'interface_type',
                  width:200,
                  filters:[
                    {text:'SS7',value:"SS7"},
                    {text:'SMPP',value:"SMPP"},
                    {text:'SMPP ES',value:"SMPP ES"},
                ], 
                //   render: interface_type => this.maplcrtype(interface_type),
                //   filteredValue: filteredInfo.interface_type || null,
                  onFilter: (value, record) => record.interface_type===value,
                },
                {
                    title:'Supplier',
                    dataIndex:'supplier',
                    key:'supplier'
                },
                {
                  title:'Billing Logic',
                  dataIndex:'billing_logic',
                  key:'billing_logic'
              },
                {
                    title: 'Edit',
                    dataIndex: 'edit',
                    key: 'key',
                    width:50,
                    render: (text, record) => <EditFilled 
                    onClick={() => { this.editPath(record.path_id);}}/>,
                  },
                  {
                    title: 'Delete',
                    dataIndex: 'delete',
                    key: 'delete',
                    width:70,
                    render: (text, record) =>
                    <Popconfirm
                      title="Are you sure delete this entry?"
                      onConfirm={this.deletePath.bind(this,record.path_id)}
                      onCancel={this.cancel}
                      okText="Yes"
                      cancelText="No"
                    ><DeleteFilled 
                    />
                    </Popconfirm> ,
                  },
                  // {
                  //   title: 'Export',
                  //   dataIndex: 'export',
                  // },
              ]
      
        }
        // this.deleteUser = this.deleteUser.bind(this);
        this.editPath = this.editPath.bind(this);
        this.addPath = this.addPath.bind(this);
        this.reloadPath = this.reloadPath.bind(this);
    }

    componentDidMount() {
        this.reloadPath();
    }

    reloadPath() {
        PathService.fetchPathdetails()
            .then((res) => {
                this.setState({pathdetails: res.data.result})
            });
    }

    deletePath(pathId) {
        PathService.deletePath(pathId)
           .then(res => {
               this.setState({message : 'User deleted successfully.'});
               this.setState({pathdetails: this.state.pathdetails.filter(path_data =>
                 path_data.path_id !== pathId)});
           })
    }

    cancel(){
        history.push('/environmentSetup-pathDetails')
      }

    editPath(path_id) {
        window.localStorage.setItem("pathId", path_id);
        history.push('/add-pathDetails');
    }

    addPath() {
        window.localStorage.removeItem("pathId");
        history.push('/add-pathDetails');
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

    mapoc_compliance_flag = (oc_compliance_flag) => {
        switch(oc_compliance_flag){
            case 0: oc_compliance_flag="Disabled"
            break;
            case 1: oc_compliance_flag="Enabled"
            break;
        }
        return oc_compliance_flag;
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
    let {
        sortedInfo, filteredInfo} = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
 
      

       return(
        <div>
        <div className='topline'>Path Details</div>
        <div className="setcrumb">

        <Breadcrumb.Item> Environment Setup </Breadcrumb.Item>
                <Breadcrumb.Item key="pathDetails">
                    Path Details
                </Breadcrumb.Item> 
        </div>
        <Form className='formset' >
            <Form.Item> 
                <div className="highlight">
                <Button type="primary" onClick={() => this.addPath()}>Add
                </Button>
                </div>
            </Form.Item>
            <center>
            <Form.Item>
                <Table
                    columns={columns} 
                    dataSource={this.state.pathdetails} 
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

export default PathDetails;