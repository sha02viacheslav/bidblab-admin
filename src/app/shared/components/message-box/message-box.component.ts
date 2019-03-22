import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatChipInputEvent,
} from '@angular/material';
import { CommonService } from '../../services/common.service';
import { FormValidationService } from '../../services/form-validation.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  infoForm: FormGroup;
  disabledSubmitButton: boolean = true;
  optionsSelect: Array<any>;
  submitted: boolean;

  constructor(
    private fb: FormBuilder, 
    private commonService: CommonService,
    private dialogRef: MatDialogRef<MessageBoxComponent>,
    private formValidationService: FormValidationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(){
    this.submitted = false;
    this.infoForm = this.fb.group({
      'contactFormEmail': [this.data.email, Validators.required],
      'contactFormSubjects': ['',],
      'contactFormMessage': ['', 
        [
          Validators.required,
          Validators.maxLength(100),
          this.formValidationService.isBlank
        ]
      ],
      });
  }

  checkError(form, field, error) {
    return this.formValidationService.checkError(form, field, error);
  }
  
  onSubmit() {
    this.commonService.sendMessage(this.infoForm.value).subscribe(() => {
      this.dialogRef.close("OK");
      alert('Your message has been sent.');
      this.submitted = true;
    }, error => {
      console.log('Error', error);
    });
  }
  
}