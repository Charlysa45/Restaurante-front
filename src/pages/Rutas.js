import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Menus from './Menus';
import Home from './Home';
import Restaurantes from './Restaurantes';
import RestPage from './RestPage';

const Rutas = () => {
  return <div>
      <Router>
          <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="restaurantes" element={<Restaurantes/>}/>
                <Route path="restaurantes/:restInfo" element={<RestPage/>}/>
                <Route path="menus" element={<Menus/>}/>
          </Routes>
      </Router>
  </div>;
};

export default Rutas;
