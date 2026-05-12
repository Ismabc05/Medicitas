import { Routes, Route } from "react-router-dom";
import { Login } from "./componentes/Login";
import { Home } from "./componentes/Home";
import { Controlpanel } from "./componentes/Controlpanel";
import { Register } from "./componentes/Register";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/control-panel" element={<Controlpanel/>}/>
      </Routes>

    </>
  )
}

export default App
