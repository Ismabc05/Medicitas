import React from "react";
import "../estilos/controlpanel.css";

function Controlpanel() {
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
          <a href="#" className="cp-nav-item active">Dashboard</a>
          <a href="#" className="cp-nav-item">Timeblocks</a>
          <a href="#" className="cp-nav-item">Reservas</a>
          <a href="#" className="cp-nav-item">Ajustes</a>
        </nav>
      </aside>

      <main className="cp-main">
        <header className="cp-header">
          <div>
            <h1>Panel de administración</h1>
            <p>Gestiona timeblocks y revisa las reservas.</p>
          </div>

          <div className="cp-header-actions">
            <button className="cp-button secondary">Ver reservas</button>
            <button className="cp-button">+ Nuevo timeblock</button>
          </div>
        </header>

        <section className="cp-cards">
          <article className="cp-card">
            <span>Total reservas</span>
            <strong>--</strong>
          </article>

          <article className="cp-card">
            <span>Timeblocks activos</span>
            <strong>--</strong>
          </article>

          <article className="cp-card">
            <span>Reservas pendientes</span>
            <strong>--</strong>
          </article>
        </section>

        <section className="cp-grid">
          <div className="cp-panel">
            <div className="cp-panel-header">
              <h2>Reservas</h2>
              <a href="#">Ver todas</a>
            </div>

            <div className="cp-empty">
              <p>Los datos de reservas aparecerán aquí.</p>
            </div>
          </div>

          <div className="cp-panel">
            <div className="cp-panel-header">
              <h2>Timeblocks</h2>
              <a href="#">Gestionar</a>
            </div>

            <div className="cp-empty">
              <p>Los timeblocks se mostrarán aquí.</p>
            </div>

            <div className="cp-mini-actions">
              <button>Editar</button>
              <button>Eliminar</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export { Controlpanel };