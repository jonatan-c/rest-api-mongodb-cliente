import "./App.css";
import FormTarea from "./components/tareas/FormTarea";
import TareaState from "./context/tareas/tareaState";
import ListadoTareas from "./components/tareas/ListadoTareas";

function App() {
  return (
    <>
      <TareaState>
        <div className="containerFormTarea">
          <FormTarea />
        </div>
        <ListadoTareas />
      </TareaState>
    </>
  );
}

export default App;
