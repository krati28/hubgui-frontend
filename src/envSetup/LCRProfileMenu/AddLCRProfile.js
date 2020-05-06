import React, { Component } from 'react';
import LcrApiService from "../../service/LcrApiService";
import history from "../../History";
import '../../styling/Styletable.css';
import { Form, Input, Select, Button, Space , Radio, Popconfirm} from 'antd';
import { TimePicker, DatePicker } from 'antd';
import moment from 'moment';

const dateFormatList = ['DD/MM/YYYY'];
const format = 'HH:mm';

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
            message: null,
            list:[],
            showDate:false,
            showDateDate:false,
            showDestOper:true,
            showExceptTimeBased: true,
            showTimeBased:false,
        }
        this.saveLcr = this.saveLcr.bind(this);
        this.loadLcr = this.loadLcr.bind(this);
        this.handleDropdownChangeLCRType=this.handleDropdownChangeLCRType.bind(this);
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.loadLcr();
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
          if(e==="0" || e==="1" || e==="3"){
              this.setState({
                showDate:false,
                showDestOper:true,
                showExceptTimeBased: true,
                showTimeBased:false,
              })
          }
          else if(e==="4"){
              this.setState({
                showDate:true,
                  showDestOper:true,
                showExceptTimeBased: false,
                showTimeBased:true,
              })
          }
    }

    onChangedate =(e)=>{
        this.setState({ [e.target.name]: e.target.value },
            );
            if(e===1){
                this.setState({
                    
            showDateDate:false,
                })
            }
            else if(e===2){
                this.setState({
                    showDateDate:true,

                })
            }
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

    onReset =() =>{
        this.formRef.current.resetFields();
    }

    cancel(){
        history.push("environmentSetup-lcrProfile")
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

                                {this.state.showDate &&
                                <Form.Item 
                                label = "Special Date"
                                name = "special_date"
                                 labelAlign="left"
                                 rules = {[{required:true, message:"Select a List Type!"}]}
                                >
                                    <Radio.Group name="special_date"  onChange={this.onChangedate} 
                                     labelAlign="left"
                    // value={this.state.value}
                    >
                        <Radio value={1} >Required</Radio>
                        <Radio value={2}>Not Required</Radio>

                    </Radio.Group>
                                    
                                    </Form.Item>}

                                    {this.state.showDateDate &&
                                    <Form.Item
                                    label="Start Date" 
                                    name="start_date" 
                                    labelAlign="left"
                                    rules={[{ required:true, message:"Supplier is Required"}]}
                                    > 
                                    <DatePicker 
                                    placeholder="dd-mm-yyyy" format={dateFormatList} />
                                </Form.Item>
                                    }

                                <div className="divset">
                            {this.state.showDestOper && 
                            <div>
                            <p>LCR Policy1</p>
                            <div>
                            <Form.Item
                                label="Dest Operator" 
                                name="dest_oper" 
                                labelAlign="left"
                                rules={[{ required:true, message:"Customer is Required"}]}
                                >
                                    <Select name="dest_oper"
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
                            <Form.Item
                                label = "Cost"
                                name = "cost"
                                labelAlign="left"
                                rules = {[{ 
                                    required: true, 
                                    message: 'Please input your the Cost!',
                                    },
                                ]}
                            >
                                <Input 
                                    type="text" 
                                    className="inputset"
                                    placeholder = "Enter cost..."
                                    name="cost"
                                    labelAlign="left"
                                    // value={this.state.lcr_name} 
                                    // onChange={this.onChange} 
                                />
                            </Form.Item>
                            <Form.Item
                                label = "Percentage"
                                name = "percentage"
                                labelAlign="left"
                                rules = {[{ 
                                    required: true, 
                                    message: 'Please enter percentage!',
                                    },
                                ]}
                            >
                                <Input 
                                    type="text" 
                                    className="inputset"
                                    placeholder = "Enter percentage..."
                                    name="percentage"
                                    labelAlign="left"
                                    // value={this.state.lcr_name} 
                                    // onChange={this.onChange} 
                                />
                            </Form.Item>
                            </div>
                            </div>}
                            {this.state.showExceptTimeBased &&  //customer
                            <div style={{backgroundColor:"lightgrey"}}>
                            <Form.Item
                                label = "Position"
                                name = "position"
                                labelAlign="left"
                                rules = {[{ 
                                    required: true, 
                                    message: 'Please input your Position!',
                                    },
                                ]}
                            >
                                <Input 
                                    type="text" 
                                    className="inputset"
                                    placeholder = "Enter position..."
                                    name="position"
                                    labelAlign="left"
                                    // value={this.state.lcr_name} 
                                    // onChange={this.onChange} 
                                />
                            </Form.Item>
                            </div>}

                            {this.state.showTimeBased && //supplier
                            <div style={{backgroundColor:"lightgrey" }}>
                            <Form.Item
                                label="Start Time" 
                                name="start_time" 
                                labelAlign="left"
                                rules={[{ required:true, message:"Supplier is Required"}]}
                                >
                                    <TimePicker placeholder="HH:MM" format={format} />
                            </Form.Item>
                            <Form.Item
                                label="End Time" 
                                name="end_time" 
                                labelAlign="left"
                                rules={[{ required:true, message:"Supplier is Required"}]}
                                >
                                    <TimePicker placeholder="HH:MM" format={format} />
                            </Form.Item>
                            </div>}
                            </div>
                            <div style={{marginTop:"20px"}}>
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
                            </div>
                            <div className="buttonset">
                            <Form.Item>
                                <Space>
                                <Popconfirm
                                        title="are you sure you want to save the data?"
                                        onConfirm={this.saveLcr}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                    <Button 
                                        type="primary" 
                                        // onClick={this.saveLcr} 
                                        disabled={!this.state.lcr_name || !this.state.lcr_type } 
                                    >Save</Button>
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

export default AddLCRProfile;