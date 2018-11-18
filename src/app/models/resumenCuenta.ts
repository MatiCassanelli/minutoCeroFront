export class ResumenCuenta {
  _id: string;
  periodoDesde: Date;
  periodoHasta: Date;
  vencimiento: Date;
  segundoVencimiento: Date;
  estado: string;
  detalle: {
    subtotal: number,
    recargo: number,
    total: number,
    lineasDeFacturacion: [
      {
        cancha: {
          id: string,
          nombreCancha: string
        },
        fechaReserva: Date,
        precio: number,
        comision: number,
        isTotalsRow: boolean
      }]
  };
  predio: string;
  linkMercadoPago: string;
}
