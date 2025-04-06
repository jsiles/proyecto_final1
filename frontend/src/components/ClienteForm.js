import React, { useState } from 'react'; // Importamos React y el hook useState para manejar los estados.
import axios from 'axios'; // Importamos axios para realizar las peticiones HTTP.

const ClienteForm = ({ onClienteAdded }) => { // Declaramos el componente ClienteForm, que recibe la prop onClienteAdded.
  const [nombre, setNombre] = useState(''); // Creamos el estado 'nombre' con valor inicial vacío.
  const [correo, setCorreo] = useState(''); // Creamos el estado 'correo' con valor inicial vacío.

  const handleSubmit = async (e) => { // Definimos la función handleSubmit que se ejecutará al enviar el formulario.
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario (recargar la página).
    try {
      // Asegúrate de que esta URL coincida con la del backend
      const response = await axios.post('http://localhost:3001/clientes', { // Realizamos una petición POST al servidor con los datos.
        nombre, // Enviamos el valor de 'nombre'.
        correo, // Enviamos el valor de 'correo'.
      });
      onClienteAdded(response.data); // Llamamos a la función onClienteAdded con los datos del cliente agregado desde la respuesta del servidor.
      setNombre(''); // Limpiamos el campo de 'nombre' después de enviar el formulario.
      setCorreo(''); // Limpiamos el campo de 'correo' después de enviar el formulario.
    } catch (error) { // En caso de que haya un error en la petición.
      console.error('Error al agregar cliente:', error.response?.data || error.message); // Imprimimos el error en la consola.
    }
  };

  return (
    <form onSubmit={handleSubmit}> {/* El formulario ejecuta handleSubmit cuando se envía. */}
      <input
        type="text" // Especificamos que este campo es para ingresar texto (nombre).
        placeholder="Nombre" // El texto que aparecerá dentro del campo cuando esté vacío.
        value={nombre} // El valor del input será el estado 'nombre'.
        onChange={(e) => setNombre(e.target.value)} // Cuando el valor cambia, actualizamos el estado 'nombre'.
        required // Hacemos el campo obligatorio.
      />
      <input
        type="email" // Especificamos que este campo es para ingresar un correo electrónico.
        placeholder="Correo" // El texto que aparecerá dentro del campo cuando esté vacío.
        value={correo} // El valor del input será el estado 'correo'.
        onChange={(e) => setCorreo(e.target.value)} // Cuando el valor cambia, actualizamos el estado 'correo'.
        required // Hacemos el campo obligatorio.
      />
      <button type="submit">Agregar Cliente</button> {/* El botón que envía el formulario. */}
    </form>
  );
};

export default ClienteForm; // Exportamos el componente ClienteForm para usarlo en otros archivos.
