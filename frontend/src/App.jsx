import { Routes, Route } from "react-router-dom";
import { Login } from "./componentes/Login";
import { Home } from "./componentes/Home";
import { Controlpanel } from "./componentes/Controlpanel";
import { Register } from "./componentes/Register";
import { AdminLayout } from "./componentes/AdminLayout";
import { Timeblocks } from "./componentes/Timeblocks";
import { Reservas } from "./componentes/Reservas";
import { Ajustes } from "./componentes/Ajustes";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/control-panel" element={<AdminLayout />}>
          <Route index element={<Controlpanel />} />
          <Route path="timeblocks" element={<Timeblocks />} />
          <Route path="reservas" element={<Reservas />} />
          <Route path="ajustes" element={<Ajustes />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
