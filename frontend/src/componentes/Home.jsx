import React, { useEffect, useState } from "react";
import "../estilos/home.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Home() {
  const [timeblocks, setTimeblocks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navegar = useNavigate()

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
          setError(data.error || "Error al cargar los horarios");
          return;
        }

        setTimeblocks(data);
      } catch (error) {
        setError("Error al conectarse con el servidor");
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
          setError("No hay token disponible");
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
          setError(data.error || "Error al cargar el usuario");
          return;
        }

        setUser(data);
      } catch (error) {
        setError("Error al conectarse con el servidor");
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
        setError(data.error || "Error al crear la reserva");
        return;
      }

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
      setError("Error al crear la nueva reserva");
    }
  };

  const handleToDeleteReservation = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const appointmentToDelete = user.appointments.find(
      (appointment) => appointment.id === id
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
      }
    );

    if (!response.ok) {
      setError("Error al eliminar la reserva");
      return;
    }

    setUser((prev) => ({
      ...prev,
      appointments: prev.appointments.filter(
        (appointment) => appointment.id !== id
      ),
    }));

    setTimeblocks((prev) =>
      prev.map((tb) =>
        tb.id === timeBlockId
          ? {
              ...tb,
              appointments: [],
            }
          : tb
      )
    );
  } catch (error) {
    setError("Error al eliminar la reserva");
  }
  };

  const handleToCloseSession = (event) => {
    
    event.preventDefault()
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navegar("/")

  }


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
            <strong>{user?.name}</strong>
            <span>{user?.email}</span>
          </div>

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
            {loading ? (
              <p className="texto-cargando">Cargando horarios...</p>
            ) : error ? (
              <p>{error}</p>
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
                      onClick={() => {handleToDeleteReservation(appointment.id)}}
                    >
                      <AiOutlineCloseCircle/>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="home-empty-small">
                <p>Cargando...</p>
              </div>
            )}
          </div>
        </aside>
      </section>
    </section>
  );
}

export { Home };
