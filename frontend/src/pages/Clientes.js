import React, { useState } from 'react';
import ClienteForm from '../components/ClienteForm';
import ClienteList from '../components/ClienteList';
import '../styles/Cliente.css'

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  const handleClienteAdded = (nuevoCliente) => {
    setClientes([...clientes, nuevoCliente]);
  };

  return (
    <div className="clientes-container">
      <h1>Clientes</h1>
      <div className="clientes-form">
        <ClienteForm onClienteAdded={handleClienteAdded} />
      </div>
      <div className="clientes-list">
        <ClienteList />
      </div>
    </div>
  );
};

export default Clientes;
