import React, { Component } from 'react'
import MNPService from "../../service/MNPService";
import history from "../../History";
import '../../styling/Styletable.css';
import{NavLink} from "react-router-dom";
import {Breadcrumb} from "antd";
import {Table ,Button, Form,Popconfirm,Input,Space} from "antd"
//import {  EditFilled , PlusCircleFilled,  DeleteFilled,SearchOutlined } from '@ant-design/icons';
import {  EditFilled , DeleteFilled , PlusCircleFilled, AlignCenterOutlined , SearchOutlined} from '@ant-design/icons';
import { Resizable } from 'react-resizable';

class MNPdetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
        mnp: [],
        searchText: '',
        searchedColumn: '',
        filteredInfo: null,
        sortedInfo: null,
        columns : [
          {
              title: 'Gateway ID',
              dataIndex: 'mnp_id',
              key: 'mnp_id',
              width:40,
              ...this.getColumnSearchProps('mnp_id'),
              sorter: (a, b) => a.mnp_id- b.mnp_id,
              //sortOrder: sortedInfo.columnKey === 'mnp_id' && sortedInfo.order,
              ellipsis: true,
          },
          {
              title: 'Gateway Type',
              dataIndex: 'mnp_type',
              key: 'mnp_type',
              width:50,
              filters: [
                  { text: 'Redis', value: 'Redis' },
                  { text:  'Enum' ,value:'Enum'},
                  { text: 'Cache', value: 'Cache' },
                  ],
            //filteredValue: filteredInfo.mnp_type || null,
              onFilter: (value, record) => record.mnp_type.includes(value),
              sorter: (a, b) => a.mnp_type.localeCompare(b.mnp_type),
              //sortOrder: sortedInfo.columnKey === 'mnp_type' && sortedInfo.order,
              ellipsis: true,
          },
          {
              title: 'Gateway Name',
              dataIndex: 'gateway_name',
              key: 'gateway_name',
              width:50,
              ...this.getColumnSearchProps('gateway_name'),
              sorter: (a, b) => a.gateway_name.localeCompare(b.gateway_name),
                  //sortOrder: sortedInfo.columnKey === 'gateway_name' && sortedInfo.order,
                  ellipsis: true,
                  //...this.getColumnSearchProps('gateway_name'),
          },
          {
              title: 'Edit',
              dataIndex: 'edit',
              key: 'edit',
              width:30,
              render: (text,record) => <EditFilled onClick={() => this.editMNP(record.mnp_id)} />,
          },
          {
              title: 'Delete',
              dataIndex: 'delete',
              key: 'delete',
              width:30,
              render: (text,record) =>  <Popconfirm
              title="Are you sure delete this row?"
              onConfirm={this.deleteMNP.bind(this,record.mnp_id)}
              okText="Yes"
              cancelText="No">
              <DeleteFilled/></Popconfirm>
          }
        ],
        message: null
        }
        //this.deleteMNP = this.deleteMNP.bind(this);
        this.editMNP = this.editMNP.bind(this);
        this.addMNP = this.addMNP.bind(this);
        this.reloadMNPList = this.reloadMNPList.bind(this);
        this.getColumnSearchProps =this.getColumnSearchProps .bind(this);
    }

    componentDidMount() {
      this.reloadMNPList();
    }

    reloadMNPList() {
      MNPService.fetchMNPdetails()
          .then((res) => {
              this.setState({mnp: res.data.result})
          });
    }
    
    
    deleteMNP(mnp_id) {
      MNPService.deleteMNP(mnp_id)
          .then(res => {
              this.setState({message : 'MNP deleted successfully.'});
              this.setState({mnp: this.state.mnp.filter(mnp => mnp.mnp_id !==mnp_id )});
      })
    }
    

    editMNP(mnp_id) {
        window.localStorage.setItem("mnp_id", mnp_id);
        //alert(window.localStorage.getItem("mnp_id"));
        history.push('/add-mnp');
        
    }

   addMNP() {
    window.localStorage.removeItem("mnp_id");
        history.push('/add-mnp');
        
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
            <div className='topline'>MNP Gateway Details</div>
            <div className="setcrumb">
              <Breadcrumb.Item> Environment Setup </Breadcrumb.Item>
                <Breadcrumb.Item key="homenetwork">
                    <NavLink to="/environmentSetup-homenetwork">Home Network</NavLink>
                </Breadcrumb.Item>  
                <Breadcrumb.Item>MNP Gateway Details</Breadcrumb.Item></div>
              <Form className="formset">
                <center>
                  <Form.Item>
               <Button type="primary" onClick={() => this.addMNP()}>Add
                </Button>
                
                </Form.Item>
                
                <Form.Item>
               <Table
                    columns={columns} 
                    dataSource={this.state.mnp} 
                    id="students"
                    bordered 
                    onChange={this.handleChange} 
                    size="small" 
                    style={{width:700}}
             />
             </Form.Item>
             </center>
             </Form>
          </div>
        );
    }
}

export default MNPdetails;

