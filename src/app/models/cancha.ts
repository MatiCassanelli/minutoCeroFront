import {Deporte} from './deporte';

export class Cancha {
  _id: string;
  nombreCancha: string;
  deporte: Deporte;
  canchasHijas: Cancha[];
  tipoSuelo: ['Tierra', 'Sintetico', 'Natural'];
  predio: string;

  constructor(predio: string, public base?: boolean) {
    this.predio = predio;
    // if(base)
    //   this.canchaBase = base;
    // else
    //   this.canchaBase = false;
  }
}

