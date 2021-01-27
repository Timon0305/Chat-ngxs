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
    settingForm: FormGroup;
    topic: TopicModel;
    constructor(
      public matDialogRef: MatDialogRef<TopicSettingComponent>,
      private def: ChangeDetectorRef,
      private _formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) private _data: any
    ) {
      this.showExtraToFields = false;
      this.topic = _data.topic;
      this.settingForm = this.createSettingForm()
    }

    ngOnInit(): void {}

    createSettingForm(): FormGroup {
        return this._formBuilder.group({
            isCheck: new FormControl(false),
        })
    }


    topicOff = () => {
        if (window.confirm('This form will lose changes')) {
            this.matDialogRef.close()
        }
    }
}
