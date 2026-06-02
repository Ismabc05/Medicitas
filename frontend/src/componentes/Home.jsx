import React, { useEffect, useState } from "react";
import "../estilos/home.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Home() {
  const [timeblocks, setTimeblocks] = useState([]);
  const [errorTimeblock, setErrorTimeblock] = useState("");
  const [errorReservation, setErrorReservation] = useState("");
  const [errorReservationCreate, setErrorReservationCreate] = useState("");
  const [errorReservationDelete, setErrorReservationDelete] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navegar = useNavigate();

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
          },
        );

        const data = await response.json();

        if (!response.ok) {
          setErrorTimeblock(data.error || "Error al cargar los horarios");
          return;
        }

        setTimeblocks(data);
      } catch (error) {
        setErrorTimeblock("Error al conectarse con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchTimeblocks();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setErrorReservation("No hay token disponible");
          return;
        }

        const decoded = jwtDecode(token);
        const id = decoded.id;

        const response = await fetch(
          `https://curso-expressjs-production-a8af.up.railway.app/api/users/${id}/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          setErrorReservation(data.error || "Error al cargar el usuario");
          return;
        }

        setUser(data);
      } catch (error) {
        setErrorReservation("Error al conectarse con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleToReservation = async (timeBlockId, userId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://curso-expressjs-production-a8af.up.railway.app/api/reservations/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            date: new Date().toISOString(),
            timeBlockId,
            userId,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorReservationCreate(data.error || "Error al crear la reserva");
        return;
      }

      setErrorReservationCreate("");
      setSuccess("La reserva se ha creado correctamente.");

      setTimeout(() => {
        setSuccess("");
        setErrorReservationCreate("");
      }, 3000);

      // actualizar usuario con la nueva reserva
      setUser((prev) => ({
        ...prev,
        appointments: [...prev.appointments, data],
      }));

      setTimeblocks((prev) =>
        prev.map((tb) =>
          tb.id === timeBlockId
            ? {
                ...tb,
                appointments: [data],
              }
            : tb,
        ),
      );
    } catch (error) {
      setErrorReservationCreate("Error al crear la nueva reserva");
    }
  };

  const handleToDeleteReservation = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const appointmentToDelete = user.appointments.find(
        (appointment) => appointment.id === id,
      );

      const timeBlockId = appointmentToDelete.timeBlockId;

      const response = await fetch(
        `https://curso-expressjs-production-a8af.up.railway.app/api/reservations/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        setErrorReservationDelete("Error al eliminar la reserva");
        return;
      }

      setErrorReservationDelete("");
      setSuccess("La reserva se ha eliminado correctamente.");

      setTimeout(() => {
        setSuccess("");
        setErrorReservationDelete("");
      }, 3000);

      setUser((prev) => ({
        ...prev,
        appointments: prev.appointments.filter(
          (appointment) => appointment.id !== id,
        ),
      }));

      setTimeblocks((prev) =>
        prev.map((tb) =>
          tb.id === timeBlockId
            ? {
                ...tb,
                appointments: [],
              }
            : tb,
        ),
      );
    } catch (error) {
      setErrorReservationDelete("Error al eliminar la reserva");
    }
  };

  const handleToCloseSession = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navegar("/");
  };

  const nextAvailableTimeblock = timeblocks
    .filter((tb) => !tb.appointments || tb.appointments.length === 0) // filtra los horarios que estan libres de reserva
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))[0]; // los ordena desde el mas cercano al mas lejano y nos quedamos con el primero

  const nextAvailableText = nextAvailableTimeblock
  ? (() => {
      const text = new Date(nextAvailableTimeblock.startTime).toLocaleString(
        "es-ES",
        {
          weekday: "long",
          day: "2-digit",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Madrid",
        }
      );

      return text.charAt(0).toUpperCase() + text.slice(1);
    })()
  : "No hay disponibilidad";

  return (
    <section className="home-page">
      <header className="home-topbar">
        <div className="home-brand">
          <span className="home-kicker">Agenda</span>
          <h1>Reserva tu próxima cita</h1>
          <p>Gestiona tus horarios disponibles de forma rápida y sencilla.</p>
        </div>

        <div className="home-user-mini">
          {loading ? (
            <div className="home-user-mini__info">
              <p>Cargando usuario...</p>
            </div>
          ) : (
            <>
              <div className="home-avatar">
                {user?.name?.charAt(0)?.toUpperCase() || "I"} {/* obtiene el nombre del usuario y chartAt coge la primera letra y la convierte en mayuscula */}
              </div>

              <div className="home-user-mini__info">
                <strong>{user?.name}</strong>
                <span>{user?.email}</span>
              </div>
            </>
          )}

          <button className="home-user-mini__icon" aria-label="Cambiar nombre">
            ✎
          </button>

          <button className="home-user-mini__icon" aria-label="Cambiar email">
            @
          </button>

          <button
            className="home-user-mini__icon"
            aria-label="Cambiar contraseña"
          >
            🔒
          </button>

          <button
            className="home-user-mini__icon danger"
            aria-label="Cerrar sesión"
            onClick={handleToCloseSession}
          >
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

          <strong>{nextAvailableText}</strong>

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
            {loading ? (
              <p className="texto-cargando">Cargando horarios...</p>
            ) : errorTimeblock ? (
              <p>{errorTimeblock}</p>
            ) : timeblocks.length === 0 ? (
              <div className="home-empty">
                <p className="texto-error">No hay horarios disponibles.</p>
              </div>
            ) : (
              timeblocks.map((timeblock) => {
                const reservado = timeblock.appointments?.length > 0;

                return (
                  <div key={timeblock.id} className="home-time-card">
                    <div className="home-time-card__content">
                      <div className="home-time-row">
                        <span className="home-time-label">Inicio</span>
                        <strong>
                          {new Date(timeblock.startTime).toLocaleString(
                            "es-ES",
                            {
                              timeZone: "Europe/Madrid",
                            },
                          )}
                        </strong>
                      </div>

                      <div className="home-time-row">
                        <span className="home-time-label">Fin</span>
                        <strong>
                          {new Date(timeblock.endTime).toLocaleString("es-ES", {
                            timeZone: "Europe/Madrid",
                          })}
                        </strong>
                      </div>
                    </div>

                    <p
                      className={`tb-reserved-text ${reservado ? "active" : "empty"}`}
                    >
                      {reservado ? "Horario reservado" : "Disponible"}
                    </p>

                    <button
                      className="home-action primary"
                      disabled={reservado}
                      onClick={() => {
                        handleToReservation(timeblock.id, user.id);
                      }}
                    >
                      Reservar
                    </button>
                  </div>
                );
              })
            )}
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
            {user?.appointments?.length > 0 ? (
              user.appointments.map((appointment) => (
                <div key={appointment.id} className="home-reservation-card">
                  <div className="home-reservation-info">
                    <span className="home-time-label">Reserva</span>
                    <strong>
                      {new Date(appointment.timeBlock.startTime).toLocaleString(
                        "es-ES",
                        {
                          timeZone: "Europe/Madrid",
                        },
                      )}{" "}
                      -{" "}
                      {new Date(appointment.timeBlock.endTime).toLocaleString(
                        "es-ES",
                        {
                          timeZone: "Europe/Madrid",
                        },
                      )}
                    </strong>
                  </div>

                  <div className="home-reservation-actions">
                    <button
                      className="home-icon-btn danger"
                      aria-label="Eliminar reserva"
                      onClick={() => {
                        handleToDeleteReservation(appointment.id);
                      }}
                    >
                      <AiOutlineCloseCircle />
                    </button>
                  </div>
                </div>
              ))
            ) : user ? (
              <div className="home-empty-small">
                {errorReservation || "No tienes ninguna reserva disponible."}
              </div>
            ) : (
              <div className="home-empty-small">
                <p>Cargando...</p>
              </div>
            )}
          </div>
        </aside>
      </section>
      {success && (
        <div className="success-toast">
          <p className="success-toast__text">{success}</p>
        </div>
      )}

      {errorReservationCreate && (
        <div className="success-toast-error">
          <p className="success-toast__text">{errorReservationCreate}</p>
        </div>
      )}

      {errorReservationDelete && (
        <div className="success-toast-error">
          <p className="success-toast__text">{errorReservationDelete}</p>
        </div>
      )}
    </section>
  );
}

export { Home };
