import Swal from "sweetalert2";
import { supabase } from "../index";
const tabla = "sucursales";
export async function MostrarSucursales(p) {
  const { data, error } = await supabase
    .from(tabla)
    .select()
    .eq("id_empresa", p.id_empresa);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
  return data;
}
export async function MostrarSucursalesAsignadasXuser(p) {
  const { data } = await supabase.rpc("mostrarsucursalesasignadas", {
    _id_usuario: p.id_usuario
  });
  return data;
}
