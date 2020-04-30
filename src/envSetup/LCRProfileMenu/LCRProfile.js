import React, { Component } from 'react';
import history from "../../History";
// import {Button} from "react-bootstrap";
import LcrApiService from "../../service/LcrApiService";
import {  EditFilled , DeleteFilled , PlusCircleFilled } from '@ant-design/icons';
import { Table, Button } from 'antd';
import 'antd/dist/antd.css';
import '../../styling/Styletable.css';
import { Form, Input, Radio } from 'antd';

const { Search } = Input;

class LCRProfile extends Component{
    constructor(props) {
        super(props)
        this.state = {
            lcrdetails: [],
            message: null
        }
        this.deleteLcr = this.deleteLcr.bind(this);
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
        LcrApiService.deleteLcr(lcrId)
           .then(res => {
               this.setState({message : 'User deleted successfully.'});
               this.setState({lcrdetails: this.state.lcrdetails.filter(
                 lcr_data => lcr_data.lcr_policy_id !== lcrId)});
           })
           

    }

    editLcr(lcr_policy_id) {
        window.localStorage.setItem("lcrId", lcr_policy_id);
        history.push('/add-lcrProfile');
    }

    addLcr() {
        window.localStorage.removeItem("lcrId");
        // alert("hiii");
      history.push('/add-lcrProfile');
    }
    state = {
        // selectedRowKeys: [], // Check here to configure the default column
        // loading: false,
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
    
      setAgeSort = () => {
        this.setState({
          sortedInfo: {
            order: 'descend',
            columnKey: 'age',
          },
        });
      };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
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
            // loading, selectedRowKeys,
         sortedInfo} = this.state;
       sortedInfo = sortedInfo || {};
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // };
    // const hasSelected = selectedRowKeys.length > 0;
    
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
          render: lcr_type => this.maplcrtype(lcr_type),
          // sorter: (a, b) => a.lcr_type.length - b.lcr_type.length,
          // sortOrder: sortedInfo.columnKey === 'lcr_type' && sortedInfo.order,
          // ellipsis: true,
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'key',
            render: (text, record) => <EditFilled 
               onClick={() => { this.editLcr(record.lcr_policy_id);}}
            />,
          },
          {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render: (text, record) => <DeleteFilled 
            onClick={() => { this.deleteLcr(record.lcr_policy_id); }}/>,
            
          },
          {
            title: 'Export',
            dataIndex: 'export',
          },
      ];


        return(
        //     <div>
        //     <form>
        //         <h2>LCR List</h2>
        //         <Button icon={<PlusCircleFilled/>} onClick={() => this.addLcr()}>Add
        //         </Button>
        //         <div>
        //             <label>Search:</label>
        //             <input type="text"></input>
        //             <Button>Search</Button>
        //         </div>
        //         <label><input type="radio" id="lcr_policy_id" name="lcr_policy_id" value="lcrid" />
        //                 LCR Id</label>
        //                 <label><input type="radio" id="lcr_name" name="lcr_name" value="lcrname" />
        //                 LCR Name</label><br /><br />
        //         {/* <table className="table table-striped" id="students">
        //             <thead>
        //                 <tr>
        //                     <th className="hidden">LCR Id</th>
        //                     <th>LCR Name</th>
        //                     <th>LCR Type</th>
        //                     <th>Edit</th>
        //                     <th>Delete</th>
        //                     <th>Export</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {
        //                     this.state.lcrdetails.map(
        //                         lcr_data =>
        //                             <tr key={lcr_data.lcr_id}>
        //                                 <td>{lcr_data.lcr_name}</td>
        //                                 <td>{lcr_data.lcr_type}</td>
        //                                 <td><EditFilled onClick={() => this.editLcr(lcr_data.lcr_id)}/></td>
        //                                 <td><DeleteFilled onClick={() => this.deleteLcr(lcr_data.lcr_id)}/></td>
        //                             </tr>
        //                     )
        //                 }
        //             </tbody>
        //             </table> */}
        //     </form>
        //     <div>
        // {/* <div style={{ marginBottom: 16 }}>
        //   <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
        //     Reload
        //   </Button>
        //   <span style={{ marginLeft: 8 }}>
        //     {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        //   </span>
        // </div> */}
        // <Table 
        // // rowSelection={rowSelection}
        //  columns={columns} 
        // id="students" dataSource={this.state.lcrdetails} onChange={this.handleChange} />
        //   </div>
        //   </div>
        <div>
          
          <div className='topline'>LCR List</div>
          <Form className="formset">
            <Form.Item>
            <Button icon={<PlusCircleFilled/>} onClick={() => this.addLcr()}>Add
                </Button>
            </Form.Item>

            <Form.Item
            label = "Search"
            name = "searchlcr">
              <Search placeholder="input search text"
                    onSearch={value => console.log(value)}
                   style={{ width: 200 }} enterButton />
            </Form.Item>

            <Form.Item>
            <Radio.Group name="lcrtype"  onChange={this.onChangeradio} 
                    // value={this.state.value}
                    >
                        <Radio value={1} >Lcr Name</Radio>
                        <Radio value={2}>Lcr Id</Radio>

                    </Radio.Group>

            </Form.Item>
            <Form.Item><Table 
        // rowSelection={rowSelection}
         columns={columns} 
        id="students" dataSource={this.state.lcrdetails} onChange={this.handleChange} /></Form.Item>
          </Form>
          
        </div>
        );
    }
}

export default LCRProfile;