import React, { useEffect, useState } from "react";
import "../estilos/timeblocks.css";

function Timeblocks() {

  const [ timeblocks, setTimeblocks] = useState([])
  const [ error, setError] = useState("")
  const [ loading, setLoading] = useState(true)
  const [ showForm, setShowForm] = useState(false)
  const [ success, setSuccess] = useState("")
  const [timeBlockForm, setTimeBlockForm] = useState({
    startTime: "",
    endTime: ""
  });

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
          return;
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

  const handleTimeBlockChange = (event) => {
    setTimeBlockForm({
      ...timeBlockForm,
      [event.target.name]: event.target.value
    });
  };

  const handleCreateTimeBlock = async (event) => {
    event.preventDefault()

    try{

      const token = localStorage.getItem("token")

      const payload = { // convertimos los valores del eestado en ISOSTRING ya que es el formato de fecha que usa nuestro modelo de prisma
      startTime: new Date(timeBlockForm.startTime).toISOString(),
      endTime: new Date(timeBlockForm.endTime).toISOString(),
      };

      const response = await fetch("https://curso-expressjs-production-a8af.up.railway.app/api/admin/create-time-blocks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      if(!response.ok) {
        setError(data.error || "Error al crear el horario")
        return;
      }

      setSuccess("Horario creado con exito")

      setTimeout(() => {
      setSuccess("");
      }, 3000);

      setTimeblocks((prev) => [...prev, data]);

      setTimeBlockForm({
      startTime: "",
      endTime: ""
      });

    }catch(error) {
      setError("Error al crear el nuevo horario")
    }
  }

  const handleToDeleteTimeblock = async (id) => {

    try {

      const token = localStorage.getItem("token")

      const response = await fetch(`https://curso-expressjs-production-a8af.up.railway.app/api/admin/delete-time-blocks/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      )

      if(!response.ok){
        setError("Error al eliminar el horario")
        return;
      }

      setSuccess("Timeblock borrado con éxito");

      setTimeout(() => {
        setSuccess("");
      }, 3000);

      setTimeblocks((prev) =>
        prev.filter((timeblock) => timeblock.id !== id)
      )

    } catch (error) {
      setError("Error al eliminar el horario")
    }
  }

  return (
    <section className="tb-page">
      <div className="tb-header">
        <div>
          <h1>Horarios</h1>
          <p>Gestiona los bloques de tiempo disponibles.</p>
        </div>

        <button className="tb-button" onClick={() => setShowForm(!showForm)}>+ Nuevo horario</button>
      </div>

      <section className="tb-stats">
        <article className="tb-stat-card">
          <span>Total Horarios</span>
          <strong>{timeblocks.length}</strong>
        </article>

        <article className="tb-stat-card">
          <span>Activos</span>
          <strong>{timeblocks.length}</strong>
        </article>

        <article className="tb-stat-card">
          <span>Reservados</span>
          <strong>{timeblocks.filter(tb => tb.appointments?.length > 0).length}</strong>
        </article>
      </section>

      {showForm && (
        <form className="timeblock-form" onSubmit={handleCreateTimeBlock}>
          <div className="timeblock-field">
          <label htmlFor="startTime">Fecha y hora de inicio</label>
            <input
              id="startTime"
              type="datetime-local"
              name="startTime"
              value={timeBlockForm.startTime}
              onChange={handleTimeBlockChange}
            />
          </div>

          <div className="timeblock-field">
            <label htmlFor="endTime">Fecha y hora de fin</label>
            <input
              id="endTime"
              type="datetime-local"
              name="endTime"
              value={timeBlockForm.endTime}
              onChange={handleTimeBlockChange}
            />
          </div>

          <button
            type="submit"
            className="timeblock-submit"
            disabled={!timeBlockForm.startTime || !timeBlockForm.endTime}
          >
            Crear
          </button>
        </form>
        )}

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
                timeblocks.map((timeblock) => {

                  const reservado = timeblock.appointments?.length > 0;

                return (
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

                  <p className={`tb-reserved-text ${!reservado ? "empty" : ""}`}>
                    {reservado ? "Horario reservado" : ""}
                  </p>

                  <div className="tb-time-actions">

                    <button
                      className="tb-mini-btn"
                      disabled={reservado}
                    >
                    Editar
                    </button>

                    <button
                      className="tb-mini-btn danger"
                      disabled={reservado}
                      onClick={() => handleToDeleteTimeblock(timeblock.id)}
                      >
                      Eliminar
                    </button>

                  </div>

                </div>
                );
                })
              )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {success && (
          <div className="success-toast">
            <p className="success-toast__text">{success}</p>
          </div>
        )}

    </section>
  );
}

export { Timeblocks };