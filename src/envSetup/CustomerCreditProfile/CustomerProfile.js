import React, { Component } from 'react';
import { Button , Form} from 'antd';
import history from "../../History"
import {  EditFilled , PlusCircleFilled,  DeleteFilled } from '@ant-design/icons';

class CustomerProfile extends Component{
    addCustomer(){
        //window.localStorage.removeItem("userId");
        history.push('/add-customer');
    }
    render(){
        return(
            <div>
                <div className='topline'>Customer Credit Profile
            </div>
            <Form className="formset">
              <Form.Item>
                  <center>
                <Button type="primary" onClick={() => this.addCustomer()}>Add
                </Button>
                </center>
              </Form.Item>
              </Form>
            </div>
        )
    }
}

export default CustomerProfile;

