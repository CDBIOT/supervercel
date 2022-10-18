import React from 'react';
import {BrowserRouter as Router, Route , Switch, Link} from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './components/pages/Home';
import Vendas from './components/pages/Vendas';
import Users from './components/pages/Users';
import Cad_Prods from './components/pages/Cad_Prods';
import ShowProducts from './components/pages/ShowProducts';
import Product_list from './components/Product_list';

function Routes() {
  
return (
    <Router>
    <Navbar />
         <Switch>
            <Route exact path="/" component={Home}><Home /></Route>
            <Route path="/vendas" component={Vendas}><Vendas /></Route>
            <Route path="/Cad_Prods"component={Cad_Prods} ><Cad_Prods /></Route>
            <Route path="/Product_list" component={Product_list}><Product_list /></Route>
            <Route path="/Users" component={Users}><Users /></Route>
         </Switch>
    </Router>
)
}
export default Routes
