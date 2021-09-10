import React, { useContext } from "react";
import tareaContext from "../../context/tareas/tareaContext";

import "./tareaItem.scss";

const TareaItem = ({ tarea }) => {
  const tareasContext = useContext(tareaContext);
  const { guardarTareaActual, eliminarTarea } = tareasContext;

  // Agrega una tarea actual cuando el usuario desea editarla
  const seleccionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };

  return (
    <>
      <div className="container">
        <div className="container-card">
          <p>Nombre: {tarea.nombre}</p>
          <p>Apellido: {tarea.apellido}</p>
          <p>Curso: {tarea.curso}</p>
          <div>
            <button onClick={() => seleccionarTarea(tarea)}>Editar</button>
            <button onClick={() => eliminarTarea(tarea._id)}>Eliminar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TareaItem;
