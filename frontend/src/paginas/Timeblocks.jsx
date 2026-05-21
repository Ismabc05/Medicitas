import React from "react";
import "../estilos/timeblocks.css";

function Timeblocks() {
  return (
    <section className="tb-page">
      <div className="tb-header">
        <div>
          <h1>Timeblocks</h1>
          <p>Gestiona los bloques de tiempo disponibles.</p>
        </div>

        <button className="tb-button">+ Nuevo timeblock</button>
      </div>

      <section className="tb-stats">
        <article className="tb-stat-card">
          <span>Total timeblocks</span>
          <strong>--</strong>
        </article>

        <article className="tb-stat-card">
          <span>Activos</span>
          <strong>--</strong>
        </article>

        <article className="tb-stat-card">
          <span>Reservados</span>
          <strong>--</strong>
        </article>
      </section>

      <section className="tb-content">
        <div className="tb-panel">
          <div className="tb-panel-header">
            <h2>Listado de timeblocks</h2>
            <span className="tb-chip">Administración</span>
          </div>

          <div className="tb-list">
            <div className="tb-item">
              <div className="tb-item__main">
                <div className="tb-item__date">
                  <span className="tb-label">Inicio</span>
                  <strong>1/6/2026, 11:00</strong>
                </div>

                <div className="tb-item__date">
                  <span className="tb-label">Fin</span>
                  <strong>1/6/2026, 12:00</strong>
                </div>
              </div>

              <div className="tb-item__actions">
                <button className="tb-mini-btn">Editar</button>
                <button className="tb-mini-btn danger">Eliminar</button>
              </div>
            </div>

            <div className="tb-empty-state">
              <p>Los timeblocks aparecerán aquí.</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export { Timeblocks };