
import React, { Component } from 'react';
import PCDService from "../../service/PCDService";
import {Form, Input, Button, Select, Typography, Space, Popconfirm} from 'antd';

import '../../styling/Styletable.css';
const {Option} = Select;
const {Title} = Typography;
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
class AddPCDetails extends Component{
    constructor(props){
        console.log("Here ", props)
        super(props);
        this.state ={
            ptcode_id:'',
            point_code: '',
            operator_name: '',
            operator_country: '',
            sap_id: '',
            tt: '',
            np: '',
            ssn:'',
            status: '',
            delay:'',
            message: null
        }
        this.savePointCodeDetails = this.savePointCodeDetails.bind(this);
        this.handleDropdownChangeNP = this.handleDropdownChangeNP.bind(this);
        this.handleDropdownChangeSSN = this.handleDropdownChangeSSN.bind(this);
        this.handleDropdownChangePCStatus=this.handleDropdownChangePCStatus.bind(this);
        this.loadPcd=this.loadPcd.bind(this);
        this.formRef = React.createRef();
    }
    componentDidMount() {
        this.loadPcd();
    }
    loadPcd() {
        PCDService.fetchPcdById(window.localStorage.getItem("ptcode_id"))
       
            .then((res) => {
                let pcds = res.data.result;
                this.setState({
                ptcode_id: pcds.ptcode_id,
                point_code: pcds.point_code,
                operator_name: pcds.operator_name,
                operator_country: pcds.operator_country,
                sap_id:pcds.sap_id,
                tt: pcds.tt,
                np: pcds.np,
                ssn:pcds.ssn,
                status: pcds.status,
                delay:pcds.delay,
                }, () => console.log(this.state));

                switch(pcds.np){
                    case 0:pcds.np="Unkown";break;
                    case 1:pcds.np="ISDN";break;
                    case 2:pcds.np="Telephony(E.164,E.163)";break;
                    case 3:pcds.np="Data(X.121)";break;
                    case 4:pcds.np="Telex(F.69)";break;
                    case 5:pcds.np="Maritime Mobile";break;
                    case 6:pcds.np="Land Mobile";break;
                    case 7:pcds.np="Private";break;
                    case 13:pcds.np="ANSI SS7 PC and SSN";break;
                    case 14:pcds.np="Internet(IP)";break;
                    case 15:pcds.np="Extension";break;
                }
                switch(pcds.ssn){
                    case 6:pcds.ssn="HLR";break;
                    case 7:pcds.ssn="VLR";break;
                    case 8:pcds.ssn="MSC";break;
                    case 253:pcds.ssn="FNR";break;
                }
                

            
                this.formRef.current.setFieldsValue({
                    ptcode_id: pcds.ptcode_id,
                    point_code: pcds.point_code,
                    operator_name: pcds.operator_name,
                    operator_country: pcds.operator_country,
                    sap_id:pcds.sap_id,
                    tt: pcds.tt,
                    np: pcds.np,
                    ssn:pcds.ssn,
                    status: pcds.status,
                    delay:pcds.delay,
                });
            });
            
    }

    
    onReset = () => {
        this.formRef.current.resetFields();
      };
    
    

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });
    handleDropdownChangeNP =(e) =>
    {
        this.setState({ np:e });
    }
    handleDropdownChangeSSN =(e) =>
    {
        this.setState({ ssn: e });
    }
    
    handleDropdownChangePCStatus=(e) =>
    {
        this.setState({ status: e });
    }

        savePointCodeDetails = (e) => {
        e.preventDefault();
        if(this.state.ptcode_id===''){
        let pcd= {ptcode_id:this.state.ptcode_id,point_code: (parseInt(this.state.point_code)), operator_name: this.state.operator_name,operator_country:this.state.operator_country,sap_id: (parseInt(this.state.sap_id)), tt: (parseInt(this.state.tt)),np:(parseInt(this.state.np)),ssn:(parseInt(this.state.ssn)),status:this.state.status,delay:parseInt(this.state.delay)};
        
                //alert("in add pcd");
        PCDService.addPcd(pcd)
            .then(res => {
                this.setState({message : 'added successfully.'});
                //appends the /students to localhost:3000 url and hence lists out all the data
                this.props.history.push('/listpcd');
            });}
            else if(this.state.ptcode_id !== ''){
                let pcd= {ptcode_id:this.state.ptcode_id,point_code: (parseInt(this.state.point_code)), operator_name: this.state.operator_name,operator_country:this.state.operator_country,sap_id: (parseInt(this.state.sap_id)), tt: (parseInt(this.state.tt)),np:(parseInt(this.state.np)),ssn:(parseInt(this.state.ssn)),status:this.state.status,delay:parseInt(this.state.delay)};
        
                //alert("in editpcd")
                PCDService.editPcd(pcd)
                .then(res =>{
                    this.setState({message:'updated successfully.'})
                    this.props.history.push('/listpcd');
                });
            }
    }
    render() {
        
              
              
        return(
            <div >
                
              <div className='topline'>Add Point Code Details</div>
              <div className="abc">
                <div className="formalign">
                <Form name="basic"  ref={this.formRef}
                initialValues={{ remember: true }}
                className="formset" {...formItemLayout}>
                <Form.Item 
                label = "Point Code"
                name = "point_code"
                labelAlign="left"
                rules = {[{ 
                            required: true, 
                            message: 'Please point code value',
                        },
                        ]} 
                >
                    <Input 
                        type="text"
                        className="inputset"
                        name="point_code" 
                        labelAlign="left" 
                        value={this.state.point_code} 
                        onChange={this.onChange} 
                    />
                </Form.Item>
                <Form.Item 
                label = "Operator Name"
                name = "operator_name"
                labelAlign="left"
                rules = {[{ 
                            required: true, 
                            message: 'Please operator Name!',
                        },
                    ]} 
                >
                    <Input 
                        type="text"
                        className="inputset"
                        name="operator_name" 
                        labelAlign="left" 
                        value={this.state.operator_name} 
                        onChange={this.onChange} 
                    />
                </Form.Item>
                
                <Form.Item 
                label = "Operator Country"
                name = "operator_country"
                labelAlign="left"
                rules = {[{ 
                            required: true, 
                            message: 'Please input operator country',
                        },
                    ]}
                >
                    <Input 
                        type="text"
                        className="inputset" 
                        name="operator_country" 
                        labelAlign="left" 
                        value={this.state.operator_country} 
                        onChange={this.onChange} 
                    />
                </Form.Item>

                <Form.Item 
                label = "SAP Id"
                name = "sap_id"
                labelAlign="left"
                rules = {[{ 
                            required: true}
                    ]} 
                >
                    <Input 
                        type="text"
                        className="inputset"
                        name="sap_id" 
                        labelAlign="left" 
                        value={this.state.sap_id} 
                        onChange={this.onChange} 
                    />
                </Form.Item>
                
                <Form.Item 
                label = "TT"
                name = "tt"
                rules = {[{ required: true}]} 
                labelAlign="left">
           
                    <Input 
                        type="text" 
                        className="inputset"
                        name="tt" 
                        labelAlign="left" 
                        value={this.state.tt} 
                        onChange={this.onChange} 
                    />
                </Form.Item>
                
                <Form.Item label = "NP" name="np"  rules = {[{required:true}]} labelAlign="left">
                    <Select placeholder="--select--" onChange={this.handleDropdownChangeNP}
                    labelAlign="left" style={{width:"300px"}}>
                        <Option value="0">Unknown</Option>
                        <Option value= "1" >ISDN</Option>
                        <Option value="2">Telephony(E.164,E.163)</Option>
                        <Option value="3">Data(X.121)</Option>
                        <Option value="4">Telex(F.69)</Option>
                        <Option value="5">Maritime Mobile</Option>
                        <Option value="6">Land Mobile(E.212)</Option>
                        <Option value="7">Private</Option>
                        <Option value="13">ANSI SS7 PC and SSN</Option>
                        <Option value="14">Internet(IP)</Option>
                        <Option value="15">Extension</Option>
                    </Select>
                </Form.Item>

                <Form.Item 
                label = "SSN"
                name = "ssn"
                rules = {[{required: true}]} 
                labelAlign="left">
                <Select placeholder="--select--" onChange={this.handleDropdownChangeSSN}
                labelAlign="left" style={{width:"300px"}}>
                    <Option value="6">HLR</Option>
                    <Option value="7">VLR</Option>
                    <Option value="8">MSC</Option>
                    <Option value="253">FNR</Option>
                </Select>

                </Form.Item>
                <Form.Item label = "PC Status" name="status" rules = {[{required:true}]} labelAlign="left">
                    <Select placeholder="--select--" onChange={this.handleDropdownChangePCStatus}
                    labelAlign="left" style={{width:"300px"}}>
                        <Option value="A">Active</Option>
                        <Option value="I">Inactive</Option>
                    </Select>
                </Form.Item>
                <Form.Item 
                label = "Delay"
                name = "delay"
                rules = {[{ required: true}]} 
                labelAlign="left">
                    <Input 
                        type="text" 
                        className="inputset"
                        name="delay" 
                        labelAlign="left" 
                        value={this.state.delay} 
                        onChange={this.onChange} 
                    />
                </Form.Item>
                    
                <div className="buttonset">   
                <Form.Item > 
                <Space>
                    <Popconfirm
                        title="Do you want to Add the record"
                        onConfirm={this.savePointCodeDetails}
                        okText="Yes"
                        cancelText="No"
                    >
                    <Button 
                    type="primary" 
                    //onClick={this.savePointCodeDetails} 
                    disabled={!this.state.point_code 
                    || !this.state.operator_name || !this.state.operator_country || !this.state.sap_id ||!this.state.tt||!this.state.np
                    ||!this.state.ssn||!this.state.status ||!this.state.delay} 
                    >Save
                    </Button>
                    </Popconfirm>
                    <Popconfirm
                        title="Do you want to reset the fields"
                        onConfirm={this.onReset}
                        okText="Yes"
                        cancelText="No"
                    >
                    <Button 
                        type="primary" 
                        //onClick={this.onReset} 
                        >Clear</Button>
                    </Popconfirm>
                    <Popconfirm
                        title="Do you want to cancel"
                        onConfirm={()=>this.props.history.push('/listpcd')}
                        okText="Yes"
                        cancelText="No"
                    >
                    <Button 
                        type="danger" 
                        //onClick={() => this.props.history.push('/listpcd')}
                        >Cancel</Button>
                    </Popconfirm>
                    </Space>
                    </Form.Item>
                </div>
        </Form>
            </div>
            </div>
            </div>
        );
    }
}

export default  AddPCDetails;
