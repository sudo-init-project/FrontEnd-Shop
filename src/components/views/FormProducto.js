import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { request } from '../utils/axiosHelper.js';
import { checkToken } from '../utils/authUtils.js';

const FormProducto = () => {
  const [producto, setProducto] = useState({});

  const [errors, setErrors] = useState({
    codigoEan: "",
    nombre: "",
    descripcion: "",
    tipo: "",
    marca: "",
    precio: "",
    stock: ""
  });

  const [errorForm, setErrorForm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!checkToken()) {
      navigate('/login');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};

    if (!producto.codigoEan) formErrors.codigoEan = "Ingrese el codigo ean.";
    if (!producto.nombre) formErrors.nombre = "Ingrese el nombre.";
    if (!producto.descripcion) formErrors.descripcion = "Ingrese la descripción.";
    if (!producto.tipo) formErrors.tipo = "Ingrese el tipo.";
    if (!producto.marca) formErrors.marca = "Ingrese la marca.";
    if (!producto.precio) formErrors.precio = "Ingrese el precio.";
    if (!producto.stock) formErrors.stock = "Ingrese el stock.";

    if (Object.values(formErrors).every((error) => error === "")) {
      try {

        const response = await request("POST", "/productos", producto);

        if (response.status === 200) {
          console.log(response.data);
          navigate("/inicio");
        }

      } catch (error) {

        if (error.response && error.response.data) {
          const customError = error.response.data;
          setErrorForm(customError.message);
        } else {
          setErrorForm('Error de red. Por favor, intenta nuevamente.');
        }
        console.error("Error al realizar la solicitud: ", error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container mt-5">
      <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
        <h2 className="mb-3 align-self-center">Agregar Nuevo Producto</h2>
        <div className="form-group mb-3 w-50">
          <label htmlFor="codigoEan">Codigo EAN:</label>
          <input
            type="number"
            className={`form-control ${errors.codigoEan && "is-invalid"}`}
            id="codigoEan"
            name="codigoEan"
            value={producto.codigoEan}
            onChange={(e) => setProducto({ ...producto, codigoEan: e.target.value })}
            required />
          {errors.codigoEan && <div className="invalid-feedback">{errors.codigoEan}</div>}
        </div>
        <div className="form-group mb-3 w-50">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            className={`form-control ${errors.nombre && "is-invalid"}`}
            id="nombre"
            name="nombre"
            value={producto.nombre}
            onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
            required />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
        </div>
        <div className="form-group mb-3 w-50">
          <label htmlFor="descripcion">Descripción:</label>
          <input
            className={`form-control ${errors.descripcion && "is-invalid"}`}
            id="descripcion"
            name="descripcion"
            value={producto.descripcion}
            onChange={(e) => setProducto({ ...producto, descripcion: e.target.value })}
            required />
          {errors.descripcion && <div className="invalid-feedback">{errors.descripcion}</div>}
        </div>
        <div className="form-group mb-3 w-50">
          <label htmlFor="tipo">Tipo:</label>
          <input
            type="text"
            className={`form-control ${errors.tipo && "is-invalid"}`}
            id="tipo"
            name="tipo"
            value={producto.tipo}
            onChange={(e) => setProducto({ ...producto, tipo: e.target.value })}
            required />
            {errors.tipo && <div className="invalid-feedback">{errors.tipo}</div>}
        </div>
        <div className="form-group mb-3 w-50">
          <label htmlFor="marca">Marca:</label>
          <input
            type="text"
            className={`form-control ${errors.marca && "is-invalid"}`}
            id="marca" name="marca"
            value={producto.marca}
            onChange={(e) => setProducto({ ...producto, marca: e.target.value })}
            required />
            {errors.marca && <div className="invalid-feedback">{errors.marca}</div>}
        </div>
        <div className="form-group mb-3 w-50">
          <label htmlFor="precio">Precio: </label>
          <input
            type="number"
            className={`form-control ${errors.precio && "is-invalid"}`}
            id="precio" name="precio"
            value={producto.precio}
            onChange={(e) => setProducto({ ...producto, precio: e.target.value })}
            required />
            {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
        </div>
        <div className="form-group mb-3 w-50">
          <label htmlFor="stock">Stock: </label>
          <input
            type="number"
            className={`form-control ${errors.stock && "is-invalid"}`}
            id="stock" name="stock"
            value={producto.stock}
            onChange={(e) => setProducto({ ...producto, stock: e.target.value })}
            required />
            {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
        </div>
        {errorForm && <div className="alert alert-danger">{errorForm}</div>}
        <button
          type="button"
          className="btn btn-success align-self-center"
          onClick={handleSubmit}
        >
          Guardar producto
        </button>
        <Link to={"/inicio"} className="btn btn-primary mt-3 mb-3 align-self-center">Volver</Link>

      </form>

    </div>
  )
}

export default FormProducto