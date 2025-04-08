import React, { useState } from 'react';
import TareaForm from '../components/TareaForm';
import TareaList from '../components/TareaList';
import '../styles/Cliente.css'

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  const handleClienteAdded = (nuevoCliente) => {
    setClientes([...clientes, nuevoCliente]);
  };

  return (
    <div className="clientes-container">
      <div className="clientes-form">
        <div>Buscar:</div>
        <TareaForm onClienteAdded={handleClienteAdded} />
      </div>
      <div className="clientes-list">
        <TareaList />
      </div>

    </div>
  );
};

export default Clientes;
