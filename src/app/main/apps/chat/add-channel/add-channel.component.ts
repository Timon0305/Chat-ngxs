import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AddChannelComponent {
    showExtraToFields: boolean;
    composeForm: FormGroup;

  constructor(
      public matDialogRef: MatDialogRef<AddChannelComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
      this.composeForm = this.createComposeForm();
      this.showExtraToFields = false;
  }

    createComposeForm(): FormGroup
    {
        return new FormGroup({
            from   : new FormControl({
                value   : 'johndoe@creapond.com',
                disabled: true
            }),
            to     : new FormControl(''),
            cc     : new FormControl(''),
            bcc    : new FormControl(''),
            subject: new FormControl(''),
            message: new FormControl('')
        });
    }
    toggleExtraToFields(): void
    {
        this.showExtraToFields = !this.showExtraToFields;
    }
}
