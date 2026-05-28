import React, { useEffect, useState } from "react";
import jsPDF from "jspdf"; // Importa la clase que crea el PDF.
import autoTable from "jspdf-autotable"; // Importa la función que genera tablas.
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

  const handleExportPDF = () => {

  const doc = new jsPDF(); // crea el documento pdf

  doc.setFontSize(18); // tiene un fuente de 18 px

  doc.text("Listado de Reservas", 14, 20); // escribe text en el pdf

  const tableColumn = [ // Define los nombres de las columnas.
    "Usuario",
    "Email",
    "Inicio",
    "Fin"
  ];

  const tableRows = reservas.map((reserva) => [ // Recorre todas las reservas y crea una fila por cada una.

    reserva.user.name,

    reserva.user.email,

    new Date(reserva.timeBlock.startTime).toLocaleString("es-ES", {
      timeZone: "Europe/Madrid"
    }),

    new Date(reserva.timeBlock.endTime).toLocaleString("es-ES", {
      timeZone: "Europe/Madrid"
    }),
  ]);

  autoTable(doc, { // genera una tabla en el pdf
    head: [tableColumn], // donde la cabecera será eso
    body: tableRows, // el cuerpo
    startY: 30, // La tabla empezará en la altura 30.
  });

  doc.save("Reservas.pdf"); // guarda el pdf como Reservas.pdf
  };

  return (
    <section className="res-page">
      <div className="res-header">
        <div>
          <h1>Reservas</h1>
          <p>Consulta y gestiona las reservas del sistema.</p>
        </div>

        <div className="res-header-actions">
          <button className="res-button" onClick={handleExportPDF}>Exportar</button>
        </div>
      </div>

      <section className="res-stats">
        <article className="res-stat-card">
          <span>Total reservas</span>
          <strong>{reservas.length}</strong>
        </article>

        <article className="res-stat-card">
          <span>Confirmadas</span>
          <strong>{reservas.length}</strong>
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
      </section>
    </section>
  );
}

export { Reservas };