import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../../../@fuse/animations";
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AddTopicComponent implements OnInit {

    showExtraToFields: boolean;
    topicForm: FormGroup;
    constructor(
      public matDialogRef: MatDialogRef<AddTopicComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any
    ) {
        this.topicForm = this.createComposeForm();
        this.showExtraToFields = false;
    }

  ngOnInit(): void {

  }

    createComposeForm (): FormGroup
    {
        return new FormGroup({
            title: new FormControl(''),
            description: new FormControl(''),
        });
    }

}
