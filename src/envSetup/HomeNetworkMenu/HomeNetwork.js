import React, { Component } from 'react';

import history from "../../History";
import {PlusCircleFilled} from '@ant-design/icons';

import {Form, Button, Select,Table} from 'antd';
const {Option} = Select;

class HomeNetwork extends Component{
   
    constructor(props) {
        super(props);
        this.state = {
          selectValue: "",
        };
    
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.add = this.add.bind(this);
      }
    

    
    
      handleDropdownChange(e) {
        this.setState({ selectValue: e });
        
    if(e  === "2"){
      history.push("/listpcd");
    
      
    }
    else  if(e  === "3"){
     history.push("/listmnp")
     
    }
      }   
      add() {
        if(this.state.selectValue==="1"){
          //alert("add series");
          //window.localStorage.removeItem("ptcode_id");
        this.props.history.push('/add-series');
    }
        if(this.state.selectValue==="2"){
              //window.localStorage.removeItem("ptcode_id");
            this.props.history.push('/add-pcd');
        }
        if(this.state.selectValue==="3"){
          //window.localStorage.removeItem("ptcode_id");
        this.props.history.push('/add-mnp');
    }
         }
        
    render(){
       
            const columns = [
              { title: "S.No",
                  
              },
              {
                title:"Group Name"
              },
              {
                title:"Group Numbers"
              },
              {
                title:"Group Type"
              },
              {
                title:"Edit"
              },
              {
                title:"Delete"
              }

            ]
             
            
            return(
          <div>
          <Form.Item 
                        label = "Network Elements"
                        
            rules = {[{ 
                            required: true}]}>
              
                    
                <Select placeholder="Series" onChange={this.handleDropdownChange}>
                <Option value="1">Series</Option>
                <Option value="2">Point Code Details</Option>
                <Option value="3">MNP Gateway</Option>
               
                </Select>
              </Form.Item>
              <Button  icon={<PlusCircleFilled/>} onClick={() => this.add()}>add
                </Button><br /><br/>
                <Table
             columns={columns} 
             //dataSource={this.state.pcd} 
             //id="students"
             bordered 
             //onChange={this.handleChange}  
             />
            
              </div>

                
            );
        }
    }
    

export default HomeNetwork;


 

