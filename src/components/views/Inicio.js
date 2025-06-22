import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkToken } from '../utils/authUtils.js';
import { request, setAuthToken } from '../utils/axiosHelper.js';

const Inicio = ({ tituloTablaProductos, tituloTablaClientes }) => {
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([])
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const getData = async () => {
        try {
            const responseProductos = await request("GET", "/productos", "")
            const responseClientes = await request("GET", "/clientes", "")

            setProductos(responseProductos.data);
            setClientes(responseClientes.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        if (!checkToken()) {
            navigate('/login');
        }
        getData();
    }, []);

    const handleDeleteProducto = async (id) => {
        try {
            await request("DELETE", `/productos/${id}`)

            getData();
        } catch (error) {
            setError(error);
        }
    };

    const handleDeleteCliente = async (id) => {
        try {
            await request("DELETE", `/clientes/${id}`)

            getData();
        } catch (error) {
            setError(error);
        }
    };

    return (
        <>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header">
                        <h3>{tituloTablaProductos}</h3>
                    </div>
                    <div className="card-body">
                        {error && <div className="alert alert-danger">{error.message}</div>}
                        {productos.length === 0 ? (
                            <p className="alert alert-info">No se encontraron productos.</p>
                        ) : (
                            <table className="table table-striped table-hover table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col" className="w-4">ID</th>
                                        <th scope="col" className="w-2">Código EAN</th>
                                        <th scope="col" className="w-3">Nombre</th>
                                        <th scope="col" className="w-4">Descripción</th>
                                        <th scope="col" className="w-2">Tipo</th>
                                        <th scope="col" className="w-2">Marca</th>
                                        <th scope="col" className="w-2">Precio</th>
                                        <th scope="col" className="w-2">Stock</th>
                                        <th scope="col" className="w-2">Gestión</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((producto, index) => (
                                        <tr key={index}>
                                            <td>{producto.id}</td>
                                            <td>{producto.codigoEan}</td>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.descripcion}</td>
                                            <td>{producto.tipo}</td>
                                            <td>{producto.marca}</td>
                                            <td>{producto.precio}</td>
                                            <td>{producto.stock}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteProducto(producto.id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                                <Link
                                                    to={`/productos/modificar/${producto.id}`}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    <i className="bi bi-pencil-fill"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="card-footer">
                        <Link to="/productos/agregar" className="btn btn-success">
                            Nuevo Producto
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header">
                        <h3>{tituloTablaClientes}</h3>
                    </div>
                    <div className="card-body">
                        {error && <div className="alert alert-danger">{error.message}</div>}
                        {clientes.length === 0 ? (
                            <p className="alert alert-info">No se encontraron clientes.</p>
                        ) : (
                            <table className="table table-striped table-hover table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col" className="w-4">ID</th>
                                        <th scope="col" className="w-2">Nombre</th>
                                        <th scope="col" className="w-3">Apellido</th>
                                        <th scope="col" className="w-4">Fecha Ingreso</th>
                                        <th scope="col" className="w-2">Domicilio</th>
                                        <th scope="col" className="w-2">Teléfono</th>
                                        <th scope="col" className="w-2">Gestión</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes.map((cliente, index) => (
                                        <tr key={index}>
                                            <td>{cliente.id}</td>
                                            <td>{cliente.nombre}</td>
                                            <td>{cliente.apellido}</td>
                                            <td>{cliente.fechaIngreso}</td>
                                            <td>{cliente.domicilio}</td>
                                            <td>{cliente.telefono}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteCliente(cliente.id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                                <Link
                                                    to={`/clientes/modificar/${cliente.id}`}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    <i className="bi bi-pencil-fill"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="card-footer">
                        <Link to="/clientes/agregar" className="btn btn-success">
                            Nuevo Cliente
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Inicio;