import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route, Switch,  BrowserRouter} from "react-router-dom"
import Main from "./Main";
import Login from "../src/LoginMenu/Login";
import history from "../src/History";

class App extends Component{
    render(){
    return (
        <div className="center">
       
          <BrowserRouter history={history}> 
            <div className="col-md-6">
               <Switch>
                  <Route exact path="/" component={Login} />
                      
                  <Route path='/welcome' component={Main}>
      
                  </Route>
              </Switch>
                      
                 
            </div>
          </BrowserRouter>
     
        </div>
    );
  }
  
}

export default App;
