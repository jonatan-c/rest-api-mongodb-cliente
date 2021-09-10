import {
  AGREGAR_TAREA,
  ACTUALIZAR_TAREA,
  TAREA_ACTUAL,
  ELIMINAR_TAREA,
  LIMPIAR_TAREA,
  VALIDAR_TAREA,
  TAREAS_PROYECTO,
} from "../../types";
import React, { useEffect, useReducer } from "react";
import TareaReducer from "./tareaReducer";
import TareaContext from "./tareaContext";
import clienteAxios from "../../config/axios";
// { id: 1, nombre: "jonatan", apellido: "claros", curso: "backend" },
// { id: 2, nombre: "gonzalo", apellido: "claros", curso: "frontend" },
// { id: 3, nombre: "ezequiel", apellido: "claros", curso: "fullstack" },

const TareaState = (props) => {
  const initialState = {
    tareas: [],
    tareaseleccionada: null,
    errortarea: false,
  };

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //FUNCIONES

  // Obtener las tareas de un proyecto
  const obtenerTareas = async () => {
    try {
      const resultado = await clienteAxios.get("/");
      //   console.log(resultado);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {}
  };
  useEffect(() => {
    obtenerTareas();
  }, []);

  // Agregar tarea a proyecto seleccionado
  const agregarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.post("/", tarea);
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // edita o modifica una tarea
  const actualizarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.put(`/${tarea._id}`, tarea);
      console.log(resultado.data);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  const eliminarTarea = async (id) => {
    try {
      const resultado = await clienteAxios.delete(`/${id}`);
      //   console.log(resultado);
    } catch (error) {}
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id,
    });
  };

  //limpia el state de tareaseleccionada,esto permite que haga switch del boton agregar o edita
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };
  // Valida y muestra un error en cas de que sea necesario, por falta de campos
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  return (
    <TareaContext.Provider
      value={{
        // piero los states y luego las funciones
        //states
        tareas: state.tareas,
        tareaseleccionada: state.tareaseleccionada,
        errortarea: state.errortarea,
        //funciones
        agregarTarea,
        actualizarTarea,
        guardarTareaActual,
        eliminarTarea,
        limpiarTarea,
        validarTarea,
        obtenerTareas,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};
export default TareaState;
