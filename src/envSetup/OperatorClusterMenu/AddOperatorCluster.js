import React, { Component } from 'react';
import ApiService from "../../service/ApiService";
import history from "../../History"
import {Form, Input, Button, Select, Typography , Radio, Space} from 'antd';
import '../../styling/Styletable.css';
const {Option} = Select;
class AddOperatorCluster extends Component{

    constructor(props){
        super(props);
        this.state ={
             cluster_id:'',
            cluster_name: '',
            cluster_type: '',
            operator_ids:'',
            list:[],
            selectedItems:[],
            message: null
        }
        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.handleDropdownChangeOperatorId=this.handleDropdownChangeOperatorId.bind(this);
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.loadUser();
            let initialPlanets = [];
                fetch('http://localhost:8101/operatordetails')
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        //alert(JSON.stringify(data));
                    initialPlanets = data.result.map((operator_name) => {
                       
                        return operator_name
                        
                    });
                    this.setState({
                        list: initialPlanets,
                    });
                   
                });
        
    }

    loadUser() {
        ApiService.fetchUserById(window.localStorage.getItem("clusterId"))
            .then((res) => {
                
                let user = res.data.result;
                this.setState({
                    cluster_id: user.cluster_id,
                cluster_name:user.cluster_name,
                cluster_type:user.cluster_type,
                operator_ids:user.operator_ids,
                }, () => console.log(this.state));
            
                this.formRef.current.setFieldsValue({
                    cluster_id: user.cluster_id,
                cluster_name:user.cluster_name,
                cluster_type:user.cluster_type,
                operator_ids:user.operator_ids,
                })
            });
    }
    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value },
            );
    }

  handleDropdownChangeOperatorId =(e) =>
  {
      this.setState({ operator_ids: e });
    }

    onChangeradio = (e) =>{
        this.setState({ [e.target.name]: e.target.value },
            );
        }

        
    // saveUser = (e) => {
    //     e.preventDefault();
    //     let user = {
    //         // id:this.state.id,
    //          cluster_name: this.state.cluster_name, cluster_type: this.state.cluster_type,
    //          };
    //     ApiService.addUser(user)
    //         .then(res => {
    //             this.setState({message : 'User added successfully.'});
    //             this.props.history.push('/environmentSetup-operatorCluster');
    //         });
    // }
    
    saveUser = (e) => {
        e.preventDefault();
        if(this.state.cluster_id=== ''){
            let user = {
                cluster_id:this.state.cluster_id,
                 cluster_name: this.state.cluster_name, cluster_type: this.state.cluster_type,
                 operator_ids:this.state.operator_ids,
                 };
                //  alert("in add ");
            ApiService.addUser(user)
                .then(res => {
                    this.setState({message : 'User added successfully.'});
                    history.push('/environmentSetup-operatorCluster');
                });
        }
        else if(this.state.cluster_id !== ''){
            let user = {
                 cluster_id:this.state.cluster_id,
                 cluster_name: this.state.cluster_name, cluster_type: this.state.cluster_type,
                operator_ids:this.state.operator_ids, 
                };
                //  alert('in edit');
            ApiService.editUser(user)
                .then(res => {
                    this.setState({message : 'User added successfully.'});
                    history.push('/environmentSetup-operatorCluster');
                });
        }
        
    }
    render(){
        
        return(
            <div >
                <div className='topline'>Add Operator List</div>
                {/* <form>
                    <fieldset>
                    <label for="clustername" class="required">Cluster name:</label>
                        <input type="text" id="cluster_name" name="cluster_name" className='form-control'
                        value={this.state.cluster_name} onChange={this.onChange} /><br/><br/>

                        <label for="" >Cluster Type: </label>
                        <label><input type="radio" id="cluster_type" name="cluster_type" value="1" 
                        onChange={this.onChangeradio} />
                        Default</label>
                        <label><input type="radio" id="cluster_type" name="cluster_type" value="2"
                        onChange={this.onChangeradio}  />
                        Roaming</label><br /><br />
                        <div>
                        <div id="lcr_type" name="lcr_type" 
                        style={{width:200},{border:'solid'},{float:"left"}} >
                            <option value="Default LCR" >Default LCR</option>
                            <option value="SC_MT" >SC_MT</option>
                            <option value="SPEC_LCR" >SPEC_LCR</option>
                            <option value="Time Based LCR" >Time Based LCR</option>
                            
                        </div>
                        <button id="clear" class="gaping">Add</button><br/>
                        <button id="clear" class="gaping">Remove</button>
                        </div>
                        <br/><br/><br/>

                        <div>
                                <button class="gaping" id="done" onClick={this.saveUser} 
                                disabled={!this.state.cluster_name}>Done</button>
                                <button id="clear" class="gaping">Clear</button>
                                <button id="cancel" onClick={() => this.props.history.push('/environmentSetup-operatorCluster')}>Cancel</button>
                        </div>
                        <br/><br/>
                        <label class="mandatory" >* Denotes Mandatory Fields</label>
                    </fieldset>
                </form> */}
                <Form name="basic" initialValues={{remember:true}}
                ref={this.formRef} 
                className='formset'>
                <Form.Item 
                    label = "Cluster Name"
                    name = "cluster_name"
                    rules = {[{ 
                        required: true, 
                        message: 'Please input your Cluster Name!',
                        },
                    ]}
                >
                    <Input 
                            className="inputset"
                            type="text" 
                            placeholder = "Enter cluster name..."
                            name="cluster_name"
                            
                            value={this.state.cluster_name} 
                            onChange={this.onChange} 
                        />
                    </Form.Item>
                    <Form.Item
                        label = "Cluster Type"
                        name = "cluster_type"

                        rules = {[{ 
                            required: true, 
                            message: 'Please input your Cluster Type!',
                            },
                        ]}>
                    <Radio.Group name="cluster_type"  onChange={this.onChangeradio} 
                    // value={this.state.value}
                    >
                        <Radio value={1} >Default</Radio>
                        <Radio value={2}>Roaming</Radio>

                    </Radio.Group>
                    </Form.Item>

                    <Form.Item
                    label="Operator"
                    name="operator_ids"
                    rules = {[{ 
                        required: true, 
                        message: 'Please select your operator Name!',
                        },
                    ]}>
                    <Select 
                        name="operator_ids"
                        style={{ width: "300px" }}
                        placeholder="Click here and Please select the operator"
                        onChange={this.handleDropdownChangeOperatorId}
                        
                    >
                        {this.state.list.map((test) => <Option value={test.operator_name}> 
                        {test.operator_name} </Option> )}
                                        
                    </Select>
                    </Form.Item>
                    
                    <Form.Item className="buttonset"> 
                        <Space>
          <Button type="primary" 
          onClick={this.saveUser} 
          disabled={!this.state.cluster_name  || !this.state.cluster_type || !this.state.operator_ids}
            >Submit</Button>
          <Button type="primary" onClick={() => this.props.history.push('/environmentSetup-operatorCluster')}>Cancel</Button>
          </Space>
                </Form.Item>


                </Form>
            </div>
        );
    }
}

export default AddOperatorCluster;