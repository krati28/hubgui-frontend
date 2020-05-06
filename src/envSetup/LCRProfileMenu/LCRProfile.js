import React, { Component } from 'react';
import history from "../../History";
import LcrApiService from "../../service/LcrApiService";
import {  EditFilled , DeleteFilled , PlusCircleFilled } from '@ant-design/icons';
import { Table, Button } from 'antd';
import 'antd/dist/antd.css';
import '../../styling/Styletable.css';
import { Form, Input, Radio, Popconfirm } from 'antd';

const { Search } = Input;

class LCRProfile extends Component{
    constructor(props) {
        super(props)
        this.state = {
            lcrdetails: [],
            sortedInfo: null,
            filteredInfo: null,
            message: null
        }
        // this.deleteLcr = this.deleteLcr.bind(this);
        this.editLcr = this.editLcr.bind(this);
        this.addLcr = this.addLcr.bind(this);
        this.reloadLcr = this.reloadLcr.bind(this);
    }
    
    componentDidMount() {
        this.reloadLcr();
    }

    reloadLcr() {
        LcrApiService.fetchLcrdetails()
            .then((res) => {
                this.setState({lcrdetails: res.data.result})
            });
    }

    deleteLcr(lcrId) {
      // var result=window.confirm("Do you want to delete ?");
      //   if(result==true){
        LcrApiService.deleteLcr(lcrId)
           .then(res => {
               this.setState({message : 'User deleted successfully.'});
               this.setState({lcrdetails: this.state.lcrdetails.filter(
                 lcr_data => lcr_data.lcr_policy_id !== lcrId)});
           })
        // }
        // else if(result==false){
        //   window.location.reload(false);
        // }
    }

    cancel(){
      history.push('/environmentSetup-lcrProfile')
    }
    editLcr(lcr_policy_id) {
        window.localStorage.setItem("lcrId", lcr_policy_id);
        history.push('/add-lcrProfile');
    }

    addLcr() {
        window.localStorage.removeItem("lcrId");
      history.push('/add-lcrProfile');
    }
    
    handleChange = (pagination, filters, sorter) => {
      console.log('Various parameters', pagination, filters, sorter);
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

    maplcrtype = (lcr_type) => {
      switch(lcr_type){
          case "0": lcr_type="Default LCR"
          break;
          case "1": lcr_type="SC_MT"
          break;
          case "3": lcr_type="SPEC LCR"
          break;
          case "4": lcr_type="Time Based LCR"
          break;
      }
      return lcr_type;
    }

    render(){
        let {
          sortedInfo, filteredInfo} = this.state;
          sortedInfo = sortedInfo || {};
          filteredInfo = filteredInfo || {};
   
        const columns = [
            {
              title: 'LCR ID',
              dataIndex: 'lcr_policy_id',
              key: 'lcr_policy_id',
              sorter: (a, b) => a.lcr_policy_id - b.lcr_policy_id,
              sortOrder: sortedInfo.columnKey === 'lcr_policy_id' && sortedInfo.order,
              ellipsis: true,
            },
            {
              title: 'LCR Name',
              dataIndex: 'lcr_name',
              key: 'lcr_name',
              sorter: (a, b) => a.lcr_name.localeCompare(b.lcr_name),
              sortOrder: sortedInfo.columnKey === 'lcr_name' && sortedInfo.order,
              ellipsis: true,
            },
            {
              title: 'LCR Type',
              dataIndex: 'lcr_type',
              key: 'lcr_type',
              filters:[
                {text:'Default LCR',value:"0"},
                {text:'SC_MT',value:"1"},
                {text:'SPEC_LCR',value:"3"},
                {text:'Time Based LCR',value:"4"},
            ], 
              render: lcr_type => this.maplcrtype(lcr_type),
              filteredValue: filteredInfo.lcr_type || null,
              onFilter: (value, record) => record.lcr_type===value,
            },
            {
                title: 'Edit',
                dataIndex: 'edit',
                key: 'key',
                render: (text, record) => <EditFilled 
                onClick={() => { this.editLcr(record.lcr_policy_id);}}/>,
              },
              {
                title: 'Delete',
                dataIndex: 'delete',
                key: 'delete',
                render: (text, record) =>
                <Popconfirm
                  title="Are you sure delete this entry?"
                  onConfirm={this.deleteLcr.bind(this,record.lcr_policy_id)}
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
          ];


        return(
          <div>
            <div className='topline'>LCR List
            </div>
            <Form className="formset">
              <Form.Item>
                  <div className="highlight">
                <Button type="primary" onClick={() => this.addLcr()}>Add
                </Button>
                </div>
              </Form.Item>

              {/* <Form.Item
                label = "Search"
                name = "searchlcr">
                  <Search placeholder="input search text"
                      onSearch={value => console.log(value)}
                      style={{ width: 200 }} enterButton />
              </Form.Item>

              <Form.Item>
                <Radio.Group 
                  name="lcrtype"  
                  onChange={this.onChangeradio} 
                >
                  <Radio value={1} >Lcr Name</Radio>
                  <Radio value={2}>Lcr Id</Radio>
                </Radio.Group>
              </Form.Item> */}
              <Form.Item>
                <Table 
                  columns={columns} 
                  id="students" 
                  dataSource={this.state.lcrdetails} 
                  onChange={this.handleChange} 
                />
              </Form.Item>
            </Form>
          </div>
        );
    }
}

export default LCRProfile;