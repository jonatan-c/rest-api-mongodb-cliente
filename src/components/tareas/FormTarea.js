import React, { useContext, useState } from "react";
import { useEffect } from "react";
import tareaContext from "../../context/tareas/tareaContext";

import "./formTarea.scss";

const initialStateTarea = {
  nombre: "",
  apellido: "",
  curso: "",
};
const FormTarea = () => {
  // Contexto global context
  const tareasContext = useContext(tareaContext);
  const {
    tareas,
    agregarTarea,
    tareaseleccionada,
    actualizarTarea,
    limpiarTarea,
    validarTarea,
    errortarea,
    obtenerTareas,
  } = tareasContext;

  const [tarea, setTarea] = useState(initialStateTarea);
  const { nombre, apellido, curso } = tarea;

  //   const loadNotes = () => {
  //     fetch("http://localhost:4000/")
  //       .then((response) => response.json())
  //       .then((result) => {
  //         setTarea(result);
  //       });
  //   };

  // Effect que detecta si hay una tarea seleccionada
  //   loadNotes();
  useEffect(() => {
    if (tareaseleccionada !== null) {
      setTarea(tareaseleccionada);
    } else {
      setTarea({
        nombre: "",
        apellido: "",
        curso: "",
      });
    }
  }, [tareaseleccionada]);

  //   if (!tarea) return null;
  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // validacion de formulario
    if (nombre.trim() === "" || apellido.trim() === "" || curso.trim() === "") {
      validarTarea();
      return;
    }

    // revisar si es edicion o nueva tarea
    if (tareaseleccionada === null) {
      // tarea nueva
      //   const newTarea = { ...tarea, id: Date.now() };
      agregarTarea(tarea);
      obtenerTareas(tareas);
    } else {
      // actualizar tarea existente
      actualizarTarea(tarea);
      obtenerTareas(tareas);
      limpiarTarea();
    }

    obtenerTareas(tareas);
    //limpio inptut sin importa si actualiza o edita, limpio el formulario basiccamente
    setTarea(initialStateTarea);
  };

  return (
    <>
      <div className="container-title">
        <h2 className="formulario-title">Curso</h2>
      </div>

      <form className="formulario-contenido" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          className="input"
          name="nombre"
          value={nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Apellido"
          name="apellido"
          className="input"
          value={apellido}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Curso"
          name="curso"
          value={curso}
          className="input"
          onChange={handleChange}
        />

        <input
          type="submit"
          className="input-button"
          value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
        />
      </form>

      {errortarea ? (
        <p className="mensaje-error">Faltan campos para completar</p>
      ) : null}
    </>
  );
};

export default FormTarea;
