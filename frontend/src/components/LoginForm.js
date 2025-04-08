import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la validación real con tu backend
    if (username && password) {
      onLogin({ username });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Usuario:</label>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default LoginForm;
