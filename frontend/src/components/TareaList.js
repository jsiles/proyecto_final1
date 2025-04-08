import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TareaList.css'; // Importa los estilos

const TareaList = () => {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tasks'); // URL corregida
        setTareas(response.data);
      } catch (err) {
        console.error('Error al obtener tareas:', err);
        setError('No se pudieron cargar los tareas.', err);
      }
    };

    fetchTareas();
  }, []);

  return (
    <div className="table-container">
      <h3>Lista de Tareas</h3>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Fecha Límite</th>
          </tr>
        </thead>
        <tbody>
          {tareas.length > 0 ? (
            tareas.map((tarea) => (
              <tr key={tarea.id}>
                <td>{tarea.id}</td>
                <td>{tarea.titulo}</td>
                <td>{tarea.descripcion}</td>
                <td>{tarea.estado}</td>
                <td>{tarea.fechaLimite}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">
                No hay tareas registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TareaList;

