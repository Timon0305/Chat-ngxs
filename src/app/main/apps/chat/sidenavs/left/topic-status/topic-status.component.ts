import {ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../../../@fuse/animations";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TopicModel} from "../../../../../../store/topic/topic.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-topic-status',
  templateUrl: './topic-status.component.html',
  styleUrls: ['./topic-status.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class TopicStatusComponent implements OnInit {

    showExtraToFields: boolean;
    statusForm: FormGroup;
    constructor(
        public matDialogRef: MatDialogRef<TopicStatusComponent>,
        private def: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
    ) {
        this.showExtraToFields = false;
        this.statusForm = this.statusTopicForm()
    }

    ngOnInit(): void {}

    statusTopicForm(): FormGroup {
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
