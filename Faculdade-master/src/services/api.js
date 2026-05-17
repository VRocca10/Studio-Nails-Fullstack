import { supabase } from "../lib/supabase";

function normalizeService(row) {
  return {
    ...row,
    name: row.name ?? row.title ?? "",
    price: row.price ?? "",
    description: row.description ?? "",
    image: row.image ?? "",
  };
}

function normalizeGallery(row) {
  return {
    ...row,
    src: row.src ?? row.image ?? "",
    alt: row.alt ?? row.category ?? "Imagem da galeria",
    category: row.category ?? "",
  };
}

export async function getServices() {
  const { data, error } = await supabase.from("services").select("*").order("id", { ascending: true });
  if (error) throw error;
  return (data || []).map(normalizeService);
}

export async function createService(service) {
  const payload = {
    title: service.title || service.name || "",
    description: service.description || null,
    image: service.image || null,
    price: service.price || null,
  };
  const { data, error } = await supabase.from("services").insert([payload]).select().single();
  if (error) throw error;
  return normalizeService(data);
}

export async function updateService(id, service) {
  const payload = {
    title: service.title || service.name || "",
    description: service.description || null,
    image: service.image || null,
    price: service.price || null,
  };
  const { data, error } = await supabase.from("services").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return normalizeService(data);
}

export async function deleteService(id) {
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw error;
}

export async function getGallery() {
  const { data, error } = await supabase.from("gallery").select("*").order("id", { ascending: true });
  if (error) throw error;
  return (data || []).map(normalizeGallery);
}

export async function createGalleryItem(item) {
  const payload = {
    image: item.image || item.src || "",
    category: item.category || item.alt || null,
  };
  const { data, error } = await supabase.from("gallery").insert([payload]).select().single();
  if (error) throw error;
  return normalizeGallery(data);
}

export async function updateGalleryItem(id, item) {
  const payload = {
    image: item.image || item.src || "",
    category: item.category || item.alt || null,
  };
  const { data, error } = await supabase.from("gallery").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return normalizeGallery(data);
}

export async function deleteGalleryItem(id) {
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) throw error;
}

export async function createContact(contact) {
  const payload = {
    name: contact.name || null,
    email: contact.email || null,
    message: contact.message || null,
  };
  const { data, error } = await supabase.from("contacts").insert([payload]).select();
  if (error) throw error;
  return data;
}

export async function getAppointments() {
  const { data, error } = await supabase.from("appointments").select("*").order("appointment_date", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function createAppointment(appointment) {
  const payload = {
    client_name: appointment.client_name,
    service: appointment.service,
    appointment_date: appointment.appointment_date,
    status: appointment.status || "pending",
  };
  const { data, error } = await supabase.from("appointments").insert([payload]).select().single();
  if (error) throw error;
  return data;
}

export async function updateAppointment(id, appointment) {
  const payload = {
    client_name: appointment.client_name,
    service: appointment.service,
    appointment_date: appointment.appointment_date,
    status: appointment.status || "pending",
  };
  const { data, error } = await supabase.from("appointments").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteAppointment(id) {
  const { error } = await supabase.from("appointments").delete().eq("id", id);
  if (error) throw error;
}
