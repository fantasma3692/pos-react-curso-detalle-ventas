import styled from "styled-components";
import { useDetalleVentasStore } from "../../../store/DetalleVentasStore";
import { useQuery } from "@tanstack/react-query";
import { useVentasStore } from "../../../store/VentasStore";
import { blur_in } from "../../../styles/keyframes";
import { FormatearNumeroDinero } from "../../../utils/Conversiones";
import { Btn1, Lottieanimacion,useCartVentasStore } from "../../../index";
import animacionvacio from "../../../assets/vacioanimacion.json";
import { Icon } from "@iconify/react/dist/iconify.js";

export function AreaDetalleventaPos() {
  const { mostrardetalleventa, datadetalleventa, eliminardetalleventa, total } =
    useDetalleVentasStore();
  const { items, addcantidadItem, restarcantidadItem,removeItem } = useCartVentasStore();
  const { idventa } = useVentasStore();
  useQuery({
    queryKey: ["mostrar detalle venta", { id_venta: idventa }],
    queryFn: () => mostrardetalleventa({ id_venta: idventa }),
    enabled: idventa != undefined,
  });

  return (
    <AreaDetalleventa className={items.length > 0 ? "" : "animacion"}>
      {items.length > 0 ? (
        items.map((item, index) => {
          return (
            <Itemventa key={index}>
              <article className="contentdescripcion">
                <span className="descripcion">
                  {item._cantidad} {item._descripcion}
                </span>
                <span className="importe">
                  🪵{FormatearNumeroDinero(item._precio_venta)}
                </span>
              </article>
              <article className="contentbtn">
                <Btn1
                  funcion={() => addcantidadItem(item)}
                  width="20px"
                  height="35px"
                  icono={<Icon icon="mdi:add-bold" />}
                ></Btn1>
                <Btn1
                  funcion={() => restarcantidadItem(item)}
                  width="20px"
                  height="35px"
                  icono={<Icon icon="subway:subtraction-1" />}
                ></Btn1>
              </article>
              <article className="contentcantidad">
                <span className="cantidad">
                  <strong>{FormatearNumeroDinero(item._total)}</strong>
                </span>
                <span
                  className="delete"
                  onClick={() => removeItem(item)}
                >
                  💀
                </span>
              </article>
            </Itemventa>
          );
        })
      ) : (
        <Lottieanimacion animacion={animacionvacio} alto="200" ancho="200" />
      )}
    </AreaDetalleventa>
  );
}
const AreaDetalleventa = styled.section`
  display: flex;
  width: 100%;
  margin-top: 10px;
  flex-direction: column;
  gap: 10px;
  &.animacion {
    height: 100%;
    justify-content: center;
  }
`;
const Itemventa = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px dashed ${({ theme }) => theme.color2};
  animation: ${blur_in} 0.2s linear both;

  .contentdescripcion {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width:100%;
    .descripcion {
      font-weight: 700;
      font-size: 20px;
    }
    .importe {
      font-size: 12px;
    }
  }
  .contentbtn {
    display: flex;
     width:100%;
     height:100%;
    gap: 10px;
    align-items: center;
    justify-content:center;
  
   
  }
  .contentcantidad {
    display: flex;
    flex-direction: column;
    justify-content: end;
    text-align: end;
    margin-bottom: 10px;
    width:100%;
    .delete {
      cursor: pointer; 
      width:20px;
      align-self:flex-end
    
      
    }
  }
`;
