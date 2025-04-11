import React, { useState } from 'react'; // Importamos React y el hook useState para manejar los estados.
import axios from 'axios'; // Importamos axios para realizar las peticiones HTTP.

const TareaForm = ({ onTareaAdded }) => { // Declaramos el componente TareaForm, que recibe la prop onTareaAdded.
  const [titulo, setTitulo] = useState(''); // Creamos el estado 'titulo' con valor inicial vacío.
  const [estado, setEstado] = useState(''); // Creamos el estado 'estado' con valor inicial vacío.

  const handleSubmit = async (e) => { // Definimos la función handleSubmit que se ejecutará al enviar el formulario.
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario (recargar la página).
   /* try {
      // Asegúrate de que esta URL coincida con la del backend
      const response = await axios.get('http://localhost:3001/api/tasks', { // Realizamos una petición POST al servidor con los datos.
        titulo, // Enviamos el valor de 'titulo'.
        estado, // Enviamos el valor de 'estado'.
      });
      onTareaAdded(response.data); // Llamamos a la función onTareaAdded con los datos del tarea agregado desde la respuesta del servidor.
      setTitulo(''); // Limpiamos el campo de 'titulo' después de enviar el formulario.
      setEstado(''); // Limpiamos el campo de 'estado' después de enviar el formulario.
    } catch (error) { // En caso de que haya un error en la petición.
      console.error('Error al agregar tarea:', error.response?.data || error.message); // Imprimimos el error en la consola.
    }*/
   setEstado(estado);
   setTitulo(titulo);
  };

  return (
    <form onSubmit={handleSubmit}> {/* El formulario ejecuta handleSubmit cuando se envía. */}
      <input
        type="text" // Especificamos que este campo es para ingresar texto (titulo).
        placeholder="título" // El texto que aparecerá dentro del campo cuando esté vacío.
        value={titulo} // El valor del input será el estado 'titulo'.
        onChange={(e) => setTitulo(e.target.value)} // Cuando el valor cambia, actualizamos el estado 'titulo'.
        required // Hacemos el campo obligatorio.
        name="search"
      />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input
        type="text" // Especificamos que este campo es para ingresar un estado electrónico.
        placeholder="estado" // El texto que aparecerá dentro del campo cuando esté vacío.
        value={estado} // El valor del input será el estado 'estado'.
        onChange={(e) => setEstado(e.target.value)} // Cuando el valor cambia, actualizamos el estado 'estado'.
        required // Hacemos el campo obligatorio.
        name="state"
      />&nbsp;&nbsp;
      <button type="submit">Buscar Tarea</button> {/* El botón que envía el formulario. */}
    </form>
  );
};

export default TareaForm; // Exportamos el componente TareaForm para usarlo en otros archivos.
