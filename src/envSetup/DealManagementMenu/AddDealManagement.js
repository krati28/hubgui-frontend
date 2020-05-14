import {NavLink} from "react-router-dom"
import React, { Component } from 'react';
import { Form, Input, DatePicker, Select, Button, InputNumber, Space, Popconfirm, Breadcrumb} from 'antd';
import history from "../../History";
import '../../styling/Styletable.css';
import DealService from '../../service/DealService';

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
class AddDealManagement extends Component{

    constructor(props){
        super(props);
        this.state={
            id:'',
            name: '',
            validity_prd: '',
            rate: '',
            start_date:'',
            type:'',
            options:'',
            value:'',
            message:null,

            //dropdowns
            customerDropdown:'',
            customerList:[],
            supplierList:[],
            remainingDropdownList:[],

            showCustomer:false,
            showSupplier:false,
            showSourceOperator:false,
            showSourceCountry:false,
            showDestCountry:false,
            showDestOperator: false
        }
        this.saveDealMgmt = this.saveDealMgmt.bind(this);
        //Dropdowm
        this.handleDropdownDealType = this.handleDropdownDealType.bind(this);
        this.handleChangeDealOption = this.handleChangeDealOption.bind(this);
        //inputs
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.onChangeRate = this.onChangeRate.bind(this);
        this.onChangePeriod = this.onChangePeriod.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        
        this.loadDealManagement = this.loadDealManagement.bind(this);
        this.formRef = React.createRef();
    }

    componentDidMount(){
        this.loadDealManagement();

        //for customer dropdowm
        let allCustomers = [];
        fetch('http://localhost:8105/customer')
            .then(response => {
                return response.json();
            }).then(data => {
            allCustomers = data.result.map((name) => {
                return name ;
            });
            this.setState({
                customerList: allCustomers,
            });
        });

        //for supplier dropdown
        let allSuppliers = [];
        fetch('http://localhost:8105/supplier')
            .then(response => {
                return response.json();
            }).then(data => {
            allSuppliers = data.result.map((name) => {
                return name ;
            });
            this.setState({
                supplierList: allSuppliers,
            });
        });

        let remainingDropdown = [];
        fetch('http://localhost:8105/operator')
            .then(response => {
                return response.json();
            }).then(data => {
            remainingDropdown = data.result.map((operator_name) => {
                return operator_name ;
            });
            this.setState({
                remainingDropdownList: remainingDropdown,
            });
        });

    }

    loadDealManagement(){ 
        DealService.fetchDealById(window.localStorage.getItem("id"))
            .then((res) => {
                let deals = res.data.result;
                try{
                this.handleDropdownDealType(deals.type);
                this.setState({
                    id:deals.id,
                    name:deals.name,
                    validity_prd:deals.validity_prd,
                    rate:deals.rate,
                    start_date:deals.start_date,
                    type:deals.type,
                    options:deals.options,
                    value:deals.value
                }); 

                switch(deals.type){
                    case 1: deals.type="Customer"; break;
                    case 3: deals.type="Supplier"; break;
                    case 4: deals.type="Source Operator"; break;
                    case 5: deals.type="Source Country"; break;
                    case 6: deals.type="Customer and Destination Country";  break;
                    case 7: deals.type="Customer and Destination Operator";  break;
                    case 8: deals.type="Supplier and Destination Country"; break;
                    case 9: deals.type="Supplier and Destination Operator"; break;
                }

                switch(deals.options){
                    case 1: deals.options="Revenue Based"; break;
                    case 2: deals.options="Cost Based"; break;
                    case 3: deals.options="Volume Based"; break;
                }
                
                this.formRef.current.setFieldsValue({
                    id:deals.id,
                    name:deals.name,
                    validity_prd:deals.validity_prd,
                    rate:deals.rate,
                    // start_date:deals.start_date,
                    type:deals.type,
                    options:deals.options,
                    value:deals.value
                });
            }
            catch(err){console.log(err)}
            })
    }

    onChange = (e) => {this.setState({[e.target.name]: e.target.value})}

    onChangePeriod = (e) => {this.setState({validity_prd : e})}
    onChangeValue(e){this.setState({value : e})}
    onChangeRate(e){this.setState({rate:e})}
    handleChangeDate(e){this.setState({start_date: e})}

    handleChangeDealOption= (e) => { this.setState({options:e})}

    handleDropdownDealType =(e) => {
        this.setState({ type: e});
        if(e === "1"){
            this.setState({ 
                showCustomer: true, 
                showSupplier: false, 
                showSourceOperator: false, 
                showSourceCountry: false,
                showDestCountry:false,
                showDestOperator: false
            })
        }
        else if(e === "3"){
            this.setState({
                showCustomer: false, 
                showSupplier: true, 
                showSourceOperator: false, 
                showSourceCountry: false,
                showDestCountry:false,
                showDestOperator: false,
            })
        }
        else if(e === "4"){
            this.setState({
                showCustomer: false, 
                showSupplier: false, 
                showSourceOperator: true, 
                showSourceCountry: false,
                showDestCountry:false,
                showDestOperator: false,
            })
        }
        else if(e === "5"){
            this.setState({
                showCustomer: false, 
                showSupplier: false, 
                showSourceOperator: false, 
                showSourceCountry: true,
                showDestCountry:false,
                showDestOperator: false,
            })
        }
        else if(e === "6"){
            this.setState({
                showCustomer: true, 
                showSupplier: false, 
                showSourceOperator: false, 
                showSourceCountry: false,
                showDestCountry:true,
                showDestOperator: false
            })
        }
        else if(e === "7"){
            this.setState({
                showCustomer: true, 
                showSupplier: false, 
                showSourceOperator: false, 
                showSourceCountry: false,
                showDestCountry:false,
                showDestOperator: true
            })
        }
        else if(e === "8"){
            this.setState({
                showCustomer: false, 
                showSupplier: true, 
                showSourceOperator: false, 
                showSourceCountry: false,
                showDestCountry:true,
                showDestOperator: false
            })
        }
        else if(e === "9"){
            this.setState({
                showCustomer: false, 
                showSupplier: true, 
                showSourceOperator: false, 
                showSourceCountry: false,
                showDestCountry:false,
                showDestOperator: true,
            })
        }
    }

    onReset = () => {
        this.formRef.current.resetFields();
    }

    saveDealMgmt = (e) => {
        e.preventDefault();
        let deal_data = {id: this.state.id, name: this.state.name, validity_prd: this.state.validity_prd,
                    rate:this.state.rate, start_date:this.state.start_date, type:( parseInt(this.state.type)) ,
                    options:(parseInt( this.state.options)), value:this.state.value
                    };
            DealService.addDeal(deal_data)
                    .then(res => {
                        console.log(this.state.value);
                // console.log(this.state.value);
                // console.log(this.state.start_date);
                this.setState({message : 'Deal added successfully.'});
                history.push('/environmentSetup-dealManagement');
            })
    }

    render(){
        return(
            <div >
                
                <div className='topline'>
                    Add Deal Management
                </div>

                <div className="setcrumb">
                    <Breadcrumb.Item> Environment Setup </Breadcrumb.Item>
                    <Breadcrumb.Item key="dealManagement">
                        <NavLink to="/environmentSetup-dealManagement">Deal Management</NavLink>
                    </Breadcrumb.Item>  
                    <Breadcrumb.Item>Add Deal Management</Breadcrumb.Item>
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
                            <Form.Item  //deal name
                                label="Deal Name"
                                name="name" 
                                labelAlign="left"
                                
                                rules={[{
                                    required:true, 
                                    message:"Deal Name is required",
                                },
                                {
                                    required:true,
                                    pattern:"[A-Za-z_ ]+$",
                                    message:"Only alphabets underscore and white spaces"
                                },
                                {
                                    require:true,
                                    max:20,
                                    message:"Maximum number of characters can't exceed 20"
                                }]}
                                >
                                    <Input 
                                        className="inputset" 
                                        type="text" 
                                        labelAlign="left"
                                        placeholder="Enter Deal Name"
                                        name="name"
                                        maxLength="20"
                                        value={this.state.name}
                                        onChange={this.onChange} />
                            </Form.Item>

                            <Form.Item  //val period   
                                label="Val Period" 
                                name="validity_prd" 
                                labelAlign="left"
                                rules={[
                                    {   required:true,
                                        message:"Validity Period is required"
                                    },
                                    {
                                        type:'number',
                                        required:true,
                                        min:1,
                                        message:"Please enter a value greater than zero"
                                    }
                                ]}
                                >
                                    <InputNumber 
                                        labelAlign="left" 
                                        className="inputset" 
                                        placeholder="Enter validity period in seconds" 
                                        name="validity_prd"
                                        value={this.state.validity_prd}
                                        onChange={this.onChangePeriod} />
                            </Form.Item>

                            <Form.Item  //deal rate
                                label="Deal Rate" 
                                name="rate" 
                                labelAlign="left"
                                rules={[
                                    {
                                        required:true, 
                                        message:"Deal Rate is required"
                                    },
                                    {
                                        type:'number',
                                        required:true,
                                        min:0,
                                        message:"Please enter only positive value"
                                    }
                                ]}
                                >
                                    <InputNumber
                                        placeholder="Enter Deal Rate"
                                        labelAlign="left" 
                                        className="inputset" 
                                        name="rate"
                                        value={this.state.rate}
                                        onChange={this.onChangeRate} />
                            </Form.Item>

                            <Form.Item //start date  
                                label="Start Date" 
                                name="start_date" 
                                labelAlign="left"
                                type="date"
                                rules={[{required:true, message:"Start Date is required"}
                                ]}
                                >
                                    <DatePicker 
                                        labelAlign="left"
                                        name="start_date"
                                        value={this.state.start_date}
                                        onChange={this.handleChangeDate} />
                            </Form.Item>

                            <Form.Item // deal type  working
                                label="Deal Type" 
                                name="type" 
                                labelAlign="left" 
                                rules={[{ required:true, message:"Deal Type is Required"}]}
                                >
                                    <Select 
                                        placeholder="Select Deal Type..." 
                                        style={{width:"300px"}} 
                                        onChange={this.handleDropdownDealType}
                                        labelAlign="left">
                                        <Option value="1">Customer</Option>
                                        <Option value="3">Supplier</Option>
                                        <Option value="4">Source Operator</Option>
                                        <Option value="5">Source Country</Option>
                                        <Option value="6">Customer and Destination Country</Option>
                                        <Option value="7">Customer and Destination Operator</Option>
                                        <Option value="8">Supplier and Destination Country</Option>
                                        <Option value="9">Supplier and Destination Operator</Option>
                                    </Select>
                            </Form.Item>
                            
                            {this.state.showCustomer &&  //customer url:(/customer)
                            <Form.Item
                                label="Customer" 
                                name="customerDropdown" 
                                labelAlign="left"
                                rules={[{ required:true, message:"Customer is Required"}]}
                                >
                                    <Select 
                                        placeholder="Select a Customer..." 
                                        style={{width:"300px"}} >
                                        {
                                            this.state.customerList.map(( nimish) => 
                                            <Option value={nimish.customer_id}> {nimish.name} </Option> )
                                        }
                                    </Select>
                            </Form.Item>}

                            {this.state.showSupplier && //supplier  url:(/supplier)
                            <Form.Item
                                label="Supplier" 
                                name="supplierDrop" 
                                labelAlign="left"
                                rules={[{ required:true, message:"Supplier is Required"}]}
                                >
                                    <Select 
                                        placeholder="Select a Supplier..." 
                                        style={{width:"300px"}} >
                                        {
                                            this.state.supplierList.map(( nimish) => 
                                            <Option value={nimish.customer_id}> {nimish.name} </Option> )
                                        }
                                    </Select>
                            </Form.Item>}
                            
                            {this.state.showSourceOperator && //souce operator  url:(/operator)
                            <Form.Item
                                label="Source Operator" 
                                name="sourceOperator" 
                                labelAlign="left"
                                rules={[{ required:true, message:"Source Operator is Required"}]}
                                >
                                    <Select 
                                        placeholder="Select Source Operator..." 
                                        style={{width:"300px"}} >
                                    {
                                        this.state.remainingDropdownList.map(( nimish) => 
                                        <Option value={nimish.operator_id}> {nimish.operator_name} { ": "}{nimish.mcc_mnc}</Option> )
                                    }
                                    </Select>
                            </Form.Item>}

                            {this.state.showSourceCountry &&  //source country  url:(/operator)
                            <Form.Item
                                label="Source Country" 
                                name="sourceCountry" 
                                labelAlign="left"
                                rules={[{ required:true, message:"Source Country is Required"}]}
                                >
                                    <Select 
                                        placeholder="Select Source Country..." 
                                        style={{width:"300px"}} >
                                    {
                                        this.state.remainingDropdownList.map(( nimish) => 
                                        <Option value={nimish.operator_id}> {nimish.country_name}{" : "} {nimish.mcc_mnc} </Option> )
                                    }
                                    </Select>
                            </Form.Item>}

                            {this.state.showDestCountry &&  //destination country url:(/operator)
                            <Form.Item
                                label="Destination Country" 
                                name="destinationCountry" 
                                labelAlign="left"
                                rules={[{ required:true, message:"Destination Country is Required"}]}
                                >
                                    <Select 
                                        placeholder="Select Destination Country..." 
                                        style={{width:"300px"}} >
                                    {
                                        this.state.remainingDropdownList.map(( nimish) => 
                                        <Option value={nimish.operator_id}> {nimish.country_name}{" : "} {nimish.mcc_mnc} </Option> )
                                    }
                                    </Select>
                            </Form.Item>}

                            {this.state.showDestOperator &&   //destination operator url:(/operator)
                            <Form.Item
                                label="Destination Operator" 
                                name="destinationOperator" 
                                labelAlign="left"
                                rules={[{ required:true, message:"Destination Operator is Required"}]}
                                >
                                    <Select 
                                        placeholder="Select Destination Operator..." 
                                        style={{width:"300px"}} >
                                        {
                                            this.state.remainingDropdownList.map(( nimish) => 
                                            <Option value={nimish.operator_id}> {nimish.operator_name} { ": "}{nimish.mcc_mnc}</Option> )
                                        }
                                    </Select>
                            </Form.Item>}

                            <Form.Item  //deal options  working
                                label="Deal Options" 
                                name="options" 
                                labelAlign="left"
                                
                                rules={[{ required:true, message:"Deal Options is Required"}]}
                                >
                                <Select 
                                    placeholder="Select a Deal Option..." 
                                    onChange={this.handleChangeDealOption}
                                    style={{width:"300px"}}>
                                        <Option value="1">Revenue Based</Option>
                                        <Option value="2">Cost Based</Option>
                                        <Option value="3">Volume Based</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item  //deal value
                                label="Deal Value" 
                                name="value" 
                                labelAlign="left"
                                rules={[
                                    { 
                                        required:true, 
                                        message:"Deal Value is Required"
                                    },
                                    {
                                        type:'number',
                                        required:true,
                                        min:0,
                                        message:"Please enter only positive value"
                                    }
                                ]}
                                >
                                    <InputNumber
                                        placeholder="Enter Deal Value"
                                        labelAlign="left" 
                                        className="inputset" 
                                        name="value"
                                        value={this.state.value}
                                        onChange={this.onChangePeriod}
                                        >
                                    </InputNumber>
                                    
                            </Form.Item>
                            
                                {/* Buttons */}
                                <div className="buttonset">
                            <Form.Item>  
                                
                                <Space>

                                    <Popconfirm
                                        title="Do you want to Add the record"
                                        onConfirm={this.saveDealMgmt}
                                        okText="Yes"
                                        cancelText="No"
                                        >

                                        <Button  type="primary"
                                                // disabled={!this.state.name || !this.state.validity_prd || !this.state.rate
                                                //     || !this.state.start_date || !this.state.type || !this.state.options
                                                //     || !this.state.value}
                                                    >
                                                {/* // disabled={  !this.state.type}
                                                // disabled={!this.state.name}
                                                > */}
                                            Save
                                        </Button>
                                    </Popconfirm>

                                    <Popconfirm
                                       title="Do you want to reset the fields"
                                       onConfirm={this.onReset}
                                       okText="Yes"
                                       cancelText="No">

                                        <Button type="default">
                                            Clear
                                        </Button>
                                    </Popconfirm>

                                    <Popconfirm 
                                        title="Do you want to cancel"
                                        onConfirm={()=>this.props.history.push('/environmentSetup-dealManagement')}
                                        okText="Yes"
                                        cancelText="No"
                                        >
                                        <Button type="danger" >
                                            Cancel
                                        </Button>
                                    </Popconfirm>

                                </Space>
                               
                            </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
               
            </div>
        )
    }
}

export default AddDealManagement;
