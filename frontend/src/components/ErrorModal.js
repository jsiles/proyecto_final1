import React from 'react';
import '../styles/ErrorModal.css'; // Importa los estilos

const ErrorModal = ({ mensaje, onCerrar }) => {
  if (!mensaje) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Algo sucedio!!!</h3>
        <p>{mensaje}</p>
        <p><br></br></p>
        <p>
        <button className='btn-cancelar' onClick={onCerrar}>Cerrar</button>
        </p>
      </div>
    </div>
  );
};

export default ErrorModal;
