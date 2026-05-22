import React, { useEffect, useState } from "react";
import "../estilos/timeblocks.css";

function Timeblocks() {

  const [ timeblocks, setTimeblocks] = useState([])
  const [ error, setError] = useState("")
  const [ loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchTimeblocks = async () => {

      try {

        const token = localStorage.getItem("token")
        const response = await fetch(
          "https://curso-expressjs-production-a8af.up.railway.app/api/admin/time-blocks",
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        const data = await response.json()

        if(!response.ok) {
          setError(data.error || "Error al cargar los horarios")
        }

        setTimeblocks(data)

      } catch (error) {
        setError("Error al conectarse con el servidor")
      } finally {
        setLoading(false)
      }

    }

    fetchTimeblocks()

  }, [])

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
          <strong>{timeblocks.length}</strong>
        </article>

        <article className="tb-stat-card">
          <span>Activos</span>
          <strong>{timeblocks.length}</strong>
        </article>

        <article className="tb-stat-card">
          <span>Reservados</span>
          <strong>0</strong>
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
                {loading ? (
                <p className="parrafo-reservas">Cargando horarios...</p>
              ) : error ? (
                <p className="error-text">{error}</p>
              ) : timeblocks.length === 0 ? (
                <p>No hay timeblocks.</p>
              ) : (
                timeblocks.slice(0, 5).map((timeblock) => (
                  <div key={timeblock.id} className="tb-time-card">

                    <div className="tb-time-row">
                      <span className="tb-time-label">Inicio</span>

                      <span className="tb-time-value">
                        {new Date(timeblock.startTime).toLocaleString()}
                      </span>
                    </div>

                    <div className="tb-time-row">
                      <span className="tb-time-label">Fin</span>

                      <span className="tb-time-value">
                        {new Date(timeblock.endTime).toLocaleString()}
                      </span>
                    </div>

                    <div className="tb-time-actions">
                      <button className="tb-mini-btn">Editar</button>
                      <button className="tb-mini-btn danger">Eliminar</button>
                    </div>

                  </div>
                ))
              )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export { Timeblocks };