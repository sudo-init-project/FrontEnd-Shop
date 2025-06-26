import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from "./components/views/Inicio";
import FormProducto from './components/views/FormProducto';
import FormModificarProducto from './components/views/FormModificarProducto';
import FormCliente from './components/views/FormCliente';
import FormModificarCliente from './components/views/FormModificarCliente';
import Login from './components/login/Login';
import NoPage from './components/views/NoPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/inicio' element={<Inicio tituloTablaProductos={"Listado de Productos EGI FINAL FINAL 3.1" } tituloTablaClientes={"Listado de Clientes"}/>} /> {/*Aquí paso el título de la tabla por prop*/}
          
          <Route path='/productos/agregar' element={<FormProducto />} />
          <Route path='/productos/modificar/:id' element={<FormModificarProducto />} />
          
          <Route path='/clientes/agregar' element={<FormCliente />} />
          <Route path='/clientes/modificar/:id' element={<FormModificarCliente />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
