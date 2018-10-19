import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';

@Component({
  selector: 'app-registro-predio-steps',
  templateUrl: './registro-predio-steps.component.html',
  styleUrls: ['./registro-predio-steps.component.css']
})
export class RegistroPredioStepsComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }

  siguiente(event, stepper: MatStepper) {
    if (event)
      stepper.next();
  }

}
