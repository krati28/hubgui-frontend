import React, { Component } from 'react';
import { Button, Form, Table, Popconfirm} from 'antd';
import {EditFilled, DeleteFilled} from '@ant-design/icons'
import history from '../../History';
import '../../styling/Styletable.css';
import DealService from '../../service/DealService';

class DealManagement extends Component{

    constructor(){
        super();
        this.state={
            deals:[],
            message:null
        }
        this.reloadDealList = this.reloadDealList.bind(this);
        this.editDeal = this.editDeal.bind(this);
        this.addDeal = this.addDeal.bind(this);
        this.mapDealtype = this.mapDealtype.bind(this);
        this.mapDealOption = this.mapDealOption.bind(this);
    }

    componentDidMount() {
        this.reloadDealList();
    }

    reloadDealList() {
        DealService.fetchDeals()
            .then((res) => {
                this.setState({deals: res.data.result})
            })
    };

    deleteDeal(dealId){
        DealService.deleteDeal(dealId)
            .then(res => {
                this.setState({message : 'User deleted successfully'});
                this.setState({deals: this.state.deals.filter(dd => dd.id!== dealId)});
            })
    }

    editDeal(id){
        window.localStorage.setItem("id",id);
        history.push('/add-deal');
    }
    
    addDeal(){
        window.localStorage.removeItem("id");
        this.props.history.push('/add-deal');
    }
    state = {
        sortedInfo: null,
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            sortedInfo: sorter,
        });
    };

    clearAll = () => {
        this.setState({
            sortedInfo: null,
        });
    };

    mapDealtype = (dealtype) =>{
        switch(dealtype){
            case 1: dealtype="Customer"; 
                break;
            case 3: dealtype="Supplier";
                break;
            case 4: dealtype="Source Operator"; 
                break;
            case 5: dealtype="Source Country"; 
                break;
            case 6: dealtype="Customer and Destination Country"; 
                break;
            case 7: dealtype="Customer and Destination Operator";  
                break;
            case 8: dealtype="Supplier and Destination Country"; 
                break;
            case 9: dealtype="Supplier and Destination Operator"; 
                break;
            default: dealtype="Default"
                break;
        }
        return dealtype;
    }
    mapDealOption = (option) =>{
        switch(option){
            case 1: option="Revenue Based";
                break;
            case 2: option="Cost Based";
                break;
            case 3: option="Volume Based";
                break;
        }
        return option;
    }

    render(){

        let {sortedInfo} =this.state;
        sortedInfo = sortedInfo || {};
        
        const columns = [
            {
                title: 'Deal Id',
                dataIndex: 'id',
                key: 'id',
                sorter: (a,b) => a.id - b.id,
                sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Deal Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
                    sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
                    ellipsis: true,
            },
            {
                title: 'Deal Rate',
                dataIndex: 'rate',
                key: 'rate',
                sorter: (a, b) => a.rate.localeCompare(b.rate),
                    sortOrder: sortedInfo.columnKey === 'rate' && sortedInfo.order,
                    ellipsis: true,
            },
            {
                title: 'Deal Type',
                dataIndex: 'type',
                key: 'type',
                render: type => this.mapDealtype(type),

                // sorter: (a, b) => a.dealtype.localeCompare(b.dealtype),
                //     sortOrder: sortedInfo.columnKey === 'dealrate' && sortedInfo.order,
                //     ellipsis: true,
            },
            {
                title: 'Deal Option',
                dataIndex: 'options',
                key: 'options',
                render: options => this.mapDealOption(options),
                sorter: (a,b) => a.options - b.options,
                sortOrder: sortedInfo.columnKey === 'options' && sortedInfo.order,
                // sorter: (c, d) => c.options.localeCompare(d.options),
                //     sortOrder: sortedInfo.columnKey === 'options' && sortedInfo.order,
                    ellipsis: true,
            },
            {
                title: 'Edit',
                dataIndex: 'edit',
                key: 'edit',
                render: (text,record) => <EditFilled onClick={() => this.editDeal(record.id)}/>, 
            },
            {
                title: 'Delete',
                dataIndex: 'delete',
                key: 'delete',
                render: (text, record) => 
                    <Popconfirm
                        title="Are you sure delete this entry?"
                        onConfirm = {this.deleteDeal.bind(this,record.id) }
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteFilled/> 
                    </Popconfirm>,
            }
        ];
        return(
            <div>
                <div className='topline'>
                    Deal Management
                </div>
                
                <Form className='formset' >
                    <Form.Item>
                        <center>
                            <Button type="primary" onClick={() => this.addDeal()}> 
                                Add 
                            </Button>
                        </center>
                    </Form.Item>
                    
                    <Form.Item>
                        <Table 
                            columns={columns}
                            dataSource={this.state.deals}
                            bordered
                            id="students"
                            onChange={this.handleChange}
                        />
                    </Form.Item>    
                </Form>
            </div>
        )
    }
}

export default DealManagement;

