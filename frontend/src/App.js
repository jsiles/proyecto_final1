import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Tareas from './pages/Tareas';
import ErrorModal from './components/ErrorModal';

const App = () => {
  const [email, setUser] = useState(null);
  const [isOK, setIsOk] = useState(false);
  const [errorModal, setErrorModal] = useState('');
  const onLogin = async ({ email, password }) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL+'/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "correo": email, "contrasena": password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Aquí puedes guardar el token, redirigir, etc.
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('usuarioId', data.usuarioId);
        const username = data.username
        setUser({ email, password, username });
      } else {
        setErrorModal(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error de red:', err);
      setErrorModal('Error de red o servidor no disponible');
    }

  };
  const onRegister = async ({ email, username, password }) => {
    //setUser({ email, username, password });
    try {
      const response = await fetch(process.env.REACT_APP_API_URL+'/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "nombre": username, "correo": email, "contrasena": password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Aquí puedes guardar el token, redirigir, etc.

        setIsOk(!isOK);
      } else {
        setErrorModal(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error de red:', err);
      setErrorModal('Error de red o servidor no disponible');
    }
  };

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem('username');
  };

  return (
    <div className="App">
      {email ? (
        <div class="wrapper">
        <header>
        <nav>
            <a href="#" class="logo" >Bienvenido {  email.username} </a>
            <a class="menu-mb"><span></span></a>
            <ul>
                <li><a href="#" class="active">Tareas</a></li>
            </ul>
            <a href="#" onClick={onLogout} class="exit">cerrar sesión</a>
        </nav>
    </header>
    <div>
          {/* Aquí iría el contenido de tu app autenticada */}
          <Tareas></Tareas>

        </div>
    </div>
        
      ) : (
        <div>
        <LoginForm onLogin={onLogin} onRegister={onRegister} />
        <div style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'green', fontSize:14 }}>
        {isOK ? 'Alta de usuario Correcto inicie sesión' : ''}
</div>
</div>
      )}
        <ErrorModal mensaje={errorModal} onCerrar={() => setErrorModal('')} />
    </div>
  );
};

export default App;
