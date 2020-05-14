import React, { Component } from 'react'
import PCDService from "../../service/PCDService";
import history from "../../History"
import{NavLink} from "react-router-dom";
import {Breadcrumb} from "antd";
//import '../../Styling/Styletable.css';
import {Table ,Button, Form, Popconfirm,Input,Space} from "antd"
import {  EditFilled , PlusCircleFilled,  DeleteFilled,SearchOutlined } from '@ant-design/icons';

//const npvalue={0:"Unknown","1":"ISDN","2":"Telephony"}

class Pcddetails extends Component {

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
                    title: 'Point Code',
                    dataIndex: 'point_code',
                    key: 'point_code',
                    width:110,
                    ...this.getColumnSearchProps('point_code'),
                    sorter: (a, b) => a.point_code- b.point_code,
                    //sortOrder: sortedInfo.columnKey === 'point_code' && sortedInfo.order,
                    ellipsis: true,
                },
                {
                    title: 'Operator Name',
                    dataIndex: 'operator_name',
                    key: 'operator_name',
                    width:130,
                    ...this.getColumnSearchProps('operator_name'),
                    sorter: (a, b) => a.operator_name.localeCompare(b.operator_name),
                        //sortOrder: sortedInfo.columnKey === 'operator_name' && sortedInfo.order,
                        ellipsis: true,
                },
                {
                    title: 'Operator Country',
                    dataIndex: 'operator_country',
                    key: 'operator_country',
                    width:150,
                    ...this.getColumnSearchProps('operator_country'),
                    sorter: (a, b) => a.operator_country.localeCompare(b.operator_country),
                        //sortOrder: sortedInfo.columnKey === 'operator_country' && sortedInfo.order,
                        ellipsis: true,
                },
                {
                    title: 'SAP Id',
                    dataIndex: 'sap_id',
                    key: 'sap_id',
                    width:70,
                    sorter: (a, b) => a.sap_id- b.sap_id,
                    //sortOrder: sortedInfo.columnKey === 'sap_id' && sortedInfo.order,
                    ellipsis: true,
                },
                {
                    title: 'TT',
                    dataIndex: 'tt',
                    key: 'tt',
                    width:60,
                    sorter: (a, b) => a.tt- b.tt,
                    //sortOrder: sortedInfo.columnKey === 'tt' && sortedInfo.order,
                    ellipsis: true,
                },  
                {
                    title: 'NP',
                    dataIndex:'np',
                    key: 'np',
                    width:90,
                    render :np =>this.mapnp(np),
                },
                
                {
                    title: 'SSN',
                    dataIndex: 'ssn',
                    key: 'ssn',
                    width:60,
                    // ...this.getColumnSearchProps('ssn'),
                    filters:[
                        {text:'HLR',value:6},
                        {text:'VLR',value:7},
                        {text:'MSC',value:8},
                        {text:'FNR',value:253},
                    ],
                    render :ssn =>this.mapssn(ssn),
                    //filteredValue: filteredInfo.ssn || null,
                    onFilter: (value, record) => record.ssn===value,
                } ,
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    width:70,
                    filters:[
                        {text:'Active',value:'A'},
                        {text:'Inactive',value:'I'},
                    ],   
                    //filteredValue: filteredInfo.status || null,
                    onFilter: (value, record) => record.status.includes(value),
                },
                {
                    title: 'Delay',
                    dataIndex: 'delay',
                    key: 'delay',
                    width:60,   
                },
                {
                    title: 'Edit',
                    dataIndex: 'edit',
                    key: 'edit',
                    width:50,
                    render: (text,record) => <EditFilled onClick={() => this.editPcd(record.ptcode_id)} />,
                },
                {
                    title: 'Delete',
                    dataIndex: 'delete',
                    key: 'delete',
                    width:70,
                    render: (text,record) => <Popconfirm
                    title="Are you sure delete this row?"
                    onConfirm={this.deletePcd.bind(this,record.ptcode_id)}
                    okText="Yes"
                    cancelText="No">
                    <DeleteFilled/></Popconfirm>,
                }
            ]
        }
        //this.deletePcd = this.deletePcd.bind(this);
        this.editPcd = this.editPcd.bind(this);
        this.addPcd = this.addPcd.bind(this);
        this.reloadPcdList = this.reloadPcdList.bind(this);
        this.mapnp=this.mapnp.bind(this);
        this.mapssn=this.mapssn.bind(this);
    }

    componentDidMount() {
        this.reloadPcdList();
    }

  
    reloadPcdList() {
        PCDService.fetchPcddetails()
            .then((res) => {
                this.setState({pcd: res.data.result})
            });
    }
    
    
    deletePcd(ptcode_id) {
        
        PCDService.deletePcd(ptcode_id)
           .then(res => {
               this.setState({message : 'Pcd deleted successfully.'});
               this.setState({pcd: this.state.pcd.filter(pcd => pcd.ptcode_id !==ptcode_id )});
           })}
    

    editPcd(ptcode_id) {
        window.localStorage.setItem("ptcode_id", ptcode_id);
        history.push('/add-pcd');
        
    }

   addPcd() {
        window.localStorage.removeItem("ptcode_id");
        history.push('/add-pcd');
        
    }
    // state = {
    //     filteredInfo: null,
    //     sortedInfo: null,
    // };
    
      handleChange = (pagination, filters, sorter) => {
      console.log('Various parameters', pagination, filters, sorter);
      this.setState({
          filteredInfo:filters,
          sortedInfo: sorter,
      });
    };

      mapnp=(np) =>{
          switch(np){
              case 0:np="Unkown";break;
              case 1:np="ISDN";break;
              case 2:np="Telephony(E.164,E.163)";break;
              case 3:np="Data(X.121)";break;
              case 4:np="Telex(F.69)";break;
              case 5:np="Maritime Mobile";break;
              case 6:np="Land Mobile";break;
              case 7:np="Private";break;
              case 13:np="ANSI SS7 PC and SSN";break;
              case 14:np="Internet(IP)";break;
              case 15:np="Extension";
          }
          return np;
      }
      mapssn=(ssn)=>{
          switch(ssn){
              case 6:ssn="HLR";break;
              case 7:ssn="VLR";break;
              case 8:ssn="MSC";break;
              case 253:ssn="FNR";
          }
          return ssn;
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
        let { sortedInfo,filteredInfo} = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        
       return(
            <div  >
                
              <div className='topline'>Point Code Details</div>
              <div className="setcrumb">
                <Breadcrumb.Item> Environment Setup </Breadcrumb.Item>
                <Breadcrumb.Item key="homenetwork">
                    <NavLink to="/environmentSetup-homenetwork">Home Network</NavLink>
                </Breadcrumb.Item>  
                <Breadcrumb.Item>Point Code Details</Breadcrumb.Item>
                </div>
                <Form className="formset">
                
                <center>
                    <Form.Item>
                    <Button  type="primary" onClick={() => this.addPcd()}>Add
                        </Button>
                        
                        </Form.Item>
                        
                        <Form.Item >
                    
                        <Table
                        columns={columns} 
                        dataSource={this.state.pcd} 
                        id="students"
                        bordered 
                        size="small" 
                        style={{width:1100}}
                        onChange={this.handleChange}  />
                    </Form.Item>
                    </center>
                </Form>
          </div>
        );
    }
}

export default Pcddetails;

