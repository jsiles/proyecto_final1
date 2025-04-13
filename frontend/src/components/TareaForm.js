import React, { useState } from 'react'; // Importamos React y el hook useState para manejar los estados.
const TareaForm = ({ onBuscar }) => {
  const [titulo, setTitulo] = useState('');
  const [estado, setEstado] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(titulo, estado);
    setEstado('');
    setTitulo('');
  };

  return (
    <div class="content-filter">
      <form onSubmit={handleSubmit} class="formulario-default">
        <input class="inpMd"
          type="text"
          placeholder="título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}

        />
        <select class="inpMd" value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Selecciona estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>

        <button type="submit" class="btn-srch">Buscar</button>
      </form>
    </div>
  );
};
export default TareaForm;
