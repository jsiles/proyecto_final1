import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TareaList.css'; // Importa los estilos

const TareaList = ({ filtros, onEditarTarea, onEliminarTarea, refrescar  }) => {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/tasks', {
          params: {
            search: filtros.titulo,
            status: filtros.estado
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        
        setTareas(response.data);
      } catch (err) {
        console.error('Error al obtener tareas:', err);
        //setError('No se pudieron cargar las tareas.');
      }
    };

    fetchTareas();
  }, [filtros, refrescar]); // Se actualiza cada vez que cambian los filtros

  // El resto del render queda igual...


  return (
    <div className="table-container">
      {error && <p className="error">{error}</p>}
      <ul class="listado-principal">
        <li class="hdLi">
          Titulo
          <span class="bx-botones">
            <span class="titCl">Estado</span>
            <span class="titCl"></span>
            <span class="titCl"></span>
          </span>
        </li>
        {tareas.length > 0 ? (
          tareas.map((tarea) => (
            <li >
              {tarea.titulo}

              <span class="bx-botones">
                <b>{tarea.estado}</b>
                <a href="#" class="btn-2"  onClick={() => onEditarTarea(tarea)}>Editar</a>
                <a href="#" class="btnDel cnfMd"  onClick={() => onEliminarTarea(tarea)}>Eliminar</a>
              </span>
            </li>
          ))
        ) : (
          <li>
            No hay tareas registrados.
          </li>
        )}
      </ul>
    </div>
  );
};

export default TareaList;

