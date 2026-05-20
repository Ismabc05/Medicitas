import "../estilos/controlpanel.css";
import React, { useEffect, useState } from "react";

function Controlpanel() {
  
  const [reservations, setReservations] = useState([]); // guardamos la respuesta del servidor de la peticion
  const [timeblocks, setTimeBlocks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeBlockForm, setTimeBlockForm] = useState({
  startTime: "",
  endTime: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleToTimeBlock = (event) => {
    event.preventDefault()
    navegar("/control-panel/timeblocks")
  }

  useEffect(() => { // usamos useEffect para los fetch ya que react debe renderizar la UI rapido y los fetch pueden tardar ya que vienen de sitios externos
  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://curso-expressjs-production-a8af.up.railway.app/api/admin/reservations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al cargar reservas");
        return;
      }

      setReservations(data);

      } catch (error) {
        setError("Error de conexión con el servidor");
      }   finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
  const fetchTimeblocks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://curso-expressjs-production-a8af.up.railway.app/api/admin/time-blocks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al cargar timeblocks");
        return;
      }

      setTimeBlocks(data);

      } catch (error) {
        setError("Error de conexión con el servidor");
      }   finally {
        setLoading(false);
      }
    };

    fetchTimeblocks();
  }, []);

  const handleTimeBlockChange = (event) => {
    setTimeBlockForm({
      ...timeBlockForm,
      [event.target.name]: event.target.value
    });
  };

  const handleCreateTimeBlock = async (event) => {
  event.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const payload = { // convertimos los valores del eestado en ISOSTRING ya que es el formato de fecha que usa nuestro modelo de prisma
      startTime: new Date(timeBlockForm.startTime).toISOString(),
      endTime: new Date(timeBlockForm.endTime).toISOString(),
    };

    const response = await fetch(
      "https://curso-expressjs-production-a8af.up.railway.app/api/admin/create-time-blocks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Error creando timeblock");
      return;
    }

    setSuccess("Timeblock creado con éxito");


    setTimeout(() => {
      setSuccess("");
    }, 3000);

    setTimeBlocks((prev) => [...prev, data]);

    setTimeBlockForm({
      startTime: "",
      endTime: ""
    });

    setShowForm(false);

  } catch (error) {
    setError("Error de conexión");
  }
  };

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
            <button className="cp-button" onClick={() => setShowForm(!showForm)}>+ Nuevo timeblock </button>
          </div>
        </header>

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

        {success && (
          <div className="success-toast">
            <p className="success-toast__title">Timeblock guardado</p>
            <p className="success-toast__text">{success}</p>
          </div>
        )}
        <section className="cp-cards">
          <article className="cp-card">
            <span>Total reservas</span>
            <strong>{reservations.length}</strong>
          </article>

          <article className="cp-card">
            <span>Timeblocks activos</span>
            <strong>{timeblocks.length}</strong>
          </article>

          <article className="cp-card">
            <span>Reservas pendientes</span>
            <strong>0</strong>
          </article>
        </section>

        <section className="cp-grid">
          <div className="cp-panel">
            <div className="cp-panel-header">
              <h2>Reservas</h2>
              <a href="#">Ver todas</a>
            </div>

            <div className="cp-empty">
              {loading ? (
                <p className="parrafo-reservas">Cargando reservas...</p>
              ) : error ? (
                <p className="error-text">{error}</p>
              ) : reservations.length === 0 ? (
                <p>No hay reservas.</p>
              ) : (
                reservations.map((reservation) => (
                  <div key={reservation.id} className="reservation-card">
                  <p>
                    <strong>Usuario:</strong> {reservation.user.name}
                  </p>

                  <p>
                    <strong>Email:</strong> {reservation.user.email}
                  </p>

                  <p>
                    <strong>Inicio:</strong>{" "}
                    {new Date(reservation.timeBlock.startTime).toLocaleString()}
                  </p>

                  <p>
                    <strong>Fin:</strong>{" "}
                    {new Date(reservation.timeBlock.endTime).toLocaleString()}
                  </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="cp-panel">
            <div className="cp-panel-header">
              <h2>Timeblocks</h2>
              <a>Gestionar</a>
            </div>

            <div className="cp-empty">
              {loading ? (
                <p className="parrafo-reservas">Cargando timeblocks...</p>
              ) : error ? (
                <p className="error-text">{error}</p>
              ) : timeblocks.length === 0 ? (
                <p>No hay timeblocks.</p>
              ) : (
                timeblocks.map((timeblock) => (
                  <div key={timeblock.id} className="reservation-card">
                  <p>
                    <strong>Inicio:</strong>{" "}
                    {new Date(timeblock.startTime).toLocaleString()}
                  </p>

                  <p>
                    <strong>Fin:</strong>{" "}
                    {new Date(timeblock.endTime).toLocaleString()}
                  </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export { Controlpanel };