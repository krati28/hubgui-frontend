import React, { Component } from 'react';
import MNPService from "../../service/MNPService"
import history from "../../History";
import {Form, Input,InputNumber, Button, Select, Typography, Row,Col, Space, Popconfirm} from 'antd';
import {NavLink} from 'react-router-dom';
import {Breadcrumb} from "antd";
import '../../styling/Styletable.css';
import {PlusOutlined,MinusCircleOutlined} from "@ant-design/icons";

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
            host:'',
            port:'',noconn:'',fail:'',retries:'',conntype:'',
            nodes:[],
            node:{},
            message: null
        }
        this.saveMNP = this.saveMNP.bind(this);
        this.handleDropdownChangeMNPGateway = this.handleDropdownChangeMNPGateway .bind(this);
        this.handleLBMode = this.handleLBMode.bind(this);
        this.handleGatewayType = this.handleGatewayType .bind(this);
        this.handlecache=this.handlecache.bind(this);
        this.handleConnectiontype=this.handleConnectiontype.bind(this);
        this.formRef = React.createRef();
        //this.loadmnp=this.loadmnp.bind(this);
        //this.nodeinput=this.nodeinput.bind(this);
    }

    componentDidMount() {
         this.loadmnp();
         let initialPlanets = [];
             fetch('http://localhost:8105/mnpdetails')
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

                 //alert(JSON.stringify(this.state.list));
             });
    }
    loadmnp() {
        this.setState({button_submit:false,button_update:true})
        MNPService.fetchMNPById(window.localStorage.getItem("mnp_id"))
        
            .then((res) => {
                let mnps = res.data.result;
                try{
                var c=JSON.parse(mnps.config)
                var node_edit=c["nodes"];
                var node_json=JSON.stringify(node_edit);
                var node_parse=JSON.parse(node_json)
                //alert(node_parse["host"]);
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
                    host:node_parse["host"],
                    port:node_parse["port"],
                    noconn:node_parse["noconn"],
                    fail:node_parse["fail"],
                    retries:node_parse["retries"],
                    conntype:node_parse["conntype"]
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
                    host:node_parse["host"],
                    port:node_parse["port"],
                    noconn:node_parse["noconn"],
                    fail:node_parse["fail"],
                    retries:node_parse["retries"],
                    conntype:node_parse["conntype"]
                });
              }
              catch(err){console.log(err);}
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
        this.setState( {node:{[e.target.name]: e.target.value}});
    }
    
    handleConnectiontype=(e)=>{
        this.setState({conntype:e})
    }
    // nodeinput=(e)=>{
    //     //const { node } = this.state;
    //     this.setState({
    //       nodes: [{
    //         //...node,
    //         [e.target.name]: e.target.value
    //       }]
          
    //     });//alert({[e.target.name]: e.target.value})
    //   };
       
    
    enablenode =()=>{
        // alert("display tabel")
        this.setState({shownode:true})
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
    handleMaxtrans=(e)=>{
        if((isNaN(e))||(e==="NULL"))
        {
            this.setState({max_trans:""})
        }
        else {
            var x=String(e);
            this.setState({max_trans:x})}
       
    }
    
    handleOverride=(e)=>{
        if((isNaN(e))||(e==="NULL"))
        {
            this.setState({ttl_override:""})
        }
        else {
            var x=String(e);
            this.setState({ttl_override:x})}
    }

    saveMNP= (e) => {
            e.preventDefault();
            //alert(this.formRef.nodeslist.length());
            //console.log("reseverd values"+this.state.nodes);
            if(this.state.mnp_id===''){
            var mnp= {mnp_id:this.state.mnp_id,mnp_type:this.state.mnp_type, gateway_name: this.state.gateway_name,
                max_trans:this.state.max_trans,lbmode: this.state.lbmode,zone:this.state.zone,ttl_override:this.state.value,
                config:JSON.stringify({"gwname":this.state.gateway_name,"gwtype":this.state.mnp_type,
                "zone":this.state.zone,"max_trans":this.state.max_trans,"lbmode":this.state.lbmode,"cache_name":this.state.cache_name,
                "ttl_override":this.state.ttl_override|| "86400","flags":"cond_bypass","nodes":{"host":this.state.host,"port":this.state.port,"noconn":this.state.noconn,"fail":this.state.fail,
                "retries":this.state.retries,"conntype":this.state.conntype}}),cache_name:this.state.cache_name || "NULL"
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
                "ttl_override":this.state.ttl_override||"86400","flags":"cond_bypass","nodes":{"host":this.state.host,"port":this.state.port,"noconn":this.state.noconn,"fail":this.state.fail,
                "retries":this.state.retries,"conntype":this.state.conntype}}),cache_name:this.state.cache_name
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
                <div className="setcrumb">
                <Breadcrumb.Item> Environment Setup </Breadcrumb.Item>
                <Breadcrumb.Item key="homenetwork">
                    <NavLink to="/environmentSetup-homenetwork">Home Network</NavLink>
                </Breadcrumb.Item>  
                <Breadcrumb.Item>Add MNP Gateway</Breadcrumb.Item>
                </div>
                <div className="abc">
                <div className="formalign">
                <Form name="basic" ref={this.formRef} 
                initialValues={{ remember: true }}
                className="formset" {...formItemLayout}>
                <Form.Item 
                label = "MNP Gateway" 
                name = "mnp_type" 
                labelAlign="left"
                rules = {[{required:true,message:"Please enter MNP Gateway"}]} >
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
                rules = {[{ required: true,message: 'Please enter a Gateway Name'},
                {pattern:"^([A-Za-z])(\s*)([A-Za-z0-9\_\-\s]*)$",message:"Only alphabetic character underscore and space are allowed for Gateway Name"}]}>
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
                labelAlign="left"
                
                >
                    <Input
                        type="text"
                        className="inputset"
                        name="zone" 
                        labelAlign="left" 
                        value={this.state.zone} 
                        onChange={this.handleZone} 
                    />
                </Form.Item>
                }
                <Form.Item 
                label = "Max Pending Transactions"
                name = "max_trans" 
                labelAlign="left"
                rules ={[{type:"number",message:"Only Numerical values allowed"}]}>
                    <InputNumber 
                        className="inputset" 
                        name="max_trans" 
                        labelAlign="left" 
                    
                        value={this.state.max_trans} 
                        onChange={this.handleMaxtrans} 
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
                labelAlign="left"
                rules ={[{type:"number",message:"Only numeric values allowed"}]}
                >
                    <InputNumber
                        type="text"
                        className="inputset"
                        name="ttl_override" 
                        labelAlign="left" 
                        defaultValue={86400} 
                        onChange={this.handleOverride} 
                    />
                </Form.Item>
                }
                <Form.List name="node" ref={this.formRef} >
                  {(fields, { add, remove }) => {
                    return (
                      <div>
                        <Form.Item
                            label="Add Node"
                            name = "node" 
                            labelAlign="left"
                            // rules={[{required:true,message:"Add atleast one node"}]}
                            >
                            <Button
                              type="dashed"
                              onClick={() => {
                                add();
                              }}
                              style={{ width: "auto" }}
                            >
                              <PlusOutlined /> Add Node
                            </Button>
                          </Form.Item>
                          {fields.map((field, index) => (
                            //   <div className="divnode">
                            <Row key={field.key}>
                              <Col>
                                <Form.Item
                                  name={[field.name, "host"]}
                                  fieldKey={[field.fieldKey, "host"]}
                                  rules={[{require:true},
                                          {pattern:"^(([1-9]?\d|1\d\d|25[0-5]|2[0-4]\d)\.){3}([1-9]?\d|1\d\d|25[0-5]|2[0-4]\d)$",
                                          message:"Please enter a valid host address "}]}
                                >
                                  <Input placeholder="HOST" name="host" value={this.state.host} onChange={this.onChange}/>
                                </Form.Item>
                              </Col>
                              <Col>
                                <Form.Item
                                  name={[field.name, "port"]}
                                  fieldKey={[field.fieldKey, "port"]}
                                  rules={[{require:true},
                                          {pattern:"^[0-9]*$",
                                          message:"Please enter valid number"}]}
                                >
                                  <Input placeholder="PORT" name="port" value={this.state.port} onChange={this.onChange}/>
                                </Form.Item>
                              </Col>
                              <Col>
                                <Form.Item
                                  name={[field.name, "noconn"]}
                                  fieldKey={[field.fieldKey, "noconn"]}
                                  rules={[{require:true},
                                          {pattern:"^[0-9]*$",
                                          message:"Please enter valid number"}]}
                                >
                                  <Input placeholder="No.of Connections" name="noconn" value={this.state.noconn} onChange={this.onChange}/>
                                </Form.Item>
                              </Col>
                              <Col>
                                <Form.Item
                                  name={[field.name, "fail"]}
                                  fieldKey={[field.fieldKey, "fail"]}
                                  rules={[{require:true},
                                          {pattern:"^[0-9]*$",
                                          message:"Please enter valid number"}]}
                                >
                                  <Input placeholder="Fail Threshold" name="fail" value={this.state.fail} onChange={this.onChange}/>
                                </Form.Item>
                              </Col>
                              <Col>
                                <Form.Item
                                  name={[field.name, "retries"]}
                                  fieldKey={[field.fieldKey, "retries"]}
                                  rules={[{require:true},
                                          {pattern:"^[0-9]*$",
                                          message:"Please enter valid number"}]}
                                >
                                  <Input placeholder="Retries" name="retries" value={this.state.retries} onChange={this.onChange}/>
                                </Form.Item>
                              </Col>
                              <Col>
                                <Form.Item
                                  name={[field.name, "conntype"]}
                                  fieldKey={[field.fieldKey, "conntype"]}
                                  rules={[{require:true}]}
                                >
                                  <Select placeholder="-select-" onChange={this.handleConnectiontype}
                                  labelAlign="left" style={{width:"300px"}}>
                                    <Option value="TCP">TCP</Option>
                                    <Option value="UDP">UDP</Option>
                                    </Select> 
                                </Form.Item>
                              </Col>

                              <Col flex="none">
                                <MinusCircleOutlined
                                  className="dynamic-delete-button"
                                  onClick={() => {
                                    remove(field.name);
                                  }}
                                />
                              </Col>
                            </Row>
                            // </div>
                          ))}
                          
                        </div>
                      );
                    }}
                    
                  </Form.List>
                    
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
                    !this.state.gateway_name ||!this.state.node}
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


