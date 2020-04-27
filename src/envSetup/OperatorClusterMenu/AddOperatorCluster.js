import React, { Component } from 'react';
import ApiService from "../../service/ApiService";
import history from "../../History"
import {Form, Input, Button, Select, Typography , Radio} from 'antd';
import FormItem from 'antd/lib/form/FormItem';


const {Option} = Select;
const operator_ids = ['p1','p2','p3','p4'];
class AddOperatorCluster extends Component{

    constructor(props){
        super(props);
        this.state ={
             cluster_id:'',
            cluster_name: '',
            cluster_type: '',
        
            selectedItems:[],
            message: null
        }
        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        ApiService.fetchUserById(window.localStorage.getItem("clusterId"))
            .then((res) => {
                
                let user = res.data.result;
                this.setState({
                    cluster_id: user.cluster_id,
                cluster_name:user.cluster_name,
                cluster_type:user.cluster_type,
                })
            });
    }
    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value },
            );
    }

    handleChange=(e)=> {
        this.setState({ ssn: e });
  }

  

    // state = {
    //     value: 1,
    //   };
    onChangeradio = (e) =>{
        this.setState({ [e.target.name]: e.target.value },
            // {[e.target.gender]:e.target.selectedOption}
            );
            
            // console.log(this.state.selectedOption)
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
        
        const { selectedItems } = this.state;
        const filteredOptions = operator_ids.filter(o => !selectedItems.includes(o));
        return(
            <div>
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
                <Form name="basic" initialValues={{remember:true}}>
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
                            type="text" 
                            placeholder = "Enter cluster name..."
                            name="cluster_name"
                            value={this.state.cluster_name} 
                            onChange={this.onChange} 
                        />
                    </Form.Item>
                    <FormItem
                        label = "Cluster Type"
                        name = "cluster_type"
                        >
                    <Radio.Group name="cluster_type"  onChange={this.onChangeradio} 
                    // value={this.state.value}
                    >
                        <Radio value={1} >Default</Radio>
                        <Radio value={2}>Roaming</Radio>

                    </Radio.Group>
                    </FormItem>

                    <FormItem>
                    <Select 
                    name="operator_ids"
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Click here and Please select the operator"
    // defaultValue={['a10', 'c12']}
    onChange={this.handleChange}
  >
     {filteredOptions.map(item => (
                            <Select.Option key={item} value={item}>
                                {item}
                            </Select.Option>
                            ))}
  </Select>
                    </FormItem>
                    
                    <Form.Item > 
          <Button type="primary" 
          onClick={this.saveUser} 
          disabled={!this.state.cluster_name} >Submit</Button>
          <Button type="primary" onClick={() => this.props.history.push('/environmentSetup-operatorCluster')}>Cancel</Button>
                </Form.Item>


                </Form>
            </div>
        );
    }
}

export default AddOperatorCluster;