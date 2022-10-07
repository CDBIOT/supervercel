import React from 'react';

import {BrowserRouter as Router, Route , Switch, Link} from 'react-router-dom';


import Home from './components/pages/Home';
import Contato from './components/pages/Contato';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';


function Routes() {
  

return (
    
    <Router>
         <Switch>
            <Route path="/" exact component = {Home}></Route>
            <Route path="/Contato" component = {Contato}></Route>
            <Route path="/NewProject" component = {NewProject}></Route>
            <Route path = "/Company" component = {Company}></Route>
         </Switch>
    </Router>
)
}
export default Routes
