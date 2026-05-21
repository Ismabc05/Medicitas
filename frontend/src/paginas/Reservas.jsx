import React, { useEffect, useState } from "react";
import "../estilos/reservas.css";

function Reservas() {

  const [ reservas, setReservas] = useState([])
  const [ error, setError] = useState("")
  const [ loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchReservations = async () => {
      try {

        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://curso-expressjs-production-a8af.up.railway.app/api/admin/reservations",
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        );

        const data = await response.json()

        if(!response.ok) {
          setError(data.error || "Error al cargar las reservas")
        }

        setReservas(data)

      } catch (error) {
        setError("Error de conexion con el servidor")
      }  finally {
        setLoading(false)
      }
    }

    fetchReservations()

  }, [])

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
          <strong>{reservas.length}</strong>
        </article>

        <article className="res-stat-card">
          <span>Confirmadas</span>
          <strong>0</strong>
        </article>

        <article className="res-stat-card">
          <span>Pendientes</span>
          <strong>0</strong>
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
              {loading ? (
                <p className="parrafo-reservas">Cargando reservas...</p>
              ) : error ? (
                <p className="error-text">{error}</p>
              ) : reservas.length === 0 ? (
                <p>No hay reservas.</p>
              ) : (
                reservas.map((reserva) => (
                  <div key={reserva.id} className="reservation-card">
                  <p>
                    <strong>Usuario:</strong> {reserva.user.name}
                  </p>

                  <p>
                    <strong>Email:</strong> {reserva.user.email}
                  </p>

                  <p>
                    <strong>Inicio:</strong>{" "}
                    {new Date(reserva.timeBlock.startTime).toLocaleString()}
                  </p>

                  <p>
                    <strong>Fin:</strong>{" "}
                    {new Date(reserva.timeBlock.endTime).toLocaleString()}
                  </p>
                  </div>
                ))
              )}
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