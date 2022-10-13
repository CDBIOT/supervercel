import React from 'react';
import {BrowserRouter as Router, Route , Switch, Link} from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './components/pages/Home';
import Contato from './components/pages/Contato';
import Users from './components/pages/Users';
import Cad_Prods from './components/pages/Cad_Prods';
import ShowProducts from './components/pages/ShowProducts';

function Routes() {
  
return (
    <Router>
    <Navbar />
         <Switch>
            <Route exact path="/" component={Home}><Home /></Route>
            <Route path="/Contato" component={Contato}><Contato /></Route>
            <Route path="/Cad_Prods"component={Cad_Prods} ><Cad_Prods /></Route>
            <Route path="/ShowProducts" component={ShowProducts}><ShowProducts /></Route>
            <Route path="/users" component={Users}><Users /></Route>
         </Switch>
    </Router>
)
}
export default Routes
