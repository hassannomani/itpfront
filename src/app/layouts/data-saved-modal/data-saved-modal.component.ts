import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmDialogModel } from '../confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-data-saved-modal',
  templateUrl: './data-saved-modal.component.html',
  styleUrls: ['./data-saved-modal.component.css']
})
export class DataSavedModalComponent {
  title: string="";
  message: string ="";
  constructor(public dialogRef: MatDialogRef<DataSavedModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
