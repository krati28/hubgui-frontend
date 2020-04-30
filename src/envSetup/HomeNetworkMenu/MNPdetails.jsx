import React, { Component } from 'react'
import MNPService from "../../service/MNPService";
import history from "../../History";
import '../../styling/Styletable.css';
import {Table ,Button, Form} from "antd"
import {  EditFilled , PlusCircleFilled,  DeleteFilled } from '@ant-design/icons';


class MNPdetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
        mnp: [],
            message: null
        }
        this.deleteMNP = this.deleteMNP.bind(this);
        this.editMNP = this.editMNP.bind(this);
       this.addMNP = this.addMNP.bind(this);
        this.reloadMNPList = this.reloadMNPList.bind(this);
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
    state = {
        sortedInfo: null,
    };
    
handleChange = (pagination, filters, sorter) => {
console.log('Various parameters', pagination, filters, sorter);
this.setState({
    sortedInfo: sorter,
});
};

    render(){
        let { sortedInfo} = this.state;
        sortedInfo = sortedInfo || {};
        const columns = [
            {
                title: 'Gateway ID',
                dataIndex: 'mnp_id',
                key: 'mnp_id',
                sorter: (a, b) => a.mnp_id- b.mnp_id,
                sortOrder: sortedInfo.columnKey === 'mnp_id' && sortedInfo.order,
                ellipsis: true,
            },
            {
            title: 'Gateway Type',
            dataIndex: 'mnp_type',
            key: 'mnp_type',
            sorter: (a, b) => a.mnp_type.localeCompare(b.mnp_type),
                sortOrder: sortedInfo.columnKey === 'mnp_type' && sortedInfo.order,
                ellipsis: true,
            },
            {
            title: 'Gateway Name',
            dataIndex: 'gateway_name',
            key: 'gateway_name',
            sorter: (a, b) => a.gateway_name.localeCompare(b.gateway_name),
                sortOrder: sortedInfo.columnKey === 'gateway_name' && sortedInfo.order,
                ellipsis: true,
            },
            {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
            render: (text,record) => <EditFilled onClick={() => this.editMNP(record.mnp_id)} />,
            },
            {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render: (text,record) => <DeleteFilled onClick={()=>this.deleteMNP(record.mnp_id)} />,
            }
        ];
        return(
            <div>
            <div className='topline'>MNP Gateway Details</div>
              <Form className="formset">
                  <Form.Item>
            
                
               <Button  icon={<PlusCircleFilled/>} onClick={() => this.addMNP()}>ADD
                </Button></Form.Item>
                <Form.Item>
               <Table
             columns={columns} 
             dataSource={this.state.mnp} 
             id="students"
             bordered 
             onChange={this.handleChange}  />
             </Form.Item>
             </Form>
          </div>
        );
    }
}

export default MNPdetails;

