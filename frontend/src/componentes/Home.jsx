import React from "react";
import "../estilos/home.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Home() {
  return (
    <section className="home-page">
      <header className="home-topbar">
        <div className="home-brand">
          <span className="home-kicker">Agenda</span>
          <h1>Reserva tu próxima cita</h1>
          <p>Gestiona tus horarios disponibles de forma rápida y sencilla.</p>
        </div>

        <div className="home-user-mini">
          <div className="home-avatar">I</div>
          <div className="home-user-mini__info">
            <strong>Ismael Bedmar</strong>
            <span>ismael@example.com</span>
          </div>

          <button className="home-user-mini__icon" aria-label="Cambiar nombre">
            ✎
          </button>
          <button className="home-user-mini__icon" aria-label="Cambiar email">
            @
          </button>
          <button className="home-user-mini__icon" aria-label="Cambiar contraseña">
            🔒
          </button>
          <button className="home-user-mini__icon danger" aria-label="Cerrar sesión">
            <AiOutlineCloseCircle />
            </button>
        </div>
      </header>

      <section className="home-hero">
        <div className="home-hero__text">
          <div className="home-hero__line" />
          <p>
            Consulta los horarios disponibles y reserva tu hueco en segundos.
          </p>
        </div>

        <div className="home-hero__card">
          <span>Próxima disponibilidad</span>
          <strong>Hoy, 14:00</strong>
          <p>Bloques abiertos para reservar ahora mismo.</p>
        </div>
      </section>

      <section className="home-layout">

        {/* HORARIOS DISPONIBLES */}
        <main className="home-panel home-schedule">
          <div className="home-panel__header">
            <div>
              <h2>Horarios disponibles</h2>
              <p>Selecciona una franja para reservar.</p>
            </div>
          </div>

          <div className="home-list">
            <div className="home-time-card">
              <div className="home-time-card__content">
                <div className="home-time-row">
                  <span className="home-time-label">Inicio</span>
                  <strong>1/6/2026, 11:00</strong>
                </div>

                <div className="home-time-row">
                  <span className="home-time-label">Fin</span>
                  <strong>1/6/2026, 12:00</strong>
                </div>
              </div>

              <button className="home-action primary">Reservar</button>
            </div>

            <div className="home-time-card">
              <div className="home-time-card__content">
                <div className="home-time-row">
                  <span className="home-time-label">Inicio</span>
                  <strong>1/6/2026, 12:00</strong>
                </div>

                <div className="home-time-row">
                  <span className="home-time-label">Fin</span>
                  <strong>1/6/2026, 13:00</strong>
                </div>
              </div>

              <button className="home-action primary">Reservar</button>
            </div>

            <div className="home-empty">
              <p>Aquí aparecerán más bloques disponibles.</p>
            </div>
          </div>
        </main>

        {/* MIS RESERVAS */}
        <aside className="home-panel home-reservations">
          <div className="home-panel__header">
            <div>
              <h2>Mis reservas</h2>
              <p>Gestiona tus reservas activas.</p>
            </div>
          </div>

          <div className="home-reservations-list">

            <div className="home-reservation-card">
              <div className="home-reservation-info">
                <span className="home-time-label">Reserva</span>
                <strong>1/6/2026, 11:00 - 12:00</strong>
              </div>

              <div className="home-reservation-actions">
                <button className="home-icon-btn" aria-label="Editar reserva">
                  ✎
                </button>

                <button className="home-icon-btn danger" aria-label="Eliminar reserva">
                  <AiOutlineCloseCircle />
                </button>
              </div>
            </div>

            <div className="home-reservation-card">
              <div className="home-reservation-info">
                <span className="home-time-label">Reserva</span>
                <strong>2/6/2026, 16:00 - 17:00</strong>
              </div>

              <div className="home-reservation-actions">
                <button className="home-icon-btn" aria-label="Editar reserva">
                  ✎
                </button>

                <button className="home-icon-btn danger" aria-label="Eliminar reserva">
                  <AiOutlineCloseCircle />
                </button>
              </div>
            </div>

          </div>
        </aside>

      </section>
    </section>
  );
}

export { Home };