import React, { Component } from 'react';
import MNPService from "../../service/MNPService"
import history from "../../History";
import {Form, Input, Button, Select, Typography, Table, Space, Popconfirm} from 'antd';
import Column from 'antd/lib/table/Column';
import '../../styling/Styletable.css';
import { SlidersTwoTone } from '@ant-design/icons';
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
           //addnode:'',
           button_submit:true,
           button_update:false,
            message: null
        }
        this.saveMNP = this.saveMNP.bind(this);
        this.handleDropdownChangeMNPGateway = this.handleDropdownChangeMNPGateway .bind(this);
        this.handleLBMode = this.handleLBMode.bind(this);
        this.handleGatewayType = this.handleGatewayType .bind(this);
        this.handlecache=this.handlecache.bind(this);
        this.formRef = React.createRef();
        this.loadmnp=this.loadmnp.bind(this);
        this.Createrow=this.Createrow.bind(this);
        this.Deleterow=this.Deleterow.bind(this);
    }

    componentDidMount() {
         this.loadmnp();
         let initialPlanets = [];
             fetch('http://localhost:8101/mnpdetails')
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
    }
    loadmnp() {
        this.setState({button_submit:false,button_update:true})
        MNPService.fetchMNPById(window.localStorage.getItem("mnp_id"))
        
            .then((res) => {
                let mnps = res.data.result;
                var c=JSON.parse(mnps.config)
                this.handleDropdownChangeMNPGateway(mnps.mnp_type);
                this.setState({
                    mnp_id:mnps.mnp_id,
                    mnp_type:mnps.mnp_type,
                    gateway_name:mnps.gateway_name,
                    config:c,
                    cache_name:c["cache_name"],
                    max_trans:c["max_trans"],
                    lbmode:c["lbmode"],
                    gateway_type:c["gateway_type"],
                    zone:c["zone"],
                    ttl_override:c["ttl_override"],
                }, () => console.log(this.state));
                
                this.formRef.current.setFieldsValue({
                    mnp_id:mnps.mnp_id,
                    mnp_type:mnps.mnp_type,
                    gateway_name:mnps.gateway_name,
                    cache_name:c["cache_name"],
                    max_trans:c["max_trans"],
                    lbmode:c["lbmode"],
                    gateway_type:c["gateway_type"],
                    zone:c["zone"],
                    ttl_override:c["ttl_override"],
                });
            });
            
    }
    
    onReset = () => {
        this.formRef.current.resetFields();
    };
    handlecache=(e)=>{
        this.setState({cache_name:e})
    }
    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
        this.setState({config:{[e.target.name]: e.target.value}});
        
    }
    enablenode =()=>{
        // alert("display tabel")
        this.setState({shownode:true})
    }
    Createrow=()=>{
        alert("in cre row");
        var table = document.getElementById("node_table");
        var rows = table.getElementsByTagName("tr");
        var r=parseInt(rows)+1;
        table.insertRow(parseInt(r));
    }
    Deleterow=()=>{
        var table = document.getElementById("node_table");
        var rows = table.getElementsByTagName("tr");
        table.deleteRow(parseInt(rows)-1);
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

    saveMNP= (e) => {
            e.preventDefault();
            if(this.state.mnp_id===''){
            var mnp= {mnp_id:this.state.mnp_id,mnp_type:this.state.mnp_type, gateway_name: this.state.gateway_name,
                max_trans:this.state.max_trans,lbmode: this.state.lbmode,zone:this.state.zone,ttl_override:this.state.value,
                config:JSON.stringify({"gwname":this.state.gateway_name,"gwtype":this.state.mnp_type,"zone":this.state.zone,
                "max_trans":this.state.max_trans,"lbmode":this.state.lbmode,"cache_name":this.state.cache_name,
                "ttl_override":this.state.ttl_override || 86400}),cache_name:this.state.cache_name || "NULL"
            }
               
            
        MNPService.addMNP(mnp)
            .then(res => {
                this.setState({message : 'added successfully.'});
                //appends the /students to localhost:3000 url and hence lists out all the data
            history.push('/listmnp');
            });
        }
        else if(this.state.mnp_id!==''){
            var mnp= {mnp_id:this.state.mnp_id,mnp_type:this.state.mnp_type, gateway_name: this.state.gateway_name,
                max_trans:this.state.max_trans,lbmode: this.state.lbmode,zone:this.state.zone,ttl_override:this.state.value,
                config:JSON.stringify({"gwname":this.state.gateway_name,"gwtype":this.state.mnp_type,"zone":this.state.zone,
                "max_trans":this.state.max_trans,"lbmode":this.state.lbmode,"cache_name":this.state.cache_name,
                "ttl_override":this.state.ttl_override}),cache_name:this.state.cache_name
            }
               
           
        MNPService.editMNP(mnp)
            .then(res => {
                this.setState({message : 'edited successfully.'});
                //appends the /students to localhost:3000 url and hence lists out all the data
            history.push('/listmnp');
            });

        }
    }
    render() {
        return(
            <div >
                
              <div className='topline'>Add MNP Gateway</div>
              <div className="abc">
                <div className="formalign">
                <Form name="basic" ref={this.formRef} 
                initialValues={{ remember: true }}
                className="formset" {...formItemLayout}>
                <Form.Item 
                label = "MNP Gateway" 
                name = "mnp_type" 
                labelAlign="left"
                rules = {[{required:true}]} >
                <Select placeholder="--select--" onChange={this.handleDropdownChangeMNPGateway}
                labelAlign="left" style={{width:"300px"}}>
                    <Option value="Redis">Redis</Option>
                    <Option value="Enum">Enum</Option>
                    <Option value="Cache">Cache</Option>
                </Select>
                </Form.Item>
                <Form.Item 
                label = "Gateway Name"
                name = "gateway_name" 
                labelAlign="left"
                rules = {[{ required: true,message: 'Please enter gateway name',},]}>
                    <Input 
                        type="text" 
                        className="inputset"
                        name="gateway_name" 
                        labelAlign="left" 
                        value={this.state.gateway_name} 
                        onChange={this.onChange} 
                    />
                </Form.Item>
                {this.state.showzone&&
                <Form.Item 
                label = "Zone"
                name = "zone" 
                labelAlign="left">
                    <Input 
                        type="text"
                        className="inputset"
                        name="zone" 
                        labelAlign="left" 
                        value={this.state.zone} 
                        onChange={this.onChange} 
                    />
                </Form.Item>
                }
                <Form.Item 
                label = "Max Pending Transactions"
                name = "max_trans" 
                labelAlign="left">
                    <Input 
                        type="text" 
                        className="inputset" 
                        name="max_trans" 
                        labelAlign="left" 
                        value={this.state.max_trans} 
                        onChange={this.onChange} 
                    />
                </Form.Item>
                
                <Form.Item label = "LB MODE" name="lbmode"  labelAlign="left">
                <Select placeholder="--select--" onChange={this.handleLBMode}
                labelAlign="left" style={{width:"300px"}}>
                    <Option value="Active-StandBy">Active-StandBy</Option>
                    <Option value="Active-Active">Active-Active</Option>
                
                </Select>
                </Form.Item>
    
                {/* {this.state.showtype && 
                <Form.Item label="Gateway Type" name="gateway_type" >
                <Select placeholder="--select--" onChange={this.handleGatewayType}>
                <Option value="Commercial">Commercial</Option>
                <Option value="Non-Commercial">Non-Commercial</Option>
                
                </Select>
                </Form.Item>
                }        */}
                {this.state.showzone&&
                <Form.Item label="Select Cache" name="cache_name" labelAlign="left" >
                <Select placeholder="--select--" onChange={this.handlecache}
                labelAlign="left" style={{width:"300px"}}>
                {this.state.list.map((test) => <Option value={test.gateway_name}> {test.gateway_name} </Option> )}
                
                </Select>
                </Form.Item>
                }
                {this.state.showOption&&
                <Form.Item 
                label="TTL Ovverride"
                name = "ttl_override" 
                labelAlign="left">
                    <Input 
                        type="text"
                        className="inputset"
                        name="ttl_override" 
                        labelAlign="left" 
                        defaultValue="86400" 
                        onChange={this.onChange} 
                    />
                </Form.Item>
                }
                <Form.Item 
                label="Add Node"
                name = "node" 
                labelAlign="left">
                <Button type="default" onClick={this.enablenode}>Add Node</Button>
                </Form.Item>
                {this.state.shownode&&
                    <Form.Item>
                    <table id="node_table">
                        <tr>
                        <th>Host</th>
                        <th>Port</th>
                        <th>No. of Connections</th>
                        <th>Fail Threshold</th>
                        <th>Retries</th>
                        <th>Connection Type</th>
                        </tr>
                        <tr>
                        <td><Input type="text" name="host" value={this.state.host} onChange={this.onChange}/></td>
                        <td><Input type="text" name="port" value={this.state.port} onChange={this.onChange}/></td>
                        <td><Input type="text" name="conn" value={this.state.conn} onChange={this.onChange}/></td>
                        <td><Input type="text" name="fail_threshold" value={this.state.fail_threshold} onChange={this.onChange}/></td>
                        <td><Input type="text" name="retries" value={this.state.fail_retries} onChange={this.onChange}/></td>
                        <td><Select placeholder="--select--" >
                        <Option value="TCP">TCP</Option>
                        <Option value="UDP">UDP</Option>
                            </Select> </td>
                        <td>
                        <Form.Item>
                        <Button type="default" onclick={this.Createrow}>Create row</Button>
                        <Button type="default" onclick={this.Deleterow}>Delete row</Button>
                        </Form.Item>
                        </td>
                        </tr>
                    </table>
                    </Form.Item>
                    
                }
               
               <div className="buttonset">   
                <Form.Item > 
                <Space>
                <Popconfirm
                    title="Do you want to Add the record"
                    onConfirm={this.saveMNP}
                    okText="Yes"
                    cancelText="No"
                >
                <Button 
                    type="primary" 
                    //onClick={this.saveMNP} 
                    disabled={!this.state.mnp_type || 
                    !this.state.gateway_name} 
                >Save</Button>
                </Popconfirm>
                <Popconfirm
                    title="Do you want to reset the fields"
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
                    title="Do you want to cancel"
                    onConfirm={() => this.props.history.push('/listmnp')}
                    okText="Yes"
                    cancelText="No"
                >
                <Button 
                    type="danger" 
                    //onClick={() => this.props.history.push('/listmnp')}
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

export default  AddMNPGateway;

