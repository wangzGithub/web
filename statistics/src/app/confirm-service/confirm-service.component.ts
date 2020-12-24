import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-service',
  templateUrl: './confirm-service.component.html',
  styleUrls: ['./confirm-service.component.css']
})
export class ConfirmServiceComponent {

  isTrue: boolean = true;
  isFalse: boolean = false;
  title: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    if (data.type == 'add') {
      this.title = 'Add';
    } else if (data.type == 'delete') {
      this.title = 'Delete';
    } else {
      this.title = '???';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  type: string
}