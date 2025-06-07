import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Footer.js';
import { setAuthToken } from '../utils/axiosHelper.js';

const Login = () => {
    const [credenciales, setCredenciales] = useState({
      username: '',
      password: '',
    });
  
    const [error, setError] = useState(null);
    
  
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:8080/auth/login', credenciales);
  
        if (response.data.token) {
          const authToken = response.data.token;
  
          setAuthToken(authToken)
          navigate('/inicio');
        } else {
          setError(response.data.error);
        }
      } catch (error) {
        console.error('Error during login:', error);
        setError('Ocurrió un error en el proceso de autenticación');
      }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredenciales((prevCredenciales) => ({
            ...prevCredenciales,
            [name]: value,
        }));
        setError(null);
    };

    return (
        <>
            <header className="container" id="header">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <div className="col-md-3 mb-2 mb-md-0">
                        <a className="d-inline-flex link-body-emphasis text-decoration-none">
                            <h2><i class="bi bi-shop-window"></i></h2>
                        </a>
                    </div>
                </div>
            </header>
            <main className="container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <div className="card p-5">
                            <h2>Login</h2>
                            <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                                <div className="mb-3 w-50">
                                    <label htmlFor="username">Usuario:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={credenciales.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 w-50">
                                    <label htmlFor="password">Contraseña:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={credenciales.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                {error && <div className="alert alert-danger mb-3 w-50">
                                    {error}
                                </div>}

                                <button type="submit" className="btn btn-primary mb-3 align-self-center">
                                    Iniciar Sesión
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Login;{}