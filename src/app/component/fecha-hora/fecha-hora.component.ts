import {Component, OnInit} from '@angular/core';
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

  constructor(private atp: AmazingTimePickerService,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.dateTimeForm = this._formBuilder.group({
      fecha: this.date,
      dia: this.time
    });
  }

  open() {
    const start = moment();
    const remainder = 60 - (start.minute() % 60);

    let dateTime = moment(start).add(remainder, 'minutes');
    console.log(dateTime);
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
      console.log(moment(time, 'HH:mm').toDate());
    });
  }
}
