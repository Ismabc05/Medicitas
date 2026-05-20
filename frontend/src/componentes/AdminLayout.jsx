import "../estilos/controlpanel.css";
import { Outlet } from "react-router-dom";

function AdminLayout() {
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
          <a href="/control-panel">Dashboard</a>
          <a href="/control-panel/timeblocks">Timeblocks</a>
          <a href="/control-panel/reservas">Reservas</a>
          <a href="/control-panel/ajustes">Ajustes</a>
        </nav>
      </aside>

      <main className="cp-main">
        <Outlet />
      </main>
    </div>
  );
}

export { AdminLayout }