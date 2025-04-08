import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Tareas from './pages/Tareas';
const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <h1>Bienvenido, {user.username}!</h1>
          <button onClick={handleLogout}>Cerrar sesión</button>
          {/* Aquí iría el contenido de tu app autenticada */}
          <Tareas></Tareas>

        </div>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
