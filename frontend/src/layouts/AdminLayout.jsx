import "../estilos/controlpanel.css";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

function AdminLayout() { // Contiene el menu y al final contiene Outlet que se reemplaza por el componente que hayamos seleccionado
  return (
    <div className="cp-layout">
      <aside className="cp-sidebar">
        <div className="cp-brand">
          <div className="cp-logo">✱</div>
          <div>
            <h2>MediCitas</h2>
            <p>Admin Panel</p>
          </div>
        </div>

        <nav className="cp-nav">
          <NavLink to="/control-panel" end className={({ isActive }) => isActive ? "cp-nav-item active" : "cp-nav-item" }>Dashboard</NavLink>
          <NavLink to="/control-panel/timeblocks" className={({ isActive }) => isActive ? "cp-nav-item active" : "cp-nav-item" }>Timeblocks</NavLink>
          <NavLink to="/control-panel/reservas" className={({ isActive }) => isActive ? "cp-nav-item active" : "cp-nav-item" }>Reservas</NavLink>
          <NavLink to="/control-panel/ajustes" className={({ isActive }) => isActive ? "cp-nav-item active" : "cp-nav-item" }>Ajustes</NavLink>
        </nav>
      </aside>

      <main className="cp-main">
        <Outlet /> 
      </main>
    </div>
  );
}

export { AdminLayout }