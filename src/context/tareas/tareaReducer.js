import {
  AGREGAR_TAREA,
  ACTUALIZAR_TAREA,
  TAREA_ACTUAL,
  ELIMINAR_TAREA,
  LIMPIAR_TAREA,
  VALIDAR_TAREA,
  TAREAS_PROYECTO,
} from "../../types/index";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareas: action.payload,
      };
    case AGREGAR_TAREA:
      return {
        ...state,
        tareas: [action.payload, ...state.tareas],
        errortarea: false,
      };
    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareas: state.tareas.map((tarea) =>
          tarea._id === action.payload._id ? action.payload : tarea
        ),
      };
    case TAREA_ACTUAL:
      return {
        ...state,
        tareaseleccionada: action.payload,
      };
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareas: state.tareas.filter((tarea) => tarea._id !== action.payload),
        tareaseleccionada: null,
      };
    case LIMPIAR_TAREA:
      return {
        ...state,
        tareaseleccionada: null,
      };
    case VALIDAR_TAREA:
      return {
        ...state,
        errortarea: true,
      };
    default:
      return state;
  }
};
