import {ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../../../@fuse/animations";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TopicModel} from "../../../../../../store/topic/topic.model";

@Component({
  selector: 'app-topic-setting',
  templateUrl: './topic-setting.component.html',
  styleUrls: ['./topic-setting.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class TopicSettingComponent implements OnInit {

    showExtraToFields: boolean;
    topicForm: FormGroup;
    topic: TopicModel;
    constructor(
      public matDialogRef: MatDialogRef<TopicSettingComponent>,
      private def: ChangeDetectorRef,
      private _formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) private _data: any
    ) {
      this.topicForm = this.editTopic();
      this.showExtraToFields = false;
      this.topic = _data.topic;
      this.topicForm = this.createSettingForm()
    }

    ngOnInit(): void {}

    createSettingForm(): FormGroup {
        return this._formBuilder.group({
            title: [this.topic.data.name],
            description: [this.topic.data.description]
        })
    }

    editTopic (): FormGroup
    {
        return new FormGroup({
            title: new FormControl(''),
            description: new FormControl(''),
        });
    }
}
