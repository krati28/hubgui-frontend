import React, { Component } from 'react';
import {Typography, Form, Input, DatePicker, Select, Button, InputNumber, Space, Card} from 'antd';
import history from "../../History";

import '../../styling/Styletable.css';

const {Title} = Typography;
const {Option} = Select;

class AddDealManagement extends Component{

    constructor(){
        super();
        this.state={
            dealName: '',
            valPeriod: '',
            dealRate: '',
            startDate:'',
            dealType:'',
            dealOptions:'',
            dealValue:'',
            message:null,

            showCustomer:false,
            showSupplier:false,
            showSourceOperator:false,
            showSourceCountry:false,
            showDestCountry:false,
            showDestOperator: false
        }
        this.handleDropdownDealType = this.handleDropdownDealType.bind(this)
    }

    handleDropdownDealType =(e) => {
        this.setState({ dealType: e});
        if(e === "customer"){
            this.setState({ 
                showCustomer: true, 
                showSupplier: false, 
                showSourceOperator: false, 
                showSourceCountry: false,
                showDestCountry:false,
                showDestOperator: false
            })
        }
        else if(e === "supplier"){
            this.setState({
                showCustomer: false, 
                showSupplier: true, 
                showSourceOperator: false, 
                showSourceCountry: false,
                showDestCountry:false,
                showDestOperator: false,
            })
        }
        else if(e === "source_operator"){
            this.setState({
                showCustomer: false, 
                showSupplier: false, 
                showSourceOperator: true, 
                showSourceCountry: false,
                showDestCountry:false,
                showDestOperator: false,
            })
        }
        else if(e === "source_country"){
            this.setState({
                showCustomer: false, 
                showSupplier: false, 
                showSourceOperator: false, 
                showSourceCountry: true,
                showDestCountry:false,
                showDestOperator: false,
            })
        }
        else if(e === "customer_dest_country"){
            this.setState({
                showCustomer: true, 
                showSupplier: false, 
                showSourceOperator: false, 
                showSourceCountry: false,
                showDestCountry:true,
                showDestOperator: false
            })
        }
        else if(e === "customer_dest_operator"){
            this.setState({
                showCustomer: true, 
                showSupplier: false, 
                showSourceOperator: false, 
                showSourceCountry: false,
                showDestCountry:false,
                showDestOperator: true
            })
        }
        else if(e === "supplier_dest_country"){
            this.setState({
                showCustomer: false, 
                showSupplier: true, 
                showSourceOperator: false, 
                showSourceCountry: false,
                showDestCountry:true,
                showDestOperator: false
            })
        }
        else if(e === "supplier_dest_operator"){
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
    render(){
        return(
            <div >
                {/* <Card style={{width:"50%"}}> */}
                
          <div className='topline'>Add Deal Management</div>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    className="formset"
                >
                    <Form.Item  //deal name
                        label="Deal Name" name="dealName"
                        rules={[{required:true, message:"Deal Name is required"}]}
                        >
                            <Input className="inputset" type="text" ></Input>
                    </Form.Item>

                    <Form.Item  //val period
                        label="Val Period" name="valPeriod"
                        rules={[{required:true, message:"Validity Period is required"}]}
                        >
                            <InputNumber className="inputset" placeholder="Enter validity period in seconds" type="text"></InputNumber>
                    </Form.Item>

                    <Form.Item  //deal rate
                        label="Deal Rate" name="dealRate"
                        rules={[{required:true, message:"Deal Rate is required"}]}
                        >
                            <Input  className="inputset" type="text"></Input>
                    </Form.Item>

                    <Form.Item //start date
                        label="Start Date" name="startDate"
                        rules={[{required:true, message:"Start Date is required"}]}
                        >
                            <DatePicker></DatePicker>
                    </Form.Item>

                    <Form.Item // deal type
                        label="Deal Type" name="dealType"
                        rules={[{ required:true, message:"Deal Type is Required"}]}
                        >
                            <Select placeholder="Select Deal Type..." style={{width:"300px"}} onChange={this.handleDropdownDealType}>
                                <Option value="customer">Customer</Option>
                                <Option value="supplier">Supplier</Option>
                                <Option value="source_operator">Source Operator</Option>
                                <Option value="source_country">Source Country</Option>
                                <Option value="customer_dest_country">Customer and Destination Country</Option>
                                <Option value="customer_dest_operator">Customer and Destination Operator</Option>
                                <Option value="supplier_dest_country">Supplier and Destination Country</Option>
                                <Option value="supplier_dest_operator">Supplier and Destination Operator</Option>
                            </Select>
                    </Form.Item>
                    
                    {this.state.showCustomer &&  //customer
                    <Form.Item
                        label="Customer" name="customerDropdown"
                        rules={[{ required:true, message:"Customer is Required"}]}
                        >
                            <Select>
                                <Option>To be added</Option>
                            </Select>
                    </Form.Item>}

                    {this.state.showSupplier && //supplier
                    <Form.Item
                        label="Supplier" name="supplierDrop"
                        rules={[{ required:true, message:"Supplier is Required"}]}
                        >
                            <Select>
                                <Option>To be added</Option>
                            </Select>
                    </Form.Item>}
                    
                    {this.state.showSourceOperator && //souce operator
                    <Form.Item
                        label="Source Operator" name="sourceOperator"
                        rules={[{ required:true, message:"Source Operator is Required"}]}
                        >
                            <Select>
                                <Option>To be added</Option>
                            </Select>
                    </Form.Item>}

                    {this.state.showSourceCountry &&  //source country
                    <Form.Item
                        label="Source Country" name="sourceCountry"
                        rules={[{ required:true, message:"Source Country is Required"}]}
                        >
                            <Select>
                                <Option>To be added</Option>
                            </Select>
                    </Form.Item>}

                    {this.state.showDestCountry &&  //destination country
                    <Form.Item
                        label="Destination Country" name="destinationCountry"
                        rules={[{ required:true, message:"Destination Country is Required"}]}
                        >
                            <Select>
                                <Option>To be added</Option>
                            </Select>
                    </Form.Item>}

                    {this.state.showDestOperator &&   //destination operator
                    <Form.Item
                        label="Destination Operator" name="destinationOperator"
                        rules={[{ required:true, message:"Destination Operator is Required"}]}
                        >
                            <Select>
                                <Option>To be added</Option>
                            </Select>
                    </Form.Item>}

                    <Form.Item  //deal options
                        label="Deal Options" name="dealOptions"
                        rules={[{ required:true, message:"Deal Options is Required"}]}
                        >
                            <Select placeholder="Select"
                            style={{width:"300px"}}>
                                <Option value="revenue_bases">Revenue Based</Option>
                                <Option value="cost_based">Cost Based</Option>
                                <Option value="volume_based">Volume Based</Option>
                            </Select>
                    </Form.Item>

                    <Form.Item  //deal value
                        label="Deal Value" name="dealValue"
                        rules={[{ required:true, message:"Deal Value is Required"}]}
                        >
                            <Input className="inputset" type="text"></Input>
                    </Form.Item>
                    
                    <Form.Item>  
                    <Space>
                        <Button type="primary" onClick={this.saveDealMgmt}>Add</Button>
                        <Button type="danger" onClick={() => history.push('/environmentSetup-dealManagement')}>Cancel</Button>
                    </Space>
                    </Form.Item>
                </Form>
                {/* </Card> */}
            </div>
        )
    }
}

export default AddDealManagement;

