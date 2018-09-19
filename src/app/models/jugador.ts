export class Jugador {
  nombre: string;
  apellido: string;
  email: string;
  _id: string;
  imagen: any;
  calificacion: {
    atributos: {
      personalidad: number,
      tecnica: number,
      puntualidad: number
    }
  };
  type: string;
}

