export class Predio {
  _id: string
  nombrePredio: string;
  telefono: string;
  horarios: Array<any>;
  ubicacionMaps: {
    lat: string,
    lng: string
  };
  direccion: string;
}
