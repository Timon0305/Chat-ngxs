import {ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../../../@fuse/animations";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TopicModel} from "../../../../../../store/topic/topic.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class EditTopicComponent implements OnInit {

    showExtraToFields: boolean;
    topicForm: FormGroup;
    topic: TopicModel;
    constructor(
        public matDialogRef: MatDialogRef<EditTopicComponent>,
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

    topicOff = () => {
        if (window.confirm('This form will lose changes')) {
            this.matDialogRef.close()
        }
    }
}
