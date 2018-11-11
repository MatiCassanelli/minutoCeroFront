import {Horario} from './horario';

export class Predio {
  _id: string
  nombrePredio: string;
  telefono: string;
  horario: Horario[];
  ubicacionMaps: {
    lat: string,
    lng: string
  };
  direccion: string;
}
