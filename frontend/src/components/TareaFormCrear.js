import React, { useState } from 'react'; // Importamos React y el hook useState para manejar los estados.
const TareaFormCrear = ({ onTareaCreada, onCancelar }) => {
  const [titulo, setTitulo] = useState('');
  const [estado, setEstado] = useState('Pendiente');
  const [descripcion, setDescripcion] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [usuarioId, setUsuarioId] = useState(localStorage.getItem('usuarioId'));

  const handleSubmit = (e) => {
    e.preventDefault();
    onTareaCreada(titulo, descripcion, estado, fechaLimite, usuarioId);
    setEstado('');
    setTitulo('');
    setDescripcion('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-princ">
        <fieldset>
          <p><b class="color-3">Crear Tarea</b></p>
          <p>
            <label>Tarea:<span className="color-4">*</span></label>
            <input type="text" className="inpB" placeholder="título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required/>
          </p>
          <p>
            <label>Descripción:<span className="color-4">*</span></label>
            <input type="text" className="inpB" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required/>
          </p>
          <p>
            <label>FechaLimite:<span className="color-4">*</span></label>
            <input type="date" className="inpB" placeholder="fecha limite" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} required/>
          </p>
          <p>
            <input type='hidden' className="inpB" value={estado} />
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
export default TareaFormCrear;
