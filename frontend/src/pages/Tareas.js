import React, { useState } from 'react';
import ErrorModal from '../components/ErrorModal'; 
import TareaForm from '../components/TareaForm';
import TareaFormCrear from '../components/TareaFormCrear';
import TareaFormEditar from '../components/TareaFormEditar';
import TareaList from '../components/TareaList';
import '../styles/Cliente.css';
import axios from 'axios';

const Tareas = () => {
  const [filtros, setFiltros] = useState({ titulo: '', estado: '' });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarFormulario2, setMostrarFormulario2] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [refrescar, setRefrescar] = useState(false);
  const [errorModal, setErrorModal] = useState('');

  const manejarCambioFiltros = (titulo, estado) => {
    setFiltros({ titulo, estado });
  };
  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    setFiltros({ ...filtros });
  };

  const toggleFormulario2 = (tarea) => {
    setTareaSeleccionada(tarea);
    setMostrarFormulario2(!mostrarFormulario2);
    setFiltros({ ...filtros });
  };

  const handleTareaCreada = async (titulo, descripcion, estado, fechaLimite, usuarioId) => {
    // Puedes aquí recargar tareas o cerrar el formulario si quieres
    setMostrarFormulario(false);
    setFiltros({ ...filtros }); // Fuerza recarga de la lista
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        process.env.REACT_APP_API_URL+'/api/tasks',
        {
          titulo,
          descripcion,
          estado,
          fechaLimite,
          usuarioId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      console.log(response.data);
      // Puedes mostrar mensaje de éxito o recargar lista aquí
      setMostrarFormulario(!mostrarFormulario);
      setMostrarFormulario2(mostrarFormulario2);
      setRefrescar(prev => !prev);
    } catch (err) {
      console.error('Error al crear tarea:', err);
      setErrorModal('No se pudo crear la tarea.');
    }

  };

  const handleTareaEditar = async (id, titulo, descripcion, estado, fechaLimite, usuarioId) => {
    // Puedes aquí recargar tareas o cerrar el formulario si quieres
    setMostrarFormulario(false);
    setFiltros({ ...filtros }); // Fuerza recarga de la lista
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        process.env.REACT_APP_API_URL+`/api/tasks/${id}`,
        {
          titulo,
          descripcion,
          estado,
          fechaLimite,
          usuarioId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      console.log(response.data);
      const mensaje  = response.data
      if(mensaje.error)
      {   setErrorModal(mensaje.error);
        setMostrarFormulario(mostrarFormulario);
        setMostrarFormulario2(!mostrarFormulario2);
        setRefrescar(prev => !prev);
        return;}
      // Puedes mostrar mensaje de éxito o recargar lista aquí
      setMostrarFormulario(mostrarFormulario);
      setMostrarFormulario2(!mostrarFormulario2);
      setRefrescar(prev => !prev);
    } catch (err) {
      console.error('Error al editar tarea:', err);
      setErrorModal('No se pudo editar la tarea.');
    }

  };

  const handleTareaEliminar = async (tarea) => {
    // Puedes aquí recargar tareas o cerrar el formulario si quieres
    setMostrarFormulario(false);
    setFiltros({ ...filtros }); // Fuerza recarga de la lista
    const { id } = tarea;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        process.env.REACT_APP_API_URL+`/api/tasks/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
      );

      console.log(response.data);
      // Puedes mostrar mensaje de éxito o recargar lista aquí
      // Refrescar lista de tareas
      setFiltros({ ...filtros });
      setRefrescar(prev => !prev);

    } catch (err) {
      console.error('Error al eliminar tarea:', err);
      setErrorModal('No se pudo eliminar la tarea.');
    }

  };

  const cerrarFormularioEditar = () => {
    setMostrarFormulario2(false);
    setTareaSeleccionada(null); // opcional, para limpiar el estado
  };



  return (
    <div class="content">
      <a href="#" class="btn-3" onClick={toggleFormulario}>Crear Tarea</a>
      <h1>Tareas</h1>
      <div >
        {!mostrarFormulario && !mostrarFormulario2 && (
          <div>
            <TareaForm onBuscar={manejarCambioFiltros} />
          </div>
        )}
        {!mostrarFormulario && !mostrarFormulario2 && (
          <div>
            <TareaList refrescar={refrescar} filtros={filtros} tarea={tareaSeleccionada} onEditarTarea={toggleFormulario2} onEliminarTarea={handleTareaEliminar} />
          </div>
        )}

        <div>
          {mostrarFormulario && (
            <div>
              <TareaFormCrear modo="crear" onTareaCreada={handleTareaCreada} onCancelar={toggleFormulario} />
            </div>
          )}
          {mostrarFormulario2 && (
            <div>
              <TareaFormEditar modo="editar" tarea={tareaSeleccionada} onCancelar={cerrarFormularioEditar} onTareaEditar={handleTareaEditar} />
            </div>
          )}
        </div>
        <ErrorModal mensaje={errorModal} onCerrar={() => setErrorModal('')} />
      </div>
    </div>
  );
};

export default Tareas;
