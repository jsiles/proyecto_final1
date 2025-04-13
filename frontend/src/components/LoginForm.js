import React, { useState } from 'react';
import logo from '../lib/jedi0.png';


const LoginForm = ({ onLogin, onRegister }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const limpiarCampos = () => {
    setUsername('');
    setPassword('');
    setPassword2('');
    setError('');
    setEmail('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (isRegistering) {
      if (password !== password2) {
        setError('Las contraseñas no coinciden.');
        return;
      }

      // Registro
      await onRegister({ email, username, password });
      setIsRegistering(!isRegistering);
      limpiarCampos();

    } else {
      // Login
      await onLogin({ email, password });
      limpiarCampos();
    }
  };

  return (
    <div>
      <div className="wapper">
        <div className="content-login-user">
          <img src={logo} alt="Code" />
          <form onSubmit={handleSubmit} className="form-princ">
            {isRegistering && (
              <p>
                <label>Nombre Completo:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </p>
            )}
            <p>
              <label>Correo:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>
            <p>
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </p>

            {isRegistering && (
              <p>
                <label>Repetir Contraseña:</label>
                <input
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </p>
            )}

            {error && (
              <p style={{ color: 'red', marginTop: '10px' }}>
                {error}
              </p>
            )}

            <p>
              <button type="submit" className="button">
                {isRegistering ? 'Registrarse' : 'Iniciar sesión'}
              </button>
            </p>
          </form>

          <p>
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              className="link-1"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#00f' }}
            >
              {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
