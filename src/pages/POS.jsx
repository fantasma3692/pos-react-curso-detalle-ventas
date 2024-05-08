import { useQuery } from "@tanstack/react-query";
import {
  POSTemplate,
  Spinner1,
  SpinnerSecundario,
  useAlmacenesStore,
  useEmpresaStore,
  useProductosStore,
  useSucursalesStore,
  useVentasStore,
} from "../index";

export function POS() {
  const { dataempresa } = useEmpresaStore();
  const { mostrarAlmacenXsucursal } = useAlmacenesStore();
  const { mostrarventasxsucursal } = useVentasStore();
  const { productosItemSelect } = useProductosStore();
  const { sucursalesItemSelectAsignadas, dataSucursales } =
    useSucursalesStore();
  const { buscarProductos, buscador } = useProductosStore();
  useQuery({
    queryKey: ["buscar productos", buscador],
    queryFn: () =>
      buscarProductos({ id_empresa: dataempresa?.id, buscador: buscador }),
    enabled: !!dataempresa,
    refetchOnWindowFocus: false,
  });

  useQuery({
    queryKey: [
      "mostrar almacen por sucursal",
      sucursalesItemSelectAsignadas.id_sucursal,
    ],
    queryFn: () =>
      mostrarAlmacenXsucursal({
        id_sucursal: sucursalesItemSelectAsignadas.id_sucursal,
      }),
  });
  const{isLoading,error}=useQuery({
    queryKey: [
      "mostrar ventas por sucursal",
      sucursalesItemSelectAsignadas.id_sucursal,
    ],
    queryFn: () =>
      mostrarventasxsucursal({
        id_sucursal: sucursalesItemSelectAsignadas.id_sucursal
      }),enabled:!!sucursalesItemSelectAsignadas
  });
  if(isLoading){
      return <SpinnerSecundario texto="cargando ventas..."/>
  }
  
  
  if(error)
  {
    return <span>Error...{error.message}</span>
  }
  return <POSTemplate />;
}
