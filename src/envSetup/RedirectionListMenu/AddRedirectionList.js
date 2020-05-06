import React, { Component } from 'react';
import {Form, Input, Button, Select, Typography, InputNumber, Space} from 'antd';
import RedirectionListService from "../../service/RedirectionListService";
import history from "../../History"
const {Option} = Select;
const OPTIONS_ESME = ['Red_Account', 'Red_Account1', 'Red_AccountHTTP', 'Red_acc_temp'];
const OPTIONS_POINTCODE = ['DCP-2000', 'Chethan Test-1788'];
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

class AddRedirectionList extends Component{

    constructor(props){
        super(props)
            this.state = {
                id:'',
                listname:'',
                listtype:'',
                loadDistributionType:'',
                selectedItems:[],
                                
                showPercentage:false,
                esmeAccount:false,
                pointcodeAccount:false,

                message:null
                                
            }
        this.saveRedirectionList = this.saveRedirectionList.bind(this);
        this.handleDropdownChangeLoad = this.handleDropdownChangeLoad.bind(this);
        this.handleDropdownChangeType = this.handleDropdownChangeType.bind(this);
        this.loadRedirectionList = this.loadRedirectionList.bind(this);
        this.formRef = React.createRef();
    }

    // selectedItems => {
    //     this.setState({ selectedItems });
    //   };
    componentDidMount(){
        this.loadRedirectionList();
    }
    loadRedirectionList() {
        RedirectionListService.fetchUserById(window.localStorage.getItem("id"))
            .then((res) => {
                    let rllist = res.data.result;
                    this.handleDropdownChangeType(rllist.listtype);
                    this.setState({
                        id: rllist.id,
                        listname: rllist.listname,
                        listtype: rllist.listtype,
                        loadDistributionType: rllist.loadDistributionType,
                    }, () => console.log(this.state));
                    
                    this.formRef.current.setFieldsValue({
                        id: rllist.id,
                        listname: rllist.listname,
                        listtype: rllist.listtype,
                        loadDistributionType: rllist.loadDistributionType,
                    });
                });
                // alert(loadDistributionType);
                // alert("rllist name--"+window.localStorage.getItem("id"));
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onReset = () => {
        this.formRef.current.resetFields();
    }
        
    handleDropdownChangeType = (e) => {
        this.setState({listtype: e});
        if(e === "esme"){
            this.setState({ esmeAccount:true, pointcodeAccount:true})
        }
        else{
            this.setState({ pointcodeAccount:true, esmeAccount:false})
        }
            // console.log({e});
    }
        
    handleDropdownChangeLoad = (e) => {
        this.setState({ loadDistributionType: e});
        if(e === "percentage"){
            this.setState({ showPercentage:true})
        }
        else{
            this.setState({showPercentage:false})
        }
    }

    saveRedirectionList =(e) => {
        e.preventDefault();
        let user = {id:this.state.id, listname: this.state.listname, listtype: this.state.listtype, 
            loadDistributionType: this.state.loadDistributionType};
        RedirectionListService.addUser(user)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                history.push('/environmentSetup-redirectionList');
            });
    }

    render(){
        const { selectedItems } = this.state;
        const filteredOptions = OPTIONS_ESME.filter(o => !selectedItems.includes(o));

        return(
            <div>
                
                <div className='topline'> 
                    Add Redirection List
                </div>

                <div className="abc">
                    <div className="formalign">
                        <Form
                            name="basic" 
                            ref={this.formRef}
                            initialValues={{ remember: true }}
                            className="formset"
                            {...formItemLayout}
                        >
                            <Form.Item 
                                label = "List Name" 
                                name = "listname"
                                labelAlign="left"
                                rules = {[{ required: true, message: 'Please input your List Name!'}]}
                            >
                                <Input 
                                    className='inputset'
                                    type="text" 
                                    labelAlign="left"
                                    placeholder = "Enter list name..."
                                    name="listname"
                                    value={this.state.listname} 
                                    onChange={this.onChange} />
                            </Form.Item>
                        
                            <Form.Item
                                label="List Type" 
                                name="listtype"
                                labelAlign="left"
                                rules = {[{required:true, message:"Select a List Type!"}]}
                                >
                                <Select 
                                    style={{width:"300px"}}
                                    placeholder="Click to see List Types" 
                                    onChange={this.handleDropdownChangeType}
                                    labelAlign="left"
                                    >
                                    <Option value="esme">ESME</Option>
                                    <Option value="point_code">Point Code</Option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                label="Load Distribution Type" 
                                name="loadDistributionType"
                                rules = {[{required:true, message:"Select Load Distribution Type"}]}
                                labelAlign="left"
                                >
                                <Select 
                                    style={{width:"300px"}} 
                                    placeholder="Click to see Load Distribution Types" 
                                    onChange={this.handleDropdownChangeLoad}>
                                    <Option value="round_robin">Round Robin</Option>
                                    <Option value="priority">Priority</Option>
                                    <Option value="percentage">Percentage</Option>
                                </Select>
                            </Form.Item>

                            {this.state.showPercentage &&
                                <Form.Item
                                label="Sample Value"
                                name="sampleValue"
                                labelAlign="left"
                                rules = {[{required:true, message:"Sample value is requiured"}]}
                                >
                                    <InputNumber labelAlign="left"/>
                                </Form.Item>
                            }

                            {this.state.esmeAccount &&
                                <Form.Item
                                    label="Select Accounts"
                                    name="selectAccounts"
                                    labelAlign="left"
                                    rules = {[{required: true, message:"Select atleast one Account"}]}
                                    >
                                    <Select
                                        mode="multiple"
                                        placeholder="Multiple value can be selected"
                                        value={selectedItems}
                                        onChange={this.handleChange}
                                        style={{ width: "300px" }}
                                        labelAlign="left"
                                    >
                                        {filteredOptions.map(item => (
                                        <Select.Option key={item} value={item}>
                                            {item}
                                        </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            }

                            <div className="buttonset">
                            <Form.Item > 
                                <Space>
                                    <Button 
                                        type="primary" 
                                        onClick={this.saveRedirectionList} 
                                        disabled={!this.state.listname || !this.state.listtype || !this.state.loadDistributionType}
                                        >
                                        Save
                                    </Button>

                                    <Button 
                                        type="danger" 
                                        onClick={() => history.push('/environmentSetup-redirectionList')}>
                                        Cancel
                                    </Button>

                                    <Button
                                        type="primary"
                                        onClick={this.onReset}
                                        >
                                            Clear
                                        </Button>
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

export default AddRedirectionList;
