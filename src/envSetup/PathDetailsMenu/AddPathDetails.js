import React, { Component } from 'react';
import PathService from "../../service/PathService";
import history from "../../History";
import '../../styling/Styletable.css';
import { Form, Input, Select, Button, Space , Radio, Popconfirm, Checkbox, Breadcrumb} from 'antd';
import '../../styling/Styletable.css';
import {NavLink} from "react-router-dom";

const {Option} = Select;
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

class AddPathDetails extends Component{
    constructor(props){
        super(props);
        this.state ={
            path_id:'',
            path_name: '',
            interface_type:'',
            oc_compliance_flag:'',
            list:[],
            showSS7:false,
            showSSMP:false,
            message: null
        }
        this.savePath = this.savePath.bind(this);
        this.loadPath = this.loadPath.bind(this);
        this.handleDropdownChangeInterfaceType=this.handleDropdownChangeInterfaceType.bind(this);
        this.formRef = React.createRef();
    }

    componentDidMount(){
        this.loadPath();
        let initialPlanets = [];
        fetch('http://localhost:8105/SMPPsupplier')
            .then(response => {
                return response.json();
            }).then(data => {
                //alert(JSON.stringify(data));
            initialPlanets = data.result.map((operator_name) => {
                return operator_name
            });
            this.setState({
                list: initialPlanets,
            })
        });
    }

    loadPath() {
        PathService.fetchPathById(window.localStorage.getItem("pathId"))
            .then((res) => {
                let path_data = res.data.result;
                try{
                this.setState({
                    path_id: path_data.path_id,
                    path_name:path_data.path_name,
                    interface_type:path_data.interface_type,
                    oc_compliance_flag:path_data.oc_compliance_flag,
                }, () => console.log(this.state));
            
                this.formRef.current.setFieldsValue({
                    path_id: path_data.path_id,
                    path_name:path_data.path_name,
                    interface_type:path_data.interface_type,
                    oc_compliance_flag:path_data.oc_compliance_flag,
                })
            }
            catch(err){console.log(err);}
            });
    }

    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value },
            );
    }

    onChangeCheckbox =(e)=>{
        var isChecked = e.target.checked;
        if(isChecked){
            this.state.oc_compliance_flag=1;
        }
        else{
            this.state.oc_compliance_flag=0;
        }

    }

    handleDropdownChangeInterfaceType =(e) =>
    {
          this.setState({ interface_type: e });
          if(e==="SS7" ){
              this.setState({
                showSS7:true,
                showSSMP:false,
              })
          }
          else if(e==="SMPP" || e==="SMPP ES"){
              this.setState({
                showSS7:false,
                showSSMP:true,
              })
          }
    }

    savePath = (e) => {
        e.preventDefault();
        if(this.state.interface_type==="SMPP" || this.state.interface_type==="SMPP ES"){
        if(this.state.path_id===''){
            let path_data = { 
                path_id:this.state.path_id,
                path_name: this.state.path_name, 
                interface_type: this.state.interface_type,
                oc_compliance_flag:this.state.oc_compliance_flag,
            };
        PathService.addPath(path_data)
            .then(res => {
                this.setState({message : 'added successfully.'});
            history.push('/environmentSetup-pathDetails');
            });
        }
        else if(this.state.lcr_policy_id !== ''){
            let path_data = { 
                path_id:this.state.path_id,
                path_name: this.state.path_name, 
                interface_type: this.state.interface_type,
                oc_compliance_flag:this.state.oc_compliance_flag,
            };
            PathService.editPath(path_data)
            .then(res =>{
                // alert("hiiii")
                this.setState({message:'updated successfully.'});
            history.push('/environmentSetup-pathDetails');
            });
        }
    }}

    onReset =() =>{
        this.formRef.current.resetFields();
    }

    cancel(){
        history.push("environmentSetup-pathDetails")
    }


    render(){
        return(
            <div>
                <div className='topline'>Add Operator List
                </div>
                <div className="setcrumb">
                    
<Breadcrumb.Item> Environment Setup </Breadcrumb.Item>
                <Breadcrumb.Item key="pathDetails">
                    <NavLink to="/environmentSetup-pathDetails">Path Details</NavLink>
                </Breadcrumb.Item>  
                <Breadcrumb.Item>Add Path Details</Breadcrumb.Item>
                    </div>
        
                <div className="abc">
                    <div className="formalign">
                        <Form 
                        name="basic" 
                        initialValues={{remember:true}}
                        ref={this.formRef} 
                        {...formItemLayout}>
                            <Form.Item 
                                label = "Path Name"
                                name = "path_name"
                                labelAlign="left"
                                rules = {[{ 
                                    required: true, 
                                    message: 'Please input your Path Name!',
                                    },
                                    {
                                        pattern:"[a-zA-Z]([a_zA-Z0-9_]*)+$",
                                        message:"Cluster Name is invalid. It should only contain only alphabetss, numbers and underscore",
                                    },
                                ]}
                            >
                                <Input 
                                    className="inputset"
                                    maxLength="30"
                                    type="text" 
                                    placeholder = "Enter path name..."
                                    name="path_name"
                                    labelAlign="left"
                                    value={this.state.path_name} 
                                    onChange={this.onChange} 
                                />
                            </Form.Item>
                            <Form.Item
                                label="OC Compliance flag" 
                                name="oc_compliance_flag" 
                                labelAlign="left" 
                                
                                // rules = {[{required:true, message:"Select an interface Type!"}]}
                            >
                               <Checkbox
                                 onChange={this.onChangeCheckbox}
                                 ></Checkbox>
                            </Form.Item>
                            <Form.Item
                                label="Interface Type" 
                                name="interface_type" 
                                labelAlign="left" 
                                
                                rules = {[{required:true, message:"Select an interface Type!"}]}
                            >
                                <Select 
                                    placeholder="--select--" 
                                    name="interface_type"
                                    onChange={this.handleDropdownChangeInterfaceType}
                                    style={{width:"300px"}} 
                                    labelAlign="left"
                                >
                                    <Option value="SS7">SS7</Option>
                                    <Option value= "SMPP" >SSMP</Option>
                                    <Option value="SMPP ES">SSMP ES</Option>
                                    
                                </Select>
                            </Form.Item>
                            
                            {this.state.showSSMP &&
                            <div>
                                <Form.Item
                                label="Supplier List" 
                                name="supplier_list" 
                                labelAlign="left" 
                                
                                rules = {[{required:true, message:"Select a supplier list!"}]}
                            >
                                <Select 
                                    placeholder="--select--" 
                                    name="supplier_list"
                                    // onChange={this.handleDropdownChangeLCRType}
                                    style={{width:"300px"}} 
                                    labelAlign="left"
                                >
                                 
                                 {this.state.list.map((test) => 
                                        <Option value={test.name}> 
                                        {test.name} </Option> )}   
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Outgoing Accounts" 
                                name="outgoing_acc" 
                                labelAlign="left" 
                                
                                rules = {[{required:true, message:"Select an outgoing account!"}]}
                            >
                                <Select 
                                    placeholder="--select--" 
                                    name="outgoing_acc"
                                    // onChange={this.handleDropdownChangeLCRType}
                                    style={{width:"300px"}} 
                                    labelAlign="left"
                                >
                                    
                                </Select>
                            </Form.Item>
                            </div>
                            }
                            <div className="buttonset">
                            <Form.Item>
                                <Space>
                                <Popconfirm
                                        title="are you sure you want to save the data?"
                                        onConfirm={this.savePath}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                    <Button 
                                        type="primary" 
                                        // onClick={this.saveLcr} 
                                        disabled={!this.state.path_name || !this.state.interface_type } 
                                    >Save</Button>
                                    </Popconfirm>
                                    <Popconfirm
                                        title="do you want to reset the data?"
                                        onConfirm={this.onReset}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                    <Button 
                                    // type="primary"
                                    >
                                        Clear                                        
                                    </Button>
                                    </Popconfirm>
                                    <Popconfirm
                                        title="do you want to reset the data?"
                                        onConfirm={this.cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                    <Button 
                                        type="danger" 
                                        // onClick={() => this.props.history.push('/environmentSetup-lcrProfile')}
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

export default AddPathDetails;