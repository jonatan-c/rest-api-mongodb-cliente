import React, { useContext } from "react";
import tareaContext from "../../context/tareas/tareaContext";
import TareaItem from "./TareaItem";

import "./listadoTareas.scss";

const ListadoTareas = () => {
  // traer el listado del state de la carpeta tareaState
  const tareasContext = useContext(tareaContext);
  const { tareas } = tareasContext;

  return (
    <div className="container">
      <div className="listado">
        <h2>Listado</h2>
      </div>
      <ul>
        {tareas.map((tarea) => (
          <TareaItem key={tarea._id} tarea={tarea} />
        ))}
      </ul>
    </div>
  );
};

export default ListadoTareas;
