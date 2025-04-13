import React, { useState, useEffect } from 'react'; // Importamos React y el hook useState para manejar los estados.
const TareaFormEditar = ({ tarea, onTareaEditar, onCancelar }) => {
  const [titulo, setTitulo] = useState('');
  const [estado, setEstado] = useState('pendiente');
  const [descripcion, setDescripcion] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
 
  useEffect(() => {

    if (tarea) {
      setTitulo(tarea.titulo || '');
      setDescripcion(tarea.descripcion || '');
      setEstado(tarea.estado || 'Pendiente');
      setFechaLimite(tarea.fechaLimite?.split('T')[0] || '');
    }
  }, [tarea]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onTareaEditar(tarea.id, titulo, descripcion, estado, fechaLimite);
    setEstado('');
    setTitulo('');
    setDescripcion('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-princ">
        <fieldset>
          <p><b class="color-3">Editar Tarea</b></p>
          <p>
            <label>Tarea:<span className="color-4">*</span></label>
            <input type="text" className="inpB" placeholder="título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
          </p>
          <p>
            <label>Descripción:<span className="color-4">*</span></label>
            <input type="text" className="inpB" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
          </p>
          <p>
          <label>Estado:<span className="color-4">*</span></label>
            <select class="inpMd" required value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="">Selecciona estado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En progreso">En progreso</option>
              <option value="Completada">Completada</option>
            </select>
          </p>
          <p>
            <label>FechaLimite:<span className="color-4">*</span></label>
            <input type="date" className="inpB" placeholder="fecha limite" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} required />
          </p>
          <p>
            <input type='hidden' value={tarea.usuarioId}></input>
          </p>
          <div className="linea">
            <button type="submit" className="btn-guardar">Guardar</button>
            <button type="button" className="btn-cancelar" onClick={onCancelar}>Cancelar</button>
          </div>

        </fieldset>
      </form>
    </div>
  );
};
export default TareaFormEditar;
