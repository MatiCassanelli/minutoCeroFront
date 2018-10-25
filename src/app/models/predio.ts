import {Horario} from './horario';

export class Predio {
  _id: string
  nombrePredio: string;
  telefono: string;
  horarios: Horario[];
  ubicacionMaps: {
    lat: string,
    lng: string
  };
  direccion: string;
}
