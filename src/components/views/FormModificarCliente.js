import React, {useEffect, useState} from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { checkToken } from '../utils/authUtils';
import { request } from '../utils/axiosHelper';

const FormModificarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({});

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    fechaIngreso: "",
    domicilio: "",
    telefono: ""
  });

  const [errorForm, setErrorForm] = useState("");

  useEffect(() => {
    if (!checkToken()) {
      navigate('/login');
    }
  }, []);

  useEffect(()=>{

    const getCliente = async () => {
      try {

        const response = await request("GET",`/clientes/${id}`,"");

        setCliente(response.data);
      } catch (error) {
        setErrors(error);
      }
    };

    getCliente();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};

    if (!cliente.nombre) formErrors.nombre = "Ingrese el nombre.";
    if (!cliente.apellido) formErrors.apellido = "Ingrese el apellido.";
    if (!cliente.fechaIngreso) formErrors.fechaIngreso = "Ingrese la fecha de ingreso.";
    if (!cliente.domicilio) formErrors.domicilio = "Ingrese el domicilio.";
    if (!cliente.telefono) formErrors.telefono = "Ingrese la teléfono.";

    if (Object.keys(formErrors).length === 0) {
      try {

        const response = await request("PUT", "/clientes", cliente);

        if (response.status === 200) {
          console.log(response.data);
          navigate("/inicio");
        } else {
          setErrors({ general: 'Error al crear el cliente.' });
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
        <h2 className="mb-3 align-self-center">Modificar Cliente</h2>
        <div className="form-group mb-3 w-50">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            className={`form-control ${errors.nombre && "is-invalid"}`}
            id="nombre"
            name="nombre"
            value={cliente.nombre}
            onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
            required />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
        </div>
        <div className="form-group mb-3 w-50">
          <label htmlFor="apellido">Apellido:</label>
          <input
            className={`form-control ${errors.apellido && "is-invalid"}`}
            id="apellido"
            name="apellido"
            value={cliente.apellido}
            onChange={(e) => setCliente({ ...cliente, apellido: e.target.value })}
            required />
          {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
        </div>
        <div className="form-group mb-3 w-50">
          <label htmlFor="fechaIngreso">Fecha Ingreso:</label>
          <input
            type="date"
            className={`form-control ${errors.fechaIngreso && "is-invalid"}`}
            id="fechaIngreso"
            name="fechaIngreso"
            value={cliente.fechaIngreso}
            onChange={(e) => setCliente({ ...cliente, fechaIngreso: e.target.value })}
            required />
            {errors.fechaIngreso && <div className="invalid-feedback">{errors.fechaIngreso}</div>}
        </div>
        <div className="form-group mb-3 w-50">
          <label htmlFor="domicilio">Domicilio:</label>
          <input
            type="text"
            className={`form-control ${errors.domicilio && "is-invalid"}`}
            id="domicilio" name="domicilio"
            value={cliente.domicilio}
            onChange={(e) => setCliente({ ...cliente, domicilio: e.target.value })}
            required />
            {errors.domicilio && <div className="invalid-feedback">{errors.domicilio}</div>}
        </div>
        <div className="form-group mb-3 w-50">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="number"
            className={`form-control ${errors.telefono && "is-invalid"}`}
            id="telefono" name="telefono"
            value={cliente.telefono}
            onChange={(e) => setCliente({ ...cliente, telefono: e.target.value })}
            required />
            {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
        </div>
        {errorForm && <div className="alert alert-danger">{errorForm}</div>}
        <button
          type="button"
          className="btn btn-success mb-3 align-self-center"
          onClick={handleSubmit}
        >
          Modificar Cliente
        </button>
        <Link to={"/inicio"} className="btn btn-primary mt-3 mb-3 align-self-center">Volver</Link>
      </form>

    </div>
  )
}

export default FormModificarCliente