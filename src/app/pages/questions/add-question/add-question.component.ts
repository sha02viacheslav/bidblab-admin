import { Component, OnDestroy, Inject, OnInit, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators,  FormControl  } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FormValidationService } from '../../../shared/services/form-validation.service';
import {
  MatSnackBar,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatChipInputEvent,
} from '@angular/material';
import { CommonService } from '../../../shared/services/common.service';
import { Question } from '../../../shared/models/question.model';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { User } from '../../../shared/models/user.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit, OnDestroy {
  user: User;
  submitted: boolean;
  infoForm: FormGroup;
  catagories: string[];
  private userUpdatesSubscription: Subscription;
  uploadData: any;
  questionPicture: any;
  questionPictureurl: any;
  standardInterests: string[];
  formArray: FormArray;
  serverUrl: string = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private formValidationService: FormValidationService,
    private commonService: CommonService,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddQuestionComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    
    this.catagories = [];
    this.getUserUpdates();

    this.submitted = false;
    this.infoForm = this.fb.group({
      title: [
        this.data.question ? this.data.question.title : (this.data.newTitle? this.data.newTitle : ''),
        [
          Validators.required,
          Validators.maxLength(500),
          this.formValidationService.isBlank
        ]
      ],
      tag: this.data.question ? this.data.question.tag : '',
    });
    if(this.data.question){
      this.questionPictureurl = this.serverUrl + '/' + this.data.question.questionPicture.path;
    }

    const observable = this.commonService.getStandardInterests();
    observable.subscribe(
      (res: any) => {
        this.standardInterests = res.data;
        this.formArray = this.infoForm.get('tags') as FormArray;
        this.user.tags.forEach( item => {
          if(!this.standardInterests.some( x => x == item)){
            this.standardInterests.push(item);
          };
        });
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open(err.error.msg, 'Dismiss', {
          duration: 1500
        });
      }
    );  
  }

  ngOnDestroy() {
    this.userUpdatesSubscription.unsubscribe();
  }

  checkError(form, field, error) {
    return this.formValidationService.checkError(form, field, error);
  }

  private getUserUpdates() {
    this.userUpdatesSubscription = this.authenticationService
      .getUserUpdates()
      .subscribe(user => (
        this.user = user
      ));
  }

  onFileChanged(event, input) {
    event.preventDefault()
    if (event.target.files && event.target.files[0]) {
      if(event.target.files[0].size > 1024*1024){
        this.snackBar.open("Image size is limited to 1MBytes.", 'Dismiss', {
          duration: 3000
        })
      }
      else{
        this.uploadData = new FormData();
        this.uploadData.append('file', event.target.files[0], event.target.files[0].name);
        var reader = new FileReader();
        reader.onload = (event) => {
          this.questionPictureurl = reader.result; 
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    }  
  }

  uploadpicture(){
    this.commonService.changeQuestionPicture(this.uploadData).subscribe(
      (res: any) => {
        // this.socketsService.notify('createdData', {
        //   type: 'question',
        //   data: res.data
        // });
        this.snackBar.open(res.msg, 'Dismiss', {
          duration: 1500
        })
        .afterOpened()
        .subscribe(() => {
          this.submitted = true;
          this.dialogRef.close(res.data);
        });
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open(err.error.msg, 'Dismiss', {
          duration: 1500
        });
      }
    );
  }

  submitForm() {
    if (this.infoForm.valid) {
      if (this.data.question) {
        this.commonService
          .updateQuestion(this.data.question._id, this.infoForm.value)
          .subscribe(
            (res: any) => {
              if(this.uploadData){
                this.uploadData.append('questionId', res.data._id);
                this.uploadpicture();
              }
              else{
                // this.socketsService.notify('updatedData', {
                //   type: 'question',
                //   data: res.data
                // });
                this.snackBar
                  .open(res.msg, 'Dismiss', {
                    duration: 1500
                  })
                  .afterOpened()
                  .subscribe(() => {
                    this.dialogRef.close(res.data);
                  });
              }
            },
            (err: HttpErrorResponse) => {
              this.submitted = false;
              this.snackBar
                .open(err.error.msg, 'Dismiss', {
                  duration: 4000
                })
                .afterDismissed()
                .subscribe(() => {});
            }
          );
      } else {
        this.commonService.addQuestion(this.infoForm.value).subscribe(
          (res: any) => {
            ////////////////////////////////////////
            if(this.uploadData){
              this.uploadData.append('questionId', res.data._id);
              this.uploadpicture();
            }
            else{
              // this.socketsService.notify('createdData', {
              //   type: 'question',
              //   data: res.data
              // });
              this.snackBar.open(res.msg, 'Dismiss', {
                duration: 1500
              })
              .afterOpened()
              .subscribe(() => {
                this.submitted = true;
                this.dialogRef.close(res.data);
              });
            } 
          },
          (err: HttpErrorResponse) => {
            this.submitted = false;
            this.snackBar
              .open(err.error.msg, 'Dismiss', {
                duration: 4000
              })
              .afterDismissed()
              .subscribe(() => {
                this.dialogRef.close(); 
              });
          }
        );
      }
    }
  }
}

