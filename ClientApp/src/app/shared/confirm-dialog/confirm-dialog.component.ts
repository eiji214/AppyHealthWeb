import { Component, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
})
export class ConfirmDialog {

  confirmTitle: string;
  noButtonTitle: string;
  yesButtonTitle: string;
  entryId: number | string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.entryId = this.data.entryId;

    if (!this.data.confirmTitle) {
      this.confirmTitle = "Would you like to perform this action?";
    }
    else {
      this.confirmTitle = this.data.confirmTitle;
    }
    if (!this.data.noButtonTitle) {
      this.noButtonTitle = "No Thanks";
    }
    else {
      this.noButtonTitle = this.data.noButtonTitle;
    }
    if (!this.data.yesButtonTitle) {
      this.yesButtonTitle = "Yes";
    }
    else {
      this.yesButtonTitle = this.data.yesButtonTitle;
    }
    
  }

  onNoClick(): void {
    this.dialogRef.close();

    
  }
}
