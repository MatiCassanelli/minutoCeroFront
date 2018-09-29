import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card-notificacion',
  templateUrl: './card-notificacion.component.html',
  styleUrls: ['./card-notificacion.component.css']
})
export class CardNotificacionComponent implements OnInit {

  @Input() mensaje: string;
  @Output() swipe: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() {
  }

  ngOnInit() {
  }

  swipeEvent() {
    this.swipe.emit(true);
  }
}
