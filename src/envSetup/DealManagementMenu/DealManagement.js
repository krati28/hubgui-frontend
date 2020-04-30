import React, { Component } from 'react';
import { Button, Typography , Form} from 'antd';

const {Title} = Typography;

class DealManagement extends Component{

    addDeal(){
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-deal');
    }

    render(){
        return(
            <div>
            <div className='topline'>Deal Management</div>
          <Form className='formset' >
              <Form.Item>
                    
                <Button type="primary" onClick={() => this.addDeal()}> Add deal</Button>
                </Form.Item></Form>
            </div>
        )
    }
}

export default DealManagement;

