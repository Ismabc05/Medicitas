import React from "react";
import "../estilos/reservas.css";

function Reservas() {
  return (
    <section className="res-page">
      <div className="res-header">
        <div>
          <h1>Reservas</h1>
          <p>Consulta y gestiona las reservas del sistema.</p>
        </div>

        <div className="res-header-actions">
          <button className="res-button secondary">Filtrar</button>
          <button className="res-button">Exportar</button>
        </div>
      </div>

      <section className="res-stats">
        <article className="res-stat-card">
          <span>Total reservas</span>
          <strong>--</strong>
        </article>

        <article className="res-stat-card">
          <span>Confirmadas</span>
          <strong>--</strong>
        </article>

        <article className="res-stat-card">
          <span>Pendientes</span>
          <strong>--</strong>
        </article>
      </section>

      <section className="res-content">
        <div className="res-panel">
          <div className="res-panel-header">
            <h2>Listado de reservas</h2>
            <span className="res-chip">Administración</span>
          </div>

          <div className="res-list">
            <div className="res-empty-state">
              <p>Las reservas aparecerán aquí.</p>
            </div>
          </div>
        </div>

        <aside className="res-sidepanel">
          <div className="res-panel">
            <div className="res-panel-header">
              <h2>Acciones rápidas</h2>
            </div>

            <button className="res-action-button">Ver detalles</button>
            <button className="res-action-button danger">Cancelar</button>
          </div>
        </aside>
      </section>
    </section>
  );
}

export { Reservas };