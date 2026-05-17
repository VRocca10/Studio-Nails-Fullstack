import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  createAppointment,
  createGalleryItem,
  createService,
  deleteAppointment,
  deleteGalleryItem,
  deleteService,
  getAppointments,
  getGallery,
  getServices,
  updateAppointment,
  updateGalleryItem,
  updateService,
} from "../services/api";

const initialService = { name: "", description: "", image: "", price: "" };
const initialGallery = { src: "", category: "" };
const initialAppointment = { client_name: "", service: "", appointment_date: "", status: "pending" };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const [activeTab, setActiveTab] = useState("services");
  const [status, setStatus] = useState("");

  const [services, setServices] = useState([]);
  const [serviceForm, setServiceForm] = useState(initialService);
  const [editingServiceId, setEditingServiceId] = useState(null);

  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryForm, setGalleryForm] = useState(initialGallery);
  const [editingGalleryId, setEditingGalleryId] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [appointmentForm, setAppointmentForm] = useState(initialAppointment);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    try {
      const [servicesData, galleryData, appointmentsData] = await Promise.all([
        getServices(),
        getGallery(),
        getAppointments(),
      ]);
      setServices(servicesData);
      setGalleryItems(galleryData);
      setAppointments(appointmentsData);
    } catch (error) {
      setStatus(error.message || "Falha ao carregar dados do painel.");
    }
  }

  async function handleLogout() {
    await signOut();
    navigate("/login");
  }

  function resetStatus() {
    setStatus("");
  }

  async function handleServiceSubmit(event) {
    event.preventDefault();
    resetStatus();
    try {
      if (editingServiceId) {
        const updated = await updateService(editingServiceId, serviceForm);
        setServices((prev) => prev.map((item) => (item.id === editingServiceId ? updated : item)));
        setStatus("Servico atualizado com sucesso.");
      } else {
        const created = await createService(serviceForm);
        setServices((prev) => [...prev, created]);
        setStatus("Servico criado com sucesso.");
      }
      setServiceForm(initialService);
      setEditingServiceId(null);
    } catch (error) {
      setStatus(error.message || "Falha ao salvar servico.");
    }
  }

  function handleServiceEdit(service) {
    setEditingServiceId(service.id);
    setServiceForm({
      name: service.name || "",
      description: service.description || "",
      image: service.image || "",
      price: service.price || "",
    });
  }

  async function handleServiceDelete(id) {
    resetStatus();
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((item) => item.id !== id));
      if (editingServiceId === id) {
        setEditingServiceId(null);
        setServiceForm(initialService);
      }
      setStatus("Servico excluido com sucesso.");
    } catch (error) {
      setStatus(error.message || "Falha ao excluir servico.");
    }
  }

  async function handleGallerySubmit(event) {
    event.preventDefault();
    resetStatus();
    try {
      if (editingGalleryId) {
        const updated = await updateGalleryItem(editingGalleryId, galleryForm);
        setGalleryItems((prev) => prev.map((item) => (item.id === editingGalleryId ? updated : item)));
        setStatus("Item da galeria atualizado com sucesso.");
      } else {
        const created = await createGalleryItem(galleryForm);
        setGalleryItems((prev) => [...prev, created]);
        setStatus("Item da galeria criado com sucesso.");
      }
      setGalleryForm(initialGallery);
      setEditingGalleryId(null);
    } catch (error) {
      setStatus(error.message || "Falha ao salvar item da galeria.");
    }
  }

  function handleGalleryEdit(item) {
    setEditingGalleryId(item.id);
    setGalleryForm({ src: item.src || "", category: item.category || "" });
  }

  async function handleGalleryDelete(id) {
    resetStatus();
    try {
      await deleteGalleryItem(id);
      setGalleryItems((prev) => prev.filter((item) => item.id !== id));
      if (editingGalleryId === id) {
        setEditingGalleryId(null);
        setGalleryForm(initialGallery);
      }
      setStatus("Item da galeria excluido com sucesso.");
    } catch (error) {
      setStatus(error.message || "Falha ao excluir item da galeria.");
    }
  }

  async function handleAppointmentSubmit(event) {
    event.preventDefault();
    resetStatus();
    try {
      if (editingAppointmentId) {
        const updated = await updateAppointment(editingAppointmentId, appointmentForm);
        setAppointments((prev) => prev.map((item) => (item.id === editingAppointmentId ? updated : item)));
        setStatus("Agendamento atualizado com sucesso.");
      } else {
        const created = await createAppointment(appointmentForm);
        setAppointments((prev) => [...prev, created]);
        setStatus("Agendamento criado com sucesso.");
      }
      setAppointmentForm(initialAppointment);
      setEditingAppointmentId(null);
    } catch (error) {
      setStatus(error.message || "Falha ao salvar agendamento.");
    }
  }

  function handleAppointmentEdit(appointment) {
    setEditingAppointmentId(appointment.id);
    const dateValue = appointment.appointment_date
      ? new Date(appointment.appointment_date).toISOString().slice(0, 16)
      : "";

    setAppointmentForm({
      client_name: appointment.client_name || "",
      service: appointment.service || "",
      appointment_date: dateValue,
      status: appointment.status || "pending",
    });
  }

  async function handleAppointmentDelete(id) {
    resetStatus();
    try {
      await deleteAppointment(id);
      setAppointments((prev) => prev.filter((item) => item.id !== id));
      if (editingAppointmentId === id) {
        setEditingAppointmentId(null);
        setAppointmentForm(initialAppointment);
      }
      setStatus("Agendamento excluido com sucesso.");
    } catch (error) {
      setStatus(error.message || "Falha ao excluir agendamento.");
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Painel Administrativo</h1>
        <button className="btn" onClick={handleLogout} style={{ border: 0, cursor: "pointer" }}>
          Sair
        </button>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === "services" ? "admin-tab is-active" : "admin-tab"} onClick={() => setActiveTab("services")}>Servicos</button>
        <button className={activeTab === "gallery" ? "admin-tab is-active" : "admin-tab"} onClick={() => setActiveTab("gallery")}>Galeria</button>
        <button className={activeTab === "appointments" ? "admin-tab is-active" : "admin-tab"} onClick={() => setActiveTab("appointments")}>Agendamentos</button>
      </div>

      {status && <p className="admin-status">{status}</p>}

      {activeTab === "services" && (
        <section className="admin-section">
          <h2>CRUD de Servicos</h2>
          <form className="admin-form" onSubmit={handleServiceSubmit}>
            <input required placeholder="Nome do servico" value={serviceForm.name} onChange={(e) => setServiceForm((prev) => ({ ...prev, name: e.target.value }))} />
            <input placeholder="Preco (ex: R$ 80 ou 80.00)" value={serviceForm.price} onChange={(e) => setServiceForm((prev) => ({ ...prev, price: e.target.value }))} />
            <input placeholder="URL da imagem" value={serviceForm.image} onChange={(e) => setServiceForm((prev) => ({ ...prev, image: e.target.value }))} />
            <textarea placeholder="Descricao" value={serviceForm.description} onChange={(e) => setServiceForm((prev) => ({ ...prev, description: e.target.value }))} />
            <div className="admin-actions">
              <button className="btn" type="submit" style={{ border: 0 }}>{editingServiceId ? "Atualizar" : "Criar"}</button>
              {editingServiceId && (
                <button type="button" className="btn btn-secondary" onClick={() => { setEditingServiceId(null); setServiceForm(initialService); }}>
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <div className="admin-list">
            {services.map((item) => (
              <article key={item.id} className="admin-card">
                <strong>{item.name}</strong>
                <p>{item.price || "Sem preco"}</p>
                <p>{item.description || "Sem descricao"}</p>
                <div className="admin-actions">
                  <button className="btn btn-secondary" onClick={() => handleServiceEdit(item)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleServiceDelete(item.id)}>Excluir</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === "gallery" && (
        <section className="admin-section">
          <h2>CRUD da Galeria</h2>
          <form className="admin-form" onSubmit={handleGallerySubmit}>
            <input required placeholder="URL da imagem" value={galleryForm.src} onChange={(e) => setGalleryForm((prev) => ({ ...prev, src: e.target.value }))} />
            <input placeholder="Categoria / legenda" value={galleryForm.category} onChange={(e) => setGalleryForm((prev) => ({ ...prev, category: e.target.value }))} />
            <div className="admin-actions">
              <button className="btn" type="submit" style={{ border: 0 }}>{editingGalleryId ? "Atualizar" : "Criar"}</button>
              {editingGalleryId && (
                <button type="button" className="btn btn-secondary" onClick={() => { setEditingGalleryId(null); setGalleryForm(initialGallery); }}>
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <div className="admin-list">
            {galleryItems.map((item) => (
              <article key={item.id} className="admin-card">
                <strong>{item.category || "Sem categoria"}</strong>
                <p className="admin-url">{item.src}</p>
                <div className="admin-actions">
                  <button className="btn btn-secondary" onClick={() => handleGalleryEdit(item)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleGalleryDelete(item.id)}>Excluir</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === "appointments" && (
        <section className="admin-section">
          <h2>CRUD de Agendamentos</h2>
          <form className="admin-form" onSubmit={handleAppointmentSubmit}>
            <input required placeholder="Nome da cliente" value={appointmentForm.client_name} onChange={(e) => setAppointmentForm((prev) => ({ ...prev, client_name: e.target.value }))} />
            <input required placeholder="Servico" value={appointmentForm.service} onChange={(e) => setAppointmentForm((prev) => ({ ...prev, service: e.target.value }))} />
            <input required type="datetime-local" value={appointmentForm.appointment_date} onChange={(e) => setAppointmentForm((prev) => ({ ...prev, appointment_date: e.target.value }))} />
            <select value={appointmentForm.status} onChange={(e) => setAppointmentForm((prev) => ({ ...prev, status: e.target.value }))}>
              <option value="pending">Pendente</option>
              <option value="confirmed">Confirmado</option>
              <option value="done">Concluido</option>
              <option value="cancelled">Cancelado</option>
            </select>
            <div className="admin-actions">
              <button className="btn" type="submit" style={{ border: 0 }}>{editingAppointmentId ? "Atualizar" : "Criar"}</button>
              {editingAppointmentId && (
                <button type="button" className="btn btn-secondary" onClick={() => { setEditingAppointmentId(null); setAppointmentForm(initialAppointment); }}>
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <div className="admin-list">
            {appointments.map((item) => (
              <article key={item.id} className="admin-card">
                <strong>{item.client_name}</strong>
                <p>{item.service}</p>
                <p>{item.appointment_date ? new Date(item.appointment_date).toLocaleString() : "Sem data"}</p>
                <p>Status: {item.status}</p>
                <div className="admin-actions">
                  <button className="btn btn-secondary" onClick={() => handleAppointmentEdit(item)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleAppointmentDelete(item.id)}>Excluir</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
