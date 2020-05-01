import React, { Component } from 'react'
import PCDService from "../../service/PCDService";
import history from "../../History"
//import '../../Styling/Styletable.css';
import {Table ,Button, Form} from "antd"
import {  EditFilled , PlusCircleFilled,  DeleteFilled } from '@ant-design/icons';


//const npvalue={0:"Unknown","1":"ISDN","2":"Telephony"}

class Pcddetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
        pcd: [],
            message: null
        }
        this.deletePcd = this.deletePcd.bind(this);
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
           })

    }

    editPcd(ptcode_id) {
        window.localStorage.setItem("ptcode_id", ptcode_id);
        history.push('/add-pcd');
        
    }

   addPcd() {
        window.localStorage.removeItem("ptcode_id");
        history.push('/add-pcd');
        
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
    render(){
        let { sortedInfo} = this.state;
        sortedInfo = sortedInfo || {};
        
        const columns = [
            {
                title: 'Point Code',
                dataIndex: 'point_code',
                key: 'point_code',
                sorter: (a, b) => a.point_code- b.point_code,
                sortOrder: sortedInfo.columnKey === 'point_code' && sortedInfo.order,
                ellipsis: true,
            },
            {
            title: 'Operator Name',
            dataIndex: 'operator_name',
            key: 'operator_name',
            sorter: (a, b) => a.operator_name.localeCompare(b.operator_name),
                sortOrder: sortedInfo.columnKey === 'operator_name' && sortedInfo.order,
                ellipsis: true,
            },
            {
            title: 'Operator Country',
            dataIndex: 'operator_country',
            key: 'operator_country',
            sorter: (a, b) => a.operator_country.localeCompare(b.operator_country),
                sortOrder: sortedInfo.columnKey === 'operator_country' && sortedInfo.order,
                ellipsis: true,
            },
            {
            title: 'SAP Id',
            dataIndex: 'sap_id',
            key: 'sap_id',
            sorter: (a, b) => a.sap_id- b.sap_id,
            sortOrder: sortedInfo.columnKey === 'sap_id' && sortedInfo.order,
            ellipsis: true,
            },
            {
            title: 'TT',
            dataIndex: 'tt',
            key: 'tt',
            sorter: (a, b) => a.tt- b.tt,
            sortOrder: sortedInfo.columnKey === 'tt' && sortedInfo.order,
            ellipsis: true,
            },  
            {
            title: 'NP',
            dataIndex:'np',
            key: 'np',
            render :np =>this.mapnp(np),
            },
            {
            title: 'RI',
            dataIndex: 'ri',
            key: 'ri',
            },
            {
            title: 'SSN',
            dataIndex: 'ssn',
            key: 'ssn',
            render :ssn =>this.mapssn(ssn),
            } ,
            {
            title: 'PC Status',
            dataIndex: 'status',
            key: 'status',
                
            },
            {
            title: 'Delay',
            dataIndex: 'delay',
            key: 'delay',
                
            },
            {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
            render: (text,record) => <EditFilled onClick={() => this.editPcd(record.ptcode_id)} />,
            },
            {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render: (text,record) => <DeleteFilled onClick={()=>this.deletePcd(record.ptcode_id)} />,
            }
        ];
        return(
            <div  >
                
              <div className='topline'>Point Code Details</div>
                <Form className="formset">
                    <Form.Item>
               <Button type="primary" onClick={() => this.addPcd()}>Add
                </Button>
                </Form.Item>
                <Form.Item >
               <Table
             columns={columns} 
             dataSource={this.state.pcd} 
             id="students"
             bordered 
             onChange={this.handleChange}  />
             </Form.Item>
             </Form>
          </div>
        );
    }
}

export default Pcddetails;

