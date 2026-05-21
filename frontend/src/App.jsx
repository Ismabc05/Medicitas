import { Routes, Route } from "react-router-dom";
import { Login } from "./componentes/Login";
import { Home } from "./componentes/Home";
import { Controlpanel } from "./paginas/Controlpanel";
import { Register } from "./componentes/Register";
import { AdminLayout } from "./layouts/AdminLayout";
import { Timeblocks } from "./paginas/Timeblocks";
import { Reservas } from "./paginas/Reservas";
import { Ajustes } from "./paginas/Ajustes";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>

        <Route path="/control-panel" element={<AdminLayout />}> {/* creamos una ruta padre que va a tener ruhas hijas */}
          <Route index element={<Controlpanel />} /> {/* por defecto se abre está */}
          <Route path="timeblocks" element={<Timeblocks />} />
          <Route path="reservas" element={<Reservas />} />
          <Route path="ajustes" element={<Ajustes />} />
        </Route>
        
      </Routes>

    </>
  )
}

export default App
