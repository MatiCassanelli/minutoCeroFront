import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Partido} from '../../models/partido';
import {Predio} from '../../models/predio';

@Component({
  selector: 'app-card-resultado-partido',
  templateUrl: './card-resultado-partido.component.html',
  styleUrls: ['./card-resultado-partido.component.css']
})
export class CardResultadoPartidoComponent implements OnInit {

  @Input() golesLocal: number;
  @Input() golesVisitante: number;
  @Input() partido: Partido;
  @Input() predio: Predio;
  @Input() editable = false;
  @Output() resultado: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  submit() {
    if (this.editable){
      this.resultado.emit({
        golesLocal: this.golesLocal,
        golesVisitante: this.golesVisitante
      });
    }

  }

}
