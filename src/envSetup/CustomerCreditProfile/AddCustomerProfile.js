import React, { Component } from 'react';
import CreditService from "../../service/CreditService"
import history from "../../History";
import {Form, Input,InputNumber, Button, Select, Typography, Table, Checkbox, DatePicker, Space, Popconfirm} from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import moment from 'moment';
//import Column from 'antd/lib/table/Column';
const {Option} = Select;
const dateFormat='YYYY/MM/DD';

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
            //customer_name:'',
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
            threshold_level:'',
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
        //this.setState({config:{[e.target.name]: e.target.value}});
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
        var d=Date.parse(this.state.billing_cycle_begin_date);
        console.log(this.state.billing_cycle_begin_date);
        var result = new Date(d);
        result.setDate(result.getDate() + days);
        this.state.billing_cycle_end_date=result;
        console.log( result);
            
    }
    handlecustomer=(e)=>{
        this.setState({ customer_id: e });
    }
    handleCredit=(e)=>{
        this.setState({credit_limit:e});
    }
    
    // onthreshold=(e)=>{
    //     this.setState({[e.target.name]: e.target.value});
    //     this.state.level.push(e.target.value);
    //     
    //     //this.state.msg.push(e.target.value);
    // }

    
    handleCustomertype =(e) =>
    {
        this.setState({ customer_type: e });
        
    }
    
   
    handleBillingCycle =(e) =>
    {
           this.setState({ billing_cycle: e });
           if(e==="1"){
               this.state.cycle_days=7;
            //    this.billing_cycle_end_date=this.handleenddate(this.state.billing_cycle_begin_date,6);
           }
           else if(e==="2"){
               this.state.cycle_days=14;
               //this.state.billing_cycle_end_date=this.handleenddate(this.state.billing_cycle_begin_date,13);
           }
           else if(e==="3"){
               this.state.cycle_days=30;
               //this.state.billing_cycle_end_date=this.handleenddate(this.state.billing_cycle_begin_date,29);
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

    async componentDidMount(){
    let initialPlanets = [];
        fetch('http://localhost:8101/customer')
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

    saveProfile= (e) => {
       
            e.preventDefault();
            var profile={profile_id:this.state.profile_id,customer_id:this.state.customer_id,credit_limit:parseInt(this.state.credit_limit),
            customer_type:parseInt(this.state.customer_type),billing_cycle:this.state.billing_cycle,cycle_days:this.state.cycle_days,
            billing_cycle_begin_date:this.state.billing_cycle_begin_date,billing_cycle_end_date:this.state.billing_cycle_end_date,
            threshold_type:parseInt(this.state.threshold_type),currency:parseInt(this.state.currency),auto_activate:this.state.auto_activate,auto_deactivate:this.state.auto_deactivate}
        
           var threshold={profile_profile_id:profile.profile_id,threshold_level:1,threshold_value:parseInt(this.state.threshold_value1),
             threshold_message:this.state.threshold_message1}
            // for(var i=1;i<=4;i++){
            // var threshold={profile_id:this.state.profile_id,threshold_level:parseInt(i),threshold_value:parseInt(this.state.level.shift()),
            // threshold_message:this.state.msg.shift()} 
            // CreditService.addThreshold(threshold)
            // .then(res => {
            //     this.setState({message : 'added successfully.'});});
            CreditService.addProfile(profile)
            .then(res => {
                CreditService.addThreshold(threshold)
            .then(res => {
                this.setState({message : 'added successfully.'});});
                this.setState({message : 'added successfully.'});
                //appends the /students to localhost:3000 url and hence lists out all the data
            history.push('/environmentSetup-customerprofile');
            });
            
    }
    render() {
       return(
            <div>
            <div className='topline'>Add Credit Profile</div>
              <div className="abc">
                <div className="formalign">
                
                <Form name="basic"  ref={this.formRef}
                initialValues={{ remember: true }}
                className="formset" {...formItemLayout}>
                
                <Form.Item 
                label = "Customer Name" 
                name = "customer_name"
                labelAlign="left"
                rules = {[{required:true}]}>
                    <Select placeholder="--select--" labelAlign="left" style={{width:"300px"}} onChange={this.handlecustomer}>
                    {this.state.customer_list.map((test) => <Option value={test.customer_id}> {test.name} </Option> )}
                    </Select>
                </Form.Item>
                <Form.Item 
                label = "Credit Limit"
                name = "credit_limit"
                labelAlign="left"
                rules = {[{ required: true}]}>
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
                rules={[{required:true}]}>
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
                rules={[{required:true}]}>
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
                rules={[{required:true}]}>
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
                rules={[{required:true}]} >
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
                rules = {[{ required: true}]} 
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
                rules = {[{ required: true}]} 
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
                rules = {[{ required: true}]} 
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
                rules = {[{ required: true}]} 
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
                rules={[{required:true}]}>
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
                    //onClick={this.saveProfile} 
                >Save</Button>
                </Popconfirm>
                <Popconfirm
                    title="Do you want to reset fields"
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
                    title="Do you want to cancel submission"
                    onConfirm={() => this.props.history.push('/environmentSetup-customerprofile')}
                    okText="Yes"
                    cancelText="No"
                >
                <Button 
                    type="danger" 
                    //onClick={() => this.props.history.push('/environmentSetup-customerprofile')}
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

export default  AddCustomerProfile;
