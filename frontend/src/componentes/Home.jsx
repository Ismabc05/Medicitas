import React, { useEffect, useState, useMemo } from "react";
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
  const [editError, setEditError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navegar = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); // guarda en la pagina en la que estas
  const itemsPerPage = 4;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [closeModelOpen, setCloseModalOpen] = useState(false);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysOfMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startGrid = new Date(firstDay);
    startGrid.setDate(firstDay.getDate() - firstDay.getDay());

    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(startGrid);
      date.setDate(startGrid.getDate() + i);
      return date;
    });
  }, [currentMonth]);

  const totalPages = Math.ceil(timeblocks.length / itemsPerPage);

  const visibleTimeblocks = timeblocks.slice(
    // vemos que timeblocks mostrar
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const handleToEditUser = (id, field) => {
    setEditUserId(id);
    setEditField(field);

    if (field === "name") {
      setEditValue(user?.name || "");
    } else if (field === "email") {
      setEditValue(user?.email || "");
    } else {
      setEditValue("");
    }

    setEditModalOpen(true);
  };

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

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if (
      (editField === "name" && editValue.trim() === user.name.trim()) ||
      (editField === "email" &&
        editValue.trim().toLowerCase() === user.email.toLowerCase())
    ) {
      setEditError("No has realizado ningun cambio.");

      setTimeout(() => {
        setEditError("");
      }, 2000);

      return;
    }

    const error = validateEdit(editField, editValue);

    if (error) {
      setEditError(error);

      setTimeout(() => {
        setEditError("");
      }, 2000);

      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://curso-expressjs-production-a8af.up.railway.app/api/users/edit-user/${editUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            [editField]: editValue,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorReservation(data.error || "Error al actualizar usuario");
        return;
      }

      // actualizar estado usuario en frontend
      setUser(data);

      setSuccess("Usuario actualizado correctamente");

      setTimeout(() => {
        setSuccess("");
        setErrorReservationDelete("");
      }, 3000);

      setEditModalOpen(false);
      setEditValue("");
    } catch (error) {
      setErrorReservation("Error al conectar con el servidor");
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

      setReservationModalOpen(false);
      setSelectedAppointmentId(null);
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

  const validateEdit = (field, value) => {
    if (!value.trim()) {
      return "El campo no puede estar vacío";
    }

    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Email inválido";
      }
    }

    if (field === "password") {
      if (value.length < 6) {
        return "La contraseña debe tener al menos 6 caracteres";
      }
    }

    return "";
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
          },
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
                {user?.name?.charAt(0)?.toUpperCase() || ""}{" "}
                {/* obtiene el nombre del usuario y chartAt coge la primera letra y la convierte en mayuscula */}
              </div>

              <div className="home-user-mini__info">
                <strong>{user?.name}</strong>
                <span>{user?.email}</span>
              </div>
            </>
          )}

          <button
            className="home-user-mini__icon"
            aria-label="Cambiar nombre"
            onClick={() => {
              handleToEditUser(user.id, "name");
            }}
          >
            ✎
          </button>

          <button
            className="home-user-mini__icon"
            aria-label="Cambiar email"
            onClick={() => {
              handleToEditUser(user.id, "email");
            }}
          >
            @
          </button>

          <button
            className="home-user-mini__icon"
            aria-label="Cambiar contraseña"
            onClick={() => {
              handleToEditUser(user.id, "password");
            }}
          >
            🔒
          </button>

          <button
            className="home-user-mini__icon danger"
            aria-label="Cerrar sesión"
            onClick={() => setCloseModalOpen(!closeModelOpen)}
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
          <div className="mini-calendar">
            <div className="mini-calendar__header">
              <button
                onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
              >
                ←
              </button>
              <strong>
                {currentMonth.toLocaleDateString("es-ES", {
                  month: "long",
                  year: "numeric",
                })}
              </strong>
              <button
                onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
              >
                →
              </button>
            </div>

            <div className="mini-calendar__weekdays">
              {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>

            <div className="mini-calendar__grid">
              {daysOfMonth.map((day) => {
                const dayBlocks = timeblocks.filter(
                  (tb) =>
                    new Date(tb.startTime).toDateString() ===
                    day.toDateString(),
                );

                const availableBlocks = dayBlocks.filter(
                  (tb) => !tb.appointments || tb.appointments.length === 0,
                );

                const isCurrentMonth =
                  day.getMonth() === currentMonth.getMonth();

                return (
                  <div
                    key={day.toISOString()}
                    className={`mini-calendar__day ${isCurrentMonth ? "" : "out-month"} ${
                      availableBlocks.length > 0 ? "available" : ""
                    }`}
                  >
                    <span className="mini-calendar__day-number">
                      {day.getDate()}
                    </span>

                    <div className="mini-calendar__slots">
                      {availableBlocks.length > 0 ? (
                        availableBlocks.map((tb) => (
                          <button
                            key={tb.id}
                            className="mini-calendar__slot"
                            onClick={() => handleToReservation(tb.id, user.id)}
                            disabled={!user}
                          >
                            {new Date(tb.startTime).toLocaleTimeString(
                              "es-ES",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZone: "Europe/Madrid",
                              },
                            )}
                          </button>
                        ))
                      ) : (
                        <small className="mini-calendar__no-slots">
                          Sin huecos
                        </small>
                      )}
                    </div>
                  </div>
                );
              })}
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
                        setSelectedAppointmentId(appointment.id);
                        setReservationModalOpen(true);
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

      {editModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>
              Edita tu {editField === "name" && "nombre"}
              {editField === "email" && "email"}
              {editField === "password" && "contraseña"}
            </h3>

            <form onSubmit={handleUpdateUser}>
              <input
                type={editField === "password" ? "password" : "text"}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />

              {editError && <p className="modal-error">{editError}</p>}

              <div className="modal-actions">
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setEditModalOpen(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {closeModelOpen && (
        <div className="modal-overlay" onClick={() => setCloseModalOpen(false)}>
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
                onClick={() => setCloseModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {reservationModalOpen && (
        <div className="modal-overlay" onClick={() => setCloseModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-text-small">
              ¿Seguro que quieres eliminar esta reserva?
            </h3>

            <div className="modal-actions">
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleToDeleteReservation(selectedAppointmentId);
                }}
              >
                Aceptar
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setReservationModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export { Home };
