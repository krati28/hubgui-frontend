import React, { Component } from 'react';
import CreditService from "../../service/CreditService"
import history from "../../History";
import {Form, Input,InputNumber, Button, Select,Checkbox, DatePicker, Space, Popconfirm} from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import {NavLink} from "react-router-dom"
import {Breadcrumb} from "antd";

//import Column from 'antd/lib/table/Column';
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
var holder;

class AddCustomerProfile extends Component{
    constructor(props){
        super(props);
        this.state ={
        
            showbill:false,
            showthresholdlevel:false,
            profile_id:'',
            customer_id:'',
            
            credit_limit:'',
            customer_type:'',
            billing_cycle:'',
            cycle_days:'',
            billing_cycle_begin_date:'',
            billing_cycle_end_date:'',
            currency:'',
            auto_activate:'',
            auto_deactivate:'',
            threshold_type:'',
            threshold_value:'',
            threshold_value1:'',
            threshold_value2:'',
            threshold_value3:'',
            threshold_value4:'',
            threshold_message:'',
            threshold_message1:'',
            threshold_message2:'',
            threshold_message3:'',
            threshold_message4:'',
            msg:[],
            level:[],
            customer_list:[],
            threshold:[],
            threshold_level:'',
            threshold_id1:'',
            threshold_id2:'',
            threshold_id3:'',
            threshold_id4:'',
            message: null
        }
        this.saveProfile = this.saveProfile.bind(this);
        this.handleCustomertype = this.handleCustomertype .bind(this);
        this.handleBillingCycle = this.handleBillingCycle.bind(this);
        this.handleThresholdtype = this.handleThresholdtype .bind(this);
        this.handleCurrency=this.handleCurrency.bind(this);
        this.onDatechange=this.onDatechange.bind(this);
        this.onActivateCheck=this.onActivateCheck.bind(this);
        this.onDeactivateCheck=this.onDeactivateCheck.bind(this);
        this.handleCredit=this.handleCredit.bind(this);
        this.handlecustomer=this.handlecustomer.bind(this);
      
        this.formRef = React.createRef();
    }

    async componentDidMount(){
        this.loadProfile();
        let initialPlanets = [];
            fetch('http://localhost:8105/customerlist')
                .then(response => {
                    return response.json();
                }).then(data => {
                initialPlanets = data.result.map((name) => {
                    return name
                });
                this.setState({
                    customer_list: initialPlanets,
                });
                
            });
               
        }

    loadProfile() {
       
        CreditService.fetchProfileById(window.localStorage.getItem("profile_id"))
            .then((res) => {
                let profile = res.data.result;
                try{
                    let threshold=profile.threshold;
                    let threshold_one=threshold[0]
                    let threshold_two=threshold[1]
                    let threshold_three=threshold[2]
                    let threshold_four=threshold[3]
                    this.handleThresholdtype(profile.threshold_type);
                    this.handleCustomertype(profile.customer_type);
                    this.setState({
                    profile_id: profile.profile_id,
                    customer_id:profile.customer_id,
                    credit_limit:profile.credit_limit,
                    customer_type:profile.customer_type,
                    billing_cycle:profile.billing_cycle,
                    billing_cycle_begin_date:profile.billing_cycle_begin_date,
                    billing_cycle_end_date:profile.billing_cycle_end_date,
                    currency:profile.currency,
                    auto_activate:profile.auto_activate,
                    auto_deactivate:profile.auto_deactivate,
                    threshold_type:profile.threshold_type,
                    threshold_id1:JSON.parse(threshold_one["threshold_id"]),
                    threshold_id2:JSON.parse(threshold_two["threshold_id"]),
                    threshold_id3:JSON.parse(threshold_three["threshold_id"]),
                    threshold_id4:JSON.parse(threshold_four["threshold_id"]),
                    threshold_value1:JSON.parse(threshold_one["threshold_value"]),
                    threshold_value2:JSON.parse(threshold_two["threshold_value"]),
                    threshold_value3:JSON.parse(threshold_three["threshold_value"]),
                    threshold_value4:JSON.parse(threshold_four["threshold_value"]),
                    threshold_message1:threshold_one["threshold_message"],
                    threshold_message2:threshold_two["threshold_message"],
                    threshold_message3:threshold_three["threshold_message"],
                    threshold_message4:threshold_four["threshold_message"],
                }, () => console.log(this.state));
                switch(profile.customer_type){
                    case 1:profile.customer_type="Pre-Paid";break;
                    case 2:profile.customer_type="Post-Paid";break;
                }
                switch(profile.billing_cycle){
                    case 1:profile.billing_cycle="Weekly(7 days)";break;
                    case 2:profile.billing_cycle="Fortnight(14 days)";break;
                    case 3:profile.billing_cycle="Monthly(30 days)";break;
                    case 4:profile.billing_cycle="Custom";break;
                }
                switch(profile.currency){
                    case 1:profile.currency="EURO";break;
                    case 2:profile.currency="USD";break;
                }
                switch(profile.threshold_type){
                    case 1:profile.threshold_type="Percentage Usage";break;
                    case 2:profile.threshold_type="Remaining Usage Days";break;
                }

                this.formRef.current.setFieldsValue({
                    profile_id: profile.profile_id,
                    customer_id:profile.customer_id,
                    credit_limit:profile.credit_limit,
                    customer_type:profile.customer_type,
                    billing_cycle:profile.billing_cycle,
                    // billing_cycle_begin_date:profile.billing_cycle_begin_date,
                    // billing_cycle_end_date:profile.billing_cycle_end_date,
                    currency:profile.currency,
                    auto_activate:profile.auto_activate,
                    auto_deactivate:profile.auto_deactivate,
                    threshold_type:profile.threshold_type,
                    threshold_id1:JSON.parse(threshold_one["threshold_id"]),
                    threshold_id2:JSON.parse(threshold_two["threshold_id"]),
                    threshold_id3:JSON.parse(threshold_three["threshold_id"]),
                    threshold_id4:JSON.parse(threshold_four["threshold_id"]),
                    threshold_value1:JSON.parse(threshold_one["threshold_value"]),
                    threshold_value2:JSON.parse(threshold_two["threshold_value"]),
                    threshold_value3:JSON.parse(threshold_three["threshold_value"]),
                    threshold_value4:JSON.parse(threshold_four["threshold_value"]),
                    threshold_message1:threshold_one["threshold_message"],
                    threshold_message2:threshold_two["threshold_message"],
                    threshold_message3:threshold_three["threshold_message"],
                    threshold_message4:threshold_four["threshold_message"],
                });
            }
            catch(err)
                {console.log(err);}
        });
            
    }

    onReset = () => {
        this.formRef.current.resetFields();
    };
    onActivateCheck=(e)=>{
        var isChecked=e.target.checked;
        if(isChecked){
        this.state.auto_activate=1;}
        else{
            this.state.auto_activate=0;
        }
      
    }
    onDeactivateCheck=(e)=>{
        var isChecked=e.target.checked;
        if(isChecked){
        this.state.auto_deactivate=1;}
        else{
            this.state.auto_deactivate=0;
        }
   
    }
   
   
    
    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
        
    }
    onDatechange =(e) =>{
        this.setState({billing_cycle_begin_date:e});
        var days;
        if(this.state.billing_cycle==="1")
        days=6;
        else if(this.state.billing_cycle==="2")
        days=13;
        else if(this.state.billing_cycle==="3")
        days=29;
        
            
    }
    handlecustomer=(e)=>{
        this.setState({ customer_id: e });
    }
    handleCredit=(e)=>{
        this.setState({credit_limit:e});
    }
    
    handleCustomertype =(e) =>
    {
        this.setState({ customer_type: e });
        
    }
    
   
    handleBillingCycle =(e) =>
    {
           this.setState({ billing_cycle: e });
           if(e==="1"){
               this.state.cycle_days=7;
            
           }
           else if(e==="2"){
               this.state.cycle_days=14;
               
           }
           else if(e==="3"){
               this.state.cycle_days=30;
          
           }
           else if(e==="4"){
               this.state.showbill=true;
               this.state.cycle_days=this.state.billing_cycle_end_date-this.state.billing_cycle_begin_date;
           }
    } 
    
     handleThresholdtype =(e) =>
     { 
        this.setState({ threshold_type: e });
        this.state.showthresholdlevel=true;
        if(e==="1"){
            holder="Value in %"
        }
        else if(e==="2"){
            holder="Value in days"
        }
  
    }
    handleCurrency =(e) =>
    {
        this.setState({ currency: e });
    }

    

    saveProfile= (e) => {
       
            e.preventDefault();
            if(this.state.profile_id===''){
            var profile={profile_id:this.state.profile_id,customer_id:this.state.customer_id,credit_limit:this.state.credit_limit,
            customer_type:parseInt(this.state.customer_type),billing_cycle:parseInt(this.state.billing_cycle),cycle_days:this.state.cycle_days,
            billing_cycle_begin_date:this.state.billing_cycle_begin_date,billing_cycle_end_date:this.state.billing_cycle_end_date,
            threshold_type:parseInt(this.state.threshold_type),currency:parseInt(this.state.currency),auto_activate:this.state.auto_activate,auto_deactivate:this.state.auto_deactivate,
            threshold:[{threshold_id:this.state.threshold_id1,threshold_level:1,threshold_value:parseInt(this.state.threshold_value1),threshold_message:this.state.threshold_message1},
            {threshold_id:this.state.threshold_id2,threshold_level:2,threshold_value:parseInt(this.state.threshold_value2),threshold_message:this.state.threshold_message2},
            {threshold_id:this.state.threshold_id3,threshold_level:3,threshold_value:parseInt(this.state.threshold_value3),threshold_message:this.state.threshold_message3},
            {threshold_id:this.state.threshold_id4,threshold_level:4,threshold_value:parseInt(this.state.threshold_value4),threshold_message:this.state.threshold_message4},
            ]}
            
            CreditService.addProfile(profile)
            .then(res => {
                this.setState({message : 'added successfully.'});
                history.push('/environmentSetup-customerprofile');
            });
        }
        else if(this.state.profile_id!==''){
            var profile={profile_id:this.state.profile_id,customer_id:this.state.customer_id,credit_limit:parseInt(this.state.credit_limit),
            customer_type:parseInt(this.state.customer_type),billing_cycle:parseInt(this.state.billing_cycle),cycle_days:this.state.cycle_days,
            billing_cycle_begin_date:this.state.billing_cycle_begin_date,billing_cycle_end_date:this.state.billing_cycle_end_date,
            threshold_type:parseInt(this.state.threshold_type),currency:parseInt(this.state.currency),auto_activate:this.state.auto_activate,auto_deactivate:this.state.auto_deactivate,
            threshold:[{threshold_level:1,threshold_value:parseInt(this.state.threshold_value1),threshold_message:this.state.threshold_message1},
            {threshold_level:2,threshold_value:parseInt(this.state.threshold_value2),threshold_message:this.state.threshold_message2},
            {threshold_level:3,threshold_value:parseInt(this.state.threshold_value3),threshold_message:this.state.threshold_message3},
            {threshold_level:4,threshold_value:parseInt(this.state.threshold_value4),threshold_message:this.state.threshold_message4},
            ]}
            
            CreditService.editProfile(profile)
            .then(res => {
                this.setState({message : 'edited successfully.'});
                history.push('/environmentSetup-customerprofile');
            });
        }
            
            
    }
    render() {
       return(
            <div>
            <div className='topline'>Add Credit Profile</div>
            <div className="setcrumb">
            <Breadcrumb.Item> Environment Setup </Breadcrumb.Item>
                <Breadcrumb.Item key="customerProfile">
                    <NavLink to="/environmentSetup-customerprofile">Customer Credit Profile</NavLink>
                </Breadcrumb.Item>  
                <Breadcrumb.Item>Add Credit Profile Details</Breadcrumb.Item> 
            <div className="abc">
                <div className="formalign">
                
                <Form name="basic"  ref={this.formRef}
                initialValues={{ remember: true }}
                className="formset" {...formItemLayout}>
                
                <Form.Item 
                label = "Customer Name" 
                name = "customer_name"
                labelAlign="left"
                rules = {[{required:true,
                           message:"Please Select Customer"
                        }]}>
                        <Select placeholder="--select--" labelAlign="left" style={{width:"300px"}} onChange={this.handlecustomer}>
                            {this.state.customer_list.map((test) => <Option value={test.customer_id}> {test.name} </Option> )}
                        </Select>
                </Form.Item>
                <Form.Item 
                label = "Credit Limit"
                name = "credit_limit"
                labelAlign="left"
                rules = {[{ required: true,message:"Please Enter Credit limit"},
                        {type:"number",min:0,message:"Please enter valid positive number"}
                        ]}
                    >
                    <InputNumber 
                        className="inputset"
                        labelAlign="left"
                        min={0} 
                        max={100000} 
                        defaultValue={2000} 
                        onChange={this.handleCredit} 
                    />
                
                </Form.Item>
                <Form.Item
                label = "Customer Type"
                name="customer_type" 
                labelAlign="left"
                rules={[{required:true,
                         message:"Please Select Customer Type"
                }]}>
                    <Select placeholder="--Select Customer Type--"  
                    labelAlign="left" style={{width:"300px"}} onChange={this.handleCustomertype}>
                        <Option value="1">Pre-Paid</Option>
                        <Option value="2">Post-Paid</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                label = "Billing Cycle"
                name = "billing_cycle" 
                labelAlign="left"
                rules={[{required:true,
                         message:"Please Select Billing Cycle"
                }]}>
                    <Select placeholder="--Select Billing Cycle--"  
                    labelAlign="left" style={{width:"300px"}} onChange={this.handleBillingCycle}>
                        <Option value="1">Weekly(7 days)</Option>
                        <Option value="2">Fortnight(14 days)</Option>
                        <Option value="3">Monthly(30 days)</Option>
                        <Option value="4">Custom</Option>
                    </Select>

                </Form.Item>
                
                <Form.Item 
                label = "BillingCycle Begin Date"
                name ="billing_cycle_begin_date" 
                labelAlign="left"
                type="date"
                rules={[{required:true,
                         message:"Please Select BillingCycle Begin Date "
                    }]}>
                <DatePicker 
                        labelAlign="left"
                        name="billing_cycle_begin_date"
                        value={this.state.billing_cycle_begin_date}
                        onChange={this.onDatechange}/>
                   
                </Form.Item>
                
                {this.state.showbill&&
                <Form.Item 
                label="Billing Cycle End Date"
                name ="billing_cycle_end_date" 
                labelAlign="left"
                rules={[{required:true}]}>
                    <DatePicker labelAlign="left"   onChange={this.onChange}/>
                
                </Form.Item>
                }
               
                <Form.Item 
                label = "Threshold Type" 
                labelAlign="left"
                name="threshold_type" 
                rules={[{required:true,
                         message:"Please Select Threshold Type "
                }]} >
                    <Select placeholder="--select--" labelAlign="left" style={{width:"300px"}}
                    onChange={this.handleThresholdtype} >
                    <Option value="1">Percentage Usage</Option>
                    <Option value="2">Remaining Usage Days</Option>
                    
                    </Select>
                </Form.Item>
                {this.state.showthresholdlevel &&
                <Form.Item 
                label = "Threshold level 1"
                name = "threshold_value1"
                rules = {[{ required: true,
                            message:"Please Enter Threshold value,Message"
                }]} 
                labelAlign="left">
           
                    <Input 
                        type="text" 
                        className="inputset"
                        name="threshold_value1" 
                        labelAlign="left" 
                        //style={{width:"100px"}}
                        placeholder={holder}
                        value={this.state.threshold_value1} 
                        onChange={this.onChange} 
                    />
                    <Input 
                        type="text" 
                        className="inputset"
                        name="threshold_message1" 
                        labelAlign="left"
                        //style={{width:"180px"}} 
                        placeholder="Message"
                        value={this.state.threshold_message1} 
                        onChange={this.onChange} 
                    />
                </Form.Item>
                }
                {this.state.showthresholdlevel &&
                <Form.Item 
                label = "Threshold level 2"
                name = "threshold_value2"
                rules = {[{ required: true,
                            message:"Please Enter Threshold value,Message"
                }]} 
                labelAlign="left">
           
                    <Input 
                        type="text" 
                        className="inputset"
                        name="threshold_value2" 
                        labelAlign="left" 
                        //style={{width:"100px"}}
                        placeholder={holder}
                        value={this.state.threshold_value2} 
                        onChange={this.onChange} 
                    />
                    <Input 
                        type="text" 
                        className="inputset"
                        name="threshold_message2" 
                        labelAlign="left"
                        //style={{width:"180px"}} 
                        placeholder="Message"
                        value={this.state.threshold_message2} 
                        onChange={this.onChange} 
                    />
                </Form.Item>
                }
                {this.state.showthresholdlevel &&
                <Form.Item 
                label = "Threshold level 3"
                name = "threshold_value3"
                rules = {[{ required: true,
                            message:"Please Enter Threshold value,Message"
                }]} 
                labelAlign="left">
           
                    <Input 
                        type="text" 
                        className="inputset"
                        name="threshold_value3" 
                        labelAlign="left" 
                        //style={{width:"100px"}}
                        placeholder={holder}
                        value={this.state.threshold_value3} 
                        onChange={this.onChange} 
                    />
                    <Input 
                        type="text" 
                        className="inputset"
                        name="threshold_message3" 
                        labelAlign="left"
                        //style={{width:"180px"}} 
                        placeholder="Message"
                        value={this.state.threshold_message3} 
                        onChange={this.onChange} 
                    />
                </Form.Item>
                }
                {this.state.showthresholdlevel &&
                <Form.Item 
                label = "Threshold level 4"
                name = "threshold_value4"
                rules = {[{ required: true,
                             message:"Please Enter Threshold value,Message"
                }]} 
                labelAlign="left">
           
                    <Input 
                        type="text" 
                        className="inputset"
                        name="threshold_value4" 
                        labelAlign="left" 
                        //style={{width:"100px"}}
                        placeholder={holder}
                        value={this.state.threshold_value4} 
                        onChange={this.onChange} 
                    />
                    <Input 
                        type="text" 
                        className="inputset"
                        name="threshold_message4" 
                        labelAlign="left"
                        //style={{width:"180px"}} 
                        placeholder="Message"
                        value={this.state.threshold_message4} 
                        onChange={this.onChange} 
                    />
                </Form.Item>
                }
                <Form.Item 
                label="Currency"
                labelAlign="left" 
                name="currency"  
                rules={[{required:true,
                        message:"Please Select Currency"
                }]}>
                <Select placeholder="--select--" labelAlign="left" style={{width:"300px"}}
                onChange={this.handleCurrency}>
                    <Option value="1">EURO</Option>
                    <Option value="2">USD</Option>
                    
                    </Select>
                </Form.Item>
                <Form.Item 
                label="Activation"
                labelAlign="left"
                rules={[{required:true}]}>
                    <CheckboxGroup>
                    <Checkbox onChange={this.onActivateCheck}>Auto Activate</Checkbox><br></br>
                    <Checkbox onChange={this.onDeactivateCheck}>Auto Deactivate</Checkbox>
                    </CheckboxGroup>       
                </Form.Item>

                
                
                <div className="buttonset">
                <Form.Item > 
                <Space>
                <Popconfirm
                    title="Do you want to Add record "
                    onConfirm={this.saveProfile}
                    okText="Yes"
                    cancelText="No"
                >
                <Button 
                    type="primary" 
                    disabled={!this.state.customer_id || !this.state.credit_limit||
                    !this.state.customer_type||!this.state.currency|| !this.state.billing_cycle||
                    !this.state.billing_cycle_begin_date
                }
                    // onClick={this.saveProfile} 
                >Save</Button>
                </Popconfirm>
                <Popconfirm
                    title="Do you want to reset fields"
                    onConfirm={this.onReset}
                    okText="Yes"
                    cancelText="No"
                >
                <Button 
                    // type="primary" 
                    //onClick={this.onReset} 
                >Clear</Button> 
                </Popconfirm>
                <Popconfirm
                    title="Do you want to cancel submission"
                    onConfirm={() => this.props.history.push('/environmentSetup-customerprofile')}
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
            </div>
        );
    }
}

export default  AddCustomerProfile;

