import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-dialog-plantel',
  templateUrl: './confirm-dialog-plantel.component.html',
  styleUrls: ['./confirm-dialog-plantel.component.css']
})
export class ConfirmDialogPlantelComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmDialogPlantelComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  submit(j?) {
    this.dialogRef.close(j);
  }

}
