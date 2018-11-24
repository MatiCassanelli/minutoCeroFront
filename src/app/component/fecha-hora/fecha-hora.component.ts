import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {AmazingTimePickerService} from 'amazing-time-picker';

@Component({
  selector: 'app-fecha-hora',
  templateUrl: './fecha-hora.component.html',
  styleUrls: ['./fecha-hora.component.css']
})
export class FechaHoraComponent implements OnInit {

  dateTimeForm: FormGroup;
  public selectedTime: string;
  fechaSelected = false;
  date = new FormControl('', [Validators.required]);
  time = new FormControl({value: '', disabled: !this.fechaSelected}, [Validators.required]);
  minDate = new Date(Date.now());
  @Output() dateTimeEmitter: EventEmitter<Date> = new EventEmitter<Date>();
  @Input() fecha: Date = null;
  @Input() readOnly = false;

  constructor(private atp: AmazingTimePickerService,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.dateTimeForm = this._formBuilder.group({
      fecha: this.date,
      hora: this.time
    });
    if (this.fecha) {
      this.date.setValue(this.fecha);
      this.time.setValue(this.fecha);
      this.selectedTime = moment(this.fecha).format('HH:mm');
      this.inputForm();
    }
  }

  open() {
    const start = moment();
    const remainder = 60 - (start.minute() % 60);

    let dateTime = moment(start).add(remainder, 'minutes');
    const amazingTimePicker = this.atp.open({
      time: dateTime.format('HH:mm'),
      onlyHour: true,
      // rangeTime: {
      //   start: dateTime.format('HH'),
      //   end: '2'
      // },
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
      this.time.setValue(time);
      this.inputForm();
    });
  }

  inputForm() {
    this.time.enable();
    this.fechaSelected = true;
    if (this.dateTimeForm.valid) {
      let dateTime = moment(this.dateTimeForm.get('fecha').value).set({
        hour: moment(this.time.value, 'HH:mm').get('hours'),
        minute: moment(this.time.value, 'HH:mm').get('minute'),
        second: 0,
        millisecond: 0
      }).toDate();
      this.dateTimeEmitter.emit(dateTime);
    }
  }
}
