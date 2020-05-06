import React, { Component } from 'react';
import ApiService from "../../service/ApiService";
import history from "../../History"
import {Form, Input, Button, Select, Radio, Space, Popconfirm} from 'antd';
import '../../styling/Styletable.css';

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

class AddOperatorCluster extends Component{

    constructor(props){
        super(props);
        this.state ={
            cluster_id:'',
            cluster_name: '',
            cluster_type: '',
            operator_ids:'',
            list:[],
            selectedItems:[],
            message: null
        }
        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.handleDropdownChangeOperatorId=this.handleDropdownChangeOperatorId.bind(this);
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.loadUser();
        let initialPlanets = [];
        fetch('http://localhost:8105/operatordetails')
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

    loadUser() {
        ApiService.fetchUserById(window.localStorage.getItem("clusterId"))
            .then((res) => {
                let user = res.data.result;
                this.setState({
                    cluster_id: user.cluster_id,
                    cluster_name:user.cluster_name,
                    cluster_type:user.cluster_type,
                    operator_ids:user.operator_ids,
                }, () => console.log(this.state));
            
                this.formRef.current.setFieldsValue({
                    cluster_id: user.cluster_id,
                    cluster_name:user.cluster_name,
                    cluster_type:user.cluster_type,
                    operator_ids:user.operator_ids,
                })
            });
    }

    

    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value },
            );
    }

    handleDropdownChangeOperatorId =(e) =>
    {
      this.setState({ operator_ids: e });
    }

    onChangeradio = (e) =>{
        this.setState({ [e.target.name]: e.target.value },
            );
    }
    
    saveUser = (e) => {
        e.preventDefault();
        if(this.state.cluster_id=== ''){
            let user = {
                cluster_id:this.state.cluster_id,
                cluster_name: this.state.cluster_name, 
                cluster_type: this.state.cluster_type,
                operator_ids:this.state.operator_ids,
                 };
            ApiService.addUser(user)
                .then(res => {
                    this.setState({message : 'User added successfully.'});
                    history.push('/environmentSetup-operatorCluster');
                });
        }
        else if(this.state.cluster_id !== ''){
            let user = {
                cluster_id:this.state.cluster_id,
                cluster_name: this.state.cluster_name, 
                cluster_type: this.state.cluster_type,
                operator_ids:this.state.operator_ids, 
                };
            ApiService.editUser(user)
                .then(res => {
                    this.setState({message : 'User added successfully.'});
                    history.push('/environmentSetup-operatorCluster');
                });
        }
        
    }

    onReset =() =>{
        this.formRef.current.resetFields();
    }

    cancel(){
        history.push("environmentSetup-operatorCluster")
    }

    render(){
        return(
            <div>
                <div className='topline'>Add Operator List
                </div>
                <div className="abc">
                    <div className="formalign">
                        <Form 
                        name="basic" 
                        initialValues={{remember:true}}
                        ref={this.formRef} 
                        {...formItemLayout}>
                            <Form.Item 
                                label = "Cluster Name"
                                name = "cluster_name"
                                labelAlign="left"
                                rules = {[{ 
                                    required: true, 
                                    message: 'Please input your Cluster Name!',
                                    },
                                ]}
                            >
                                <Input 
                                    className="inputset"
                                    type="text" 
                                    placeholder = "Enter cluster name..."
                                    name="cluster_name"
                                    labelAlign="left"
                                    value={this.state.cluster_name} 
                                    onChange={this.onChange} 
                                />
                            </Form.Item>
                            <Form.Item
                                label = "Cluster Type"
                                name = "cluster_type"
                                labelAlign="left"
                                rules = {[{ 
                                    required: true, 
                                    message: 'Please input your Cluster Type!',
                                    },
                                ]}
                            >
                                <Radio.Group 
                                    name="cluster_type"  
                                    onChange={this.onChangeradio} 
                                    labelAlign="left"
                                >
                                    <Radio value={1} >Default</Radio>
                                    <Radio value={2}>Roaming</Radio>

                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="Operator"
                                name="operator_ids"
                                labelAlign="left"
                                rules = {[{ 
                                    required: true, 
                                    message: 'Please select your operator Name!',
                                    },
                                ]}
                            >
                                <Select 
                                    name="operator_ids"
                                    labelAlign="left"
                                    style={{ width: "300px" }}
                                    placeholder="Click here and Please select the operator"
                                    onChange={this.handleDropdownChangeOperatorId}
                                    >
                                    {this.state.list.map((test) => 
                                        <Option value={test.operator_name}> 
                                        {test.operator_name} </Option> )}
                                </Select>
                            </Form.Item>
                            <div className="buttonset">
                            <Form.Item > 
                                <Space >
                                <Popconfirm
                                        title="are you sure you want to submit the data?"
                                        onConfirm={this.saveUser}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                    <Button 
                                        type="primary" 
                                        // onClick={this.saveUser} 
                                        disabled={!this.state.cluster_name  || 
                                        !this.state.cluster_type || !this.state.operator_ids}
                                    >Submit</Button>
                                    </Popconfirm>
                                    <Popconfirm
                                        title="do you want to reset the data?"
                                        onConfirm={this.onReset}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                    <Button type="primary">
                                        Clear                                        
                                    </Button>
                                    </Popconfirm>
                                    <Popconfirm
                                        title="Are you sure you dont want to add any entry?"
                                        onConfirm={this.cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                    <Button 
                                        type="danger"
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

export default AddOperatorCluster;