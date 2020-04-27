import React,{ Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
// import Main from '../Main';
// import {Route,  Router} from "react-router-dom";
import history from "../History";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


class Login extends Component{

    constructor() {
            super();
            this.state = {
              username: '',
              password: '',
              redirect:false
            };
        this.getUsername = this.getUsername.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    getPassword(e){
        this.setState({password: e.target.value});
    }
    getUsername(e){
        this.setState({username : e.target.value});
    }
    handleSubmit (){
        console.log("Username is "+ this.state.username);
        console.log("Password is "+this.state.password);

        if(this.state.password === "admin" && this.state.username === "admin"){
            // this.props.history.push('/homePage');
            history.push("/welcome");
        }
        else{
            console.log("Failed");
            alert("Invalid credentials");
        }
    }

    render(){
        return (
            <div>
                <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                
                >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Input  onChange={this.getUsername} />
                </Form.Item>
        
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password  onChange={this.getPassword} />
                </Form.Item>
        
                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
            
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onClick={ () => this.handleSubmit()}>
                    Submit
                    </Button>
                </Form.Item>
                </Form>
            </div>

            
        );
    }
}
  
export default Login; 
