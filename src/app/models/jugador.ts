export class Jugador {
  nombre: string;
  apellido: string;
  email: string;
  _id: string;
  img: string;
  calificacion: {
    atributos: {
      personalidad: number,
      tecnica: number,
      puntualidad: number
    },
    puntaje: number
  };
  type: string;
  photos: any;
  historial: {
      cantVictorias: number,
      cantEmpates: number,
      cantDerrotas: number
  };
}

