import React, { Component } from 'react';
import history from "../../History";
import {Form, Button, Select,Table,Radio} from 'antd';
import '../../styling/Styletable.css';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const {Option} = Select;

class HomeNetwork extends Component{
   
    constructor(props) {
        super(props);
        this.state = {
          selectValue: '',
        };
    
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.add = this.add.bind(this);
      }
    

    
    
  handleDropdownChange(e) {
        this.setState({ selectValue: e });
        if(e=== "2"){
          history.push("/listpcd");
        }
        else if(e === "3"){
          history.push("/listmnp")
        }
      }   
      add() {
        if(this.state.selectValue==="1"){
          //alert("add series");
          //window.localStorage.removeItem("ptcode_id");
        history.push('/add-series');
      }
        if(this.state.selectValue==="2"){
              //window.localStorage.removeItem("ptcode_id");
            history.push('/add-pcd');
        }
        if(this.state.selectValue==="3"){
          //window.localStorage.removeItem("ptcode_id");
        history.push('/add-mnp');
      }
   }
        
    render(){
       
            /*const columns = [
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

            ]*/
             
            
            return(
                <div >
                    <div className='topline'>Home Network Elements</div>
                      <div className="abc">
                      <Form className='formset'>
                      {/* <Form.Item 
                          label = "Network Elements"
                        rules = {[{ 
                            required: true}]}
                      >
                        <Select style={{width:"300px"}}
                            placeholder="--select--" onChange={this.handleDropdownChange}>
                            {/* <Option value="1">Series</Option> 
                            <Option value="2">Point Code Details</Option>
                            <Option value="3">MNP Gateway</Option>
                          
                        </Select> 
                      </Form.Item> */}
                      <Tabs  onChange={this.handleDropdownChange}>
                      <TabPane tab="Series" key="1">
                      </TabPane>
                      <TabPane tab="Point Code Details" key="2">
                      </TabPane>
                      <TabPane tab="MNP Gateway" key="3">
                      </TabPane>
                      </Tabs>
              
                    </Form>
                  </div>
                </div>

                
            );
        }
    }
    

export default HomeNetwork;

