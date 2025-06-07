import { useEffect } from 'react';
import { Outlet, useNavigate} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  const navigate = useNavigate();

  useEffect(()=>{
    if (window.location.pathname === '/') {
      navigate('/login', { replace: true });
    }
  },[])
  return (
    
    <>
      <Header />
      <Outlet /> 
      {/* Outlet seria el padre en el que se enviaría la prop, 
      con el título de la tabla, pero de la manera en la que uso 
      react-router, esta prop la envío desde el componente main.jsx 
      que se conecta con esta para el manejo de las rutas */}
      <Footer />
    </>
  );
}

export default App;
