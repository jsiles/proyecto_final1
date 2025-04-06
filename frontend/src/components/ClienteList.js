import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ClienteList.css'; // Importa los estilos

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/clientes'); // URL corregida
        setClientes(response.data);
      } catch (err) {
        console.error('Error al obtener clientes:', err);
        setError('No se pudieron cargar los clientes.');
      }
    };

    fetchClientes();
  }, []);

  return (
    <div className="table-container">
      <h2>Lista de Clientes</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.correo}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">
                No hay clientes registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteList;
