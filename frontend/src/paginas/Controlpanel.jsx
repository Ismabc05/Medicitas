import "../estilos/controlpanel.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Controlpanel() {
  const navegar = useNavigate();
  const [reservations, setReservations] = useState([]); // guardamos la respuesta del servidor de la peticion
  const [timeblocks, setTimeBlocks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeBlockForm, setTimeBlockForm] = useState({
    startTime: "",
    endTime: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formError, setFormError] = useState("");
  const [openModal, setOpenModdal] = useState(false)

  useEffect(() => {
    // usamos useEffect para los fetch ya que react debe renderizar la UI rapido y los fetch pueden tardar ya que vienen de sitios externos
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://medicitas-production.up.railway.app/api/admin/reservations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Error al cargar reservas");
          return;
        }

        setReservations(data);
      } catch (error) {
        setError("Error de conexión con el servidor");
      } finally {
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
          "https://medicitas-production.up.railway.app/api/admin/time-blocks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Error al cargar timeblocks");
          return;
        }

        setTimeBlocks(data);
      } catch (error) {
        setError("Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchTimeblocks();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // aquí limpias el mensaje o el estado
        setSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleTimeBlockChange = (event) => {
    setTimeBlockForm({
      ...timeBlockForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateTimeBlock = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const payload = {
        // convertimos los valores del eestado en ISOSTRING ya que es el formato de fecha que usa nuestro modelo de prisma
        startTime: new Date(timeBlockForm.startTime).toISOString(),
        endTime: new Date(timeBlockForm.endTime).toISOString(),
      };

      const response = await fetch(
        "https://medicitas-production.up.railway.app/api/admin/create-time-blocks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.error || "Error creando timeblock");
        return;
      }

      setSuccess("Timeblock creado con éxito");

      setTimeout(() => {
        setSuccess("");
      }, 3000);

      setTimeBlocks((prev) => [...prev, data]);

      setTimeBlockForm({
        startTime: "",
        endTime: "",
      });
    } catch (error) {
      setError("Error de conexión");
    }
  };

  const handleToCloseSession = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navegar("/");
  };

  return (
    <>
      <header className="cp-header">
        <div>
          <h1>Panel de administración</h1>
          <p>Gestiona horarios y revisa las reservas.</p>
        </div>

        <div className="cp-header-actions">
          <button className="cp-button" onClick={() => setShowForm(!showForm)}>
            + Nuevo Horario{" "}
          </button>
          <button className="cp-button-session" onClick={() => {setOpenModdal(!openModal)}}>
            Cerrar Sesion
          </button>
        </div>
      </header>

      <section className="cp-cards">
        <article className="cp-card">
          <span>Total reservas</span>
          <strong>{reservations.length}</strong>
        </article>

        <article className="cp-card">
          <span>Horarios activos</span>
          <strong>{timeblocks.length}</strong>
        </article>

        <article className="cp-card">
          <span>Reservas pendientes</span>
          <strong>0</strong>
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
          {formError && <p className="error-text">{formError}</p>}
        </form>
      )}

      <section className="cp-grid">
        <div className="cp-panel">
          <div className="cp-panel-header">
            <h2>Reservas</h2>
            <a
              onClick={() => {
                navegar("/control-panel/reservas");
              }}
            >
              Ver todas
            </a>
          </div>

          <div className="cp-empty">
            {loading ? (
              <p className="parrafo-reservas">Cargando reservas...</p>
            ) : error ? (
              <p className="error-text">{error}</p>
            ) : reservations.length === 0 ? (
              <p>No hay reservas.</p>
            ) : (
              reservations.slice(0, 3).map((reservation) => (
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
            <h2>Horarios</h2>
            <a
              onClick={() => {
                navegar("/control-panel/timeblocks");
              }}
            >
              Gestionar
            </a>
          </div>

          <div className="cp-empty">
            {loading ? (
              <p className="parrafo-reservas">Cargando horarios...</p>
            ) : error ? (
              <p className="error-text">{error}</p>
            ) : timeblocks.length === 0 ? (
              <p>No hay timeblocks.</p>
            ) : (
              timeblocks.slice(0, 5).map((timeblock) => (
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
        {success && (
          <div className="success-toast">
            <p className="success-toast__title">Horario guardado</p>
            <p className="success-toast__text">{success}</p>
          </div>
        )}
      </section>

      {openModal && (
        <div className="modal-overlay" onClick={() => setOpenModdal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>¿Seguro que quieres cerrar sesión?</h3>
            <p>
              Se cerrará tu sesión actual y tendrás que volver a iniciar sesión.
            </p>

            <div className="modal-actions">
              <button className="btn btn-danger" onClick={handleToCloseSession}>
                Aceptar
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setOpenModdal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { Controlpanel };
