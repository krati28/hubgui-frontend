import React, { Component } from 'react';
import LcrApiService from "../../service/LcrApiService";
import history from "../../History";
import '../../styling/Styletable.css';
import { Form, Input, Select, Button, Space } from 'antd';

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

class AddLCRProfile extends Component{

    constructor(props){
        super(props);
        this.state ={
            lcr_policy_id:'',
            lcr_name: '',
            lcr_type: '',
            third_supp_retry: '',
            message: null
        }
        this.saveLcr = this.saveLcr.bind(this);
        this.loadLcr = this.loadLcr.bind(this);
        this.handleDropdownChangeLCRType=this.handleDropdownChangeLCRType.bind(this);
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.loadLcr();
    }

    loadLcr() {
        LcrApiService.fetchLcrById(window.localStorage.getItem("lcrId"))
            .then((res) => {
                let lcr_data = res.data.result;
                this.setState({
                    lcr_policy_id: lcr_data.lcr_policy_id,
                    lcr_name:lcr_data.lcr_name,
                    lcr_type:lcr_data.lcr_type,
                    third_supp_retry:lcr_data.third_supp_retry,
                }, () => console.log(this.state));
            
                this.formRef.current.setFieldsValue({
                    lcr_policy_id: lcr_data.lcr_policy_id,
                    lcr_name:lcr_data.lcr_name,
                    lcr_type:lcr_data.lcr_type,
                    third_supp_retry:lcr_data.third_supp_retry,
                })
            });
    }

    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value },
            );
    }

    handleDropdownChangeLCRType =(e) =>
    {
          this.setState({ lcr_type: e });
    }

    saveLcr = (e) => {
        e.preventDefault();
        if(this.state.lcr_policy_id===''){
            let lcr_data = { 
                lcr_policy_id:this.state.lcr_policy_id,
                lcr_name: this.state.lcr_name, 
                lcr_type: this.state.lcr_type,
                third_supp_retry:this.state.third_supp_retry,
            };
        LcrApiService.addLcr(lcr_data)
            .then(res => {
                this.setState({message : 'added successfully.'});
            history.push('/environmentSetup-lcrProfile');
            });
        }
        else if(this.state.lcr_policy_id !== ''){
            let lcr_data = { 
                lcr_policy_id:this.state.lcr_policy_id,
                lcr_name: this.state.lcr_name, 
                lcr_type: this.state.lcr_type,
                third_supp_retry:this.state.third_supp_retry,
                };
            LcrApiService.editLcr(lcr_data)
            .then(res =>{
                // alert("hiiii")
                this.setState({message:'updated successfully.'});
            history.push('/environmentSetup-lcrProfile');
            });
        }
    }

    render(){
        return(
            <div>
                <div className='topline'>Add LCR List
                </div>
                <div className="abc">
                    <div className="formalign">
                        <Form 
                            name="basic" 
                            initialValues={{remember:true}}
                            ref={this.formRef} 
                            {...formItemLayout}>
                            <Form.Item
                                label = "Lcr Name"
                                name = "lcr_name"
                                labelAlign="left"
                                rules = {[{ 
                                    required: true, 
                                    message: 'Please input your Cluster Name!',
                                    },
                                ]}
                            >
                                <Input 
                                    type="text" 
                                    className="inputset"
                                    placeholder = "Enter lcr name..."
                                    name="lcr_name"
                                    labelAlign="left"
                                    value={this.state.lcr_name} 
                                    onChange={this.onChange} 
                                />
                            </Form.Item>
                            <Form.Item
                                label="LCR Type" 
                                name="lcr_type" 
                                labelAlign="left" 
                                
                                rules = {[{required:true, message:"Select a List Type!"}]}
                            >
                                <Select 
                                    placeholder="--select--" 
                                    name="lcr_type"
                                    onChange={this.handleDropdownChangeLCRType}
                                    style={{width:"300px"}} 
                                    labelAlign="left"
                                >
                                    <Option value="0">Default LCR</Option>
                                    <Option value= "1" >SC_MT</Option>
                                    <Option value="3">SPEC_LCR</Option>
                                    <Option value="4">Time based Lcr</Option>
                                    
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label = "Third Party"
                                name = "third_supp_retry"
                                labelAlign="left"
                            >
                                <Input 
                                    type="text" 
                                    className="inputset"
                                    labelAlign="left"
                                    placeholder = "Enter a number"
                                    name="third_supp_retry"
                                    value={this.state.third_party_supp} 
                                    onChange={this.onChange} 
                                />
                            </Form.Item>
                            <Form.Item>
                                <Space>
                                    <Button 
                                        type="primary" 
                                        onClick={this.saveLcr} 
                                        disabled={!this.state.lcr_name || !this.state.lcr_type } 
                                    >Submit</Button>
                                    <Button 
                                        type="danger" 
                                        onClick={() => this.props.history.push('/environmentSetup-lcrProfile')}
                                    >Cancel</Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddLCRProfile;