export class Predio {
  _id: string
  nombre: string;
  telefono: string;
  horarios: Array<any>;
  ubicacionMaps: {
    lat: string,
    lng: string
  };
}
