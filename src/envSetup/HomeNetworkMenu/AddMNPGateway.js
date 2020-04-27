import React, { Component } from 'react';
import MNPService from "../../service/MNPService"
import history from "../../History";
import {Form, Input, Button, Select, Typography, Table} from 'antd';
import Column from 'antd/lib/table/Column';
const {Option} = Select;
const {Title} = Typography;
class AddMNPGateway extends Component{
    constructor(props){
        super(props);
        this.state ={
            showOption:false,
            showzone:false,
            showtype:false,
            shownode:false,
            mnp_id:'',
           mnp_type:'',
           gateway_name:'',
           config:{},
           cache_name:'',
           max_trans:'',
            lbmode:'',
           gateway_type:'',
           zone:'',
           ttl_override:'',
           list:[],
           addnode:'',
    message: null
        }
        this.saveMNP = this.saveMNP.bind(this);
        this.handleDropdownChangeMNPGateway = this.handleDropdownChangeMNPGateway .bind(this);
        this.handleLBMode = this.handleLBMode.bind(this);
        this.handleGatewayType = this.handleGatewayType .bind(this);
        this.enablenode=this.enablenode.bind(this);
    }
    enablenode=()=>{
        alert("button clicked")
        this.state.shownode = true
    }
    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
        this.setState({config:{[e.target.name]: e.target.value}});
        
    }
    handleDropdownChangeMNPGateway  =(e) =>
    {
        this.setState({ mnp_type: e });
        if(e ==="Redis"){
            this.setState({
                showtype:true,
                showzone:false,
               showOption:false
              }) 
        }
        else if(e==="Enum"){
        this.setState({
            showzone : true,
            showOption: false,
            showtype:false
          }) 
        }
        else if(e ==="Cache"){
            this.setState({
                showOption : true,
                showzone:false,
                showtype:false
              }) 
        }
      }
      handleLBMode =(e1) =>
      {
          this.setState({ lbmode: e1 });
        } 

        handleGatewayType =(ee) =>
    {
        this.setState({ gateway_type: ee });
      }

      async componentDidMount(){
        // const url= "http://localhost:8102/rllist";
        // const response = await fetch(url);
        // const data = await response.json();
        // this.setState({ person: data.results[0], loading:false  });

        // const url = "http://localhost:8102/rllist";
        // const response = fetch(url);
        // const data = await response.json();
        // this.setState({})

        let initialPlanets = [];
            fetch('http://localhost:8080/mnpdetails')
                .then(response => {
                    return response.json();
                }).then(data => {
                    //alert(JSON.stringify(data));
                initialPlanets = data.result.map((gateway_name) => {
                   
                    return gateway_name
                    
                });
                this.setState({
                    list: initialPlanets,
                });
               
            });
            // var l=[];
            // if(this.list.mnp_type==="Cache"){
            //     l.push(this.list.gateway_name);
            // }
            // alert(l);
            // let optionItems = 
    }

      saveMNP= (e) => {
            e.preventDefault();
            var mnp= {mnp_id:this.state.mnp_id,mnp_type:this.state.mnp_type, gateway_name: this.state.gateway_name,
                max_trans:this.state.max_trans,lbmode: this.state.lbmode,zone:this.state.zone,ttl_override:this.state.value,
                config:JSON.stringify({"gwname":this.state.gateway_name,"gwtype":this.state.mnp_type,"zone":this.state.zone,
                "max_trans":this.state.max_trans,"lbmode":this.state.lbmode,"ttl_override":this.state.ttl_override})
            }
               
        
        MNPService.addMNP(mnp)
            .then(res => {
                this.setState({message : 'added successfully.'});
                //appends the /students to localhost:3000 url and hence lists out all the data
            history.push('/listmnp');
            });
    }
    render() {
       /* return(
         
            <div>
                
               
                <form>
                    <fieldset>
                <legend>Add MNP Details</legend>
                <label class="mandatory" >* Denotes mandatory fields</label><br></br>
                <div>
                 <label for="" class="required">MNP Gateway : </label>
            <select id="mnptype" onChange={this.handleDropdownChangeMNPGateway}>
              <option value="-1">--Select--</option>
              <option value="Redis">Redis</option>
              <option value="Enum">Enum</option>
              <option value="Cache">Cache</option>
              </select>
          </div><br></br>
         

                <div className="form-group">
                    <label for="" class="required">Gateway Name : </label>
                    <input type="text"  name="gateway_name" className="form-control" value={this.state.gateway_name} onChange={this.onChange}/>
                </div><br></br>
            
                {this.state.showzone && 
                    <div className="form-group">
                    <label>Zone:</label>
                    <input type="text"  name="zone" className="form-control" value={this.state.zone} onChange={this.onChange}/><br></br>
                    </div>
                }
                    
                <div className="form-group">
                    <label>Max Pending Transactions : </label>
                    <input type="text" name="max_trans" className="form-control" value={this.state.max_trans} onChange={this.onChange}/>
                </div><br></br>

                <div>
                 <label>LB Mode : </label>
            <select id="dropdown" onChange={this.handleDropdownChangeLBMode}>
              <option value="-1">--Select--</option>
              <option value="1">Active-StandBy</option>
              <option value="2">Active-Active</option>
            
              </select>
          </div><br></br>

          {this.state.showtype && 
          <div>
                 <label>Gateway Type: </label>
            <select id="dropdown" onChange={this.handleDropdownChangeGatewayType}>
              <option value="-1">--Select--</option>
              <option value="1">Commercial</option>
              <option value="2">Non-Commercial</option>
            </select><br></br>
          </div>
          }
          
          {this.state.showzone && 
            <div className="form-group">
            <label>Select Cache:</label>
            <select id="dropdown" >
            <option value=" ">--Select--</option>

            </select><br></br>
            </div>
            }
        

            {this.state.showOption && 
            <div className="form-group">
            <label>TTL Override:</label>
                <input type="text" name="ttl_override" value="86400" onChange={this.onChange}></input>
            <br></br>
            </div>
            }
                {/* <div className="form-group">
                    <label for="" class="required">Add Node : </label>
                    <input type="text" name="add_node" className="form-control" value={this.state.add_node} onChange={this.onChange}/>
        </div>  
                <br></br>
                <div> 
                                <button class="gaping" id="done" onClick={this.saveMNP}>Done</button>
                                <button id="clear" class="gaping">Clear</button>
                                <button id="cancel">Cancel</button>
                        </div>

            </fieldset>
            </form>
    </div>
        );*/


        return(
            <div  style={{float:"left"}}>
                <Title level={4}>Add MNPGateway Details</Title>
                <br/>
                <Form name="basic" 
                initialValues={{ remember: true }}>
                <Form.Item 
                        label="MNP Gateway" name="mnp_type" rules = {[{required:true}]}>
                <Select placeholder="--select--" onChange={this.handleDropdownChangeMNPGateway}>
                <Option value="Redis">Redis</Option>
                <Option value="Enum">Enum</Option>
                <Option value="Cache">Cache</Option>
                </Select>
                </Form.Item>
                <Form.Item 
                        label = "Gateway Name"
                        name = "gateway_name"
                        rules = {[{ required: true,message: 'Please enter gateway name',},]}>
            
                <Input type="text" name="gateway_name" value={this.state.gateway_name} onChange={this.onChange} />
                </Form.Item>
                {this.state.showzone&&
                <Form.Item 
                label = "Zone"
                name = "zone"
                    >
            
                        <Input type="text" name="zone" value={this.state.zone} onChange={this.onChange} />
                </Form.Item>
                }
                <Form.Item 
                label = "Max pending Transactions"
                name = "max_trans"
                   >
            
                        <Input type="text" name="max_trans" value={this.state.max_trans} onChange={this.onChange} />
                </Form.Item>
                
                <Form.Item label="LB MODE" name="lbmode" >
                <Select placeholder="--select--" onChange={this.handleLBMode}>
                <Option value="Active-StandBy">Active-StandBy</Option>
                <Option value="Active-Active">Active-Active</Option>
                
                </Select>
                </Form.Item>
    
                {this.state.showtype && 
                <Form.Item label="Gateway Type" name="gateway_type" >
                <Select placeholder="--select--" onChange={this.handleGatewayType}>
                <Option value="Commercial">Commercial</Option>
                <Option value="Non-Commercial">Non-Commercial</Option>
                
                </Select>
                </Form.Item>
                }       
                {this.state.showzone&&
                <Form.Item label="Select Cache" name="status" >
                <Select placeholder="--select--">
                {this.state.list.map((test) => <Option value={test.gateway_name}> {test.gateway_name} </Option> )}
                
                </Select>
                </Form.Item>
                }
                {this.state.showOption&&
                <Form.Item 
                label = "TTL Ovverride"
                name = "ttl_override"
                    >
            
                        <Input type="text" name="ttl_override" defaultValue="86400" onChange={this.onChange} />
                </Form.Item>
                }
                

                 <Form.Item > 
          <Button type="primary" onClick={this.saveMNP} disabled={!this.state.mnp_type || 
            !this.state.gateway_name} >Submit</Button>
          <Button type="primary" onClick={() => this.props.history.push('/listmnp')}>Cancel</Button>
                </Form.Item>

                </Form>
            </div>

        );
    }
}

export default  AddMNPGateway;
