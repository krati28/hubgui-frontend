import React, { Component } from 'react';
import {Menu} from "antd";
import {Route, NavLink, Router} from "react-router-dom";

import history from './History';

import HomeNetwork from './envSetup/HomeNetworkMenu/HomeNetwork';
import  AddPCDetails from "./envSetup/HomeNetworkMenu/AddPCDetails"
import Pcddetails from './envSetup/HomeNetworkMenu/Pcddetails';
import AddMNPGateway from './envSetup/HomeNetworkMenu/AddMNPGateway';
import MNPdetails from './envSetup/HomeNetworkMenu/MNPdetails';
import RedirectionList from './envSetup/RedirectionListMenu/RedirectionList';
import AddRedirectionList from "./envSetup/RedirectionListMenu/AddRedirectionList"
import OperatorCluster from "./envSetup/OperatorClusterMenu/OperatorCluster";
import AddOperatorCluster from "./envSetup/OperatorClusterMenu/AddOperatorCluster";
import LCRProfile from "./envSetup/LCRProfileMenu/LCRProfile";
import AddLCRProfile from "./envSetup/LCRProfileMenu/AddLCRProfile";
import DealManagement from "./envSetup/DealManagementMenu/DealManagement";
import AddDealManagement from "./envSetup/DealManagementMenu/AddDealManagement";

import PathDetails from "./envSetup/PathDetailsMenu/PathDetails";
import AddPathDetails from "./envSetup/PathDetailsMenu/AddPathDetails";
// import Welcome from "./LoginMenu/Welcome";

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

function handleClick(e) {
  console.log('click', e);
}

class Main extends Component{
    render(){
        return(
            <Router history={history}>
            <div >
            <Layout>
            <Header><div className='headerdata'><b>SMSHUB</b></div>
            
            </Header>
            <Layout>
              <Sider className="sidebar">
              <div  className="siderdata">Welcome Admin</div>
                <Menu onClick={handleClick}  mode="vertical">
                    <SubMenu
                    key="sub1"
                    title={
                        <span>
                        <span>Service Management</span>
                        </span>
                    }
                    >
                        <Menu.Item key="1">Service Parameters</Menu.Item>
        
      
                    </SubMenu>
    <SubMenu
      key="sub2"
      title={
        <span>
          <span>Environment Setup</span>
        </span>
      }
    >
      <Menu.Item><NavLink to="/environmentSetup-homeNetwork">Home Network</NavLink></Menu.Item>
      <Menu.Item>Retry Policy</Menu.Item>
      <Menu.Item>Redirection Accounts</Menu.Item>
      <Menu.Item > <NavLink  to="/environmentSetup-redirectionList"></NavLink> Redirection List</Menu.Item>
      <Menu.Item>Operator Profile</Menu.Item>
      <Menu.Item> <NavLink  to="/environmentSetup-pathDetails">Path Details</NavLink>Path Details</Menu.Item>
      <Menu.Item><NavLink  to="/environmentSetup-operatorCluster">Operator Cluster</NavLink>Operator Cluster</Menu.Item>
      <Menu.Item><NavLink to="/environmentSetup-lcrProfile">LCR Profile</NavLink></Menu.Item>
      <Menu.Item>SC AT LCR Profile</Menu.Item>
      <Menu.Item>Customer/Supplier</Menu.Item>
      <Menu.Item>HTTP Templates</Menu.Item>
      <Menu.Item>Customer/Supplier Group</Menu.Item>
      <Menu.Item><NavLink to="/environmentSetup-dealManagement">Deal Management</NavLink></Menu.Item>
      <Menu.Item>Channel Partners</Menu.Item>
      <Menu.Item>Customer Credit Profile</Menu.Item>
      <Menu.Item>Credit Transactions</Menu.Item>
      </SubMenu>
    <SubMenu
      key="sub4"
      title={
        <span>
          <span>ESME Management</span>
        </span>
      }
    >
      <Menu.Item>ESME Accounts</Menu.Item>
      <Menu.Item>Ports</Menu.Item>
      <Menu.Item></Menu.Item>
    </SubMenu>

    <SubMenu title={
        <span>
            <span>Session Management</span>
        </span>
        }
        >
            <Menu.Item>ESME Sessions</Menu.Item>
            <Menu.Item>SMSC SessionsRules</Menu.Item>
            <Menu.Item>Node Sessions</Menu.Item>
        </SubMenu>

        <SubMenu title={
        <span>
            <span>Session Management</span>
        </span>
        }
        >
            <Menu.Item>Rules Configuration</Menu.Item>
            <Menu.Item>Hub Rules Configuration</Menu.Item>
        </SubMenu>

        <SubMenu title={
        <span>
            <span>Message Management</span>
        </span>
        }
        >
            <Menu.Item>SMS Query</Menu.Item>
        </SubMenu>
        <SubMenu title={
        <span>
            <span>User Management</span>
        </span>
        }
        >
            <Menu.Item>Change Password</Menu.Item>
            <Menu.Item>Provision User</Menu.Item>
            <Menu.Item>Customer Portal Users</Menu.Item>
        </SubMenu>
  </Menu></Sider>
  <Content style={{height:570}}>
  {/* <Route path="/" component={Welcome} /> */}

<Route path="/environmentSetup-homeNetwork" component={HomeNetwork}/>
<Route path="/add-pcd" component={AddPCDetails}/>
<Route path="/listpcd" component={Pcddetails}/>
<Route path="/add-mnp" component={AddMNPGateway}/>
<Route path="/listmnp" component={MNPdetails}/>

<Route path="/environmentSetup-redirectionList" component={RedirectionList} />
<Route path="/add-redirectionList" component={AddRedirectionList}/>

<Route path="/environmentSetup-operatorCluster" component={OperatorCluster}/>
<Route path="/add-operatorCluster" component={AddOperatorCluster}/>

<Route path="/environmentSetup-lcrProfile" component={LCRProfile}/>
    <Route path="/add-lcrProfile" component={AddLCRProfile} />
    

<Route path="/environmentSetup-pathDetails" component={PathDetails}/>
<Route path="/add-pathDetails" component={AddPathDetails}/>

<Route path="/environmentSetup-dealmanagement" component={DealManagement}/>
<Route path="/add-deal" component={AddDealManagement}/>
  </Content>
      </Layout>
      <Footer className="footer">© 2020 Mahindra Comviva Technologies Ltd</Footer>
    </Layout>
  
            </div>
         
                                 
            </Router>

        );
    }
}

export default  Main;