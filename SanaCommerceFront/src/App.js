import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalog from './pages/Catalog';
import Layout from './layout/Layout';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" Component={Catalog}/>
          <Route path="/cart" Component={Cart}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
