import React from "react";
import "../estilos/ajustes.css";

function Ajustes() {
  return (
    <section className="aj-page">
      <div className="aj-header">
        <div>
          <h1>Ajustes</h1>
          <p>Configura el panel y personaliza el comportamiento del sistema.</p>
        </div>

        <button className="aj-button">Guardar cambios</button>
      </div>

      <section className="aj-stats">
        <article className="aj-stat-card">
          <span>Perfil</span>
          <strong>Admin</strong>
        </article>

        <article className="aj-stat-card">
          <span>Notificaciones</span>
          <strong>Activas</strong>
        </article>

        <article className="aj-stat-card">
          <span>Modo</span>
          <strong>Normal</strong>
        </article>
      </section>

      <section className="aj-content">
        <div className="aj-panel">
          <div className="aj-panel-header">
            <h2>Preferencias generales</h2>
            <span className="aj-chip">Configuración</span>
          </div>

          <div className="aj-empty-state">
            <p>Aquí irán las opciones de configuración.</p>
          </div>
        </div>

        <aside className="aj-sidepanel">
          <div className="aj-panel">
            <div className="aj-panel-header">
              <h2>Acciones rápidas</h2>
            </div>

            <button className="aj-action-button">Cambiar contraseña</button>
            <button className="aj-action-button danger">Cerrar sesión</button>
          </div>
        </aside>
      </section>
    </section>
  );
}

export { Ajustes };