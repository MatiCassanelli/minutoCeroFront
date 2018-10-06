import {Deporte} from './deporte';

export class Cancha {
  _id: string;
  nombreCancha: string;
  deporte: Deporte;
  canchasHijas: Cancha[];
  tipoSuelo: string;
  // canchaBase: boolean;

  constructor(public base?: boolean) {
    // if(base)
    //   this.canchaBase = base;
    // else
    //   this.canchaBase = false;
  }
}

