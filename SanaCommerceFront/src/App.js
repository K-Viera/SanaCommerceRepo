import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Catalog from "./pages/Catalog";
import Layout from "./layout/Layout";
import store from "./redux/store"; // Corrected the file name
import Cart from "./pages/Cart";
import LoginPage from "./pages/Loging";
import { Provider } from "react-redux";


function App() {
  return (
    <Router>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path="/" Component={Catalog} />
            <Route path="/cart" Component={Cart} />
            <Route path="/login" Component={LoginPage} />
          </Routes>
        </Layout>
      </Provider>
    </Router>
  );
}

export default App;
