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
  configHorario: {
    dia: {
      desde: Date,
      hasta: Date
    },
    noche: {
      desde: Date,
      hasta: Date
    }
  };
}
