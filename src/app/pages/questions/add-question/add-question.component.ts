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
import { QuestionsService } from '../questions.service';
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
  standardInterests: string[];
  formArray: FormArray;
  serverUrl: string = environment.apiUrl;
  uploadFiles: any = '';
  originalImage: string = '';
  showImageFlag: boolean = false;

  constructor(
    private fb: FormBuilder,
    private formValidationService: FormValidationService,
    private commonService: CommonService,
    private questionsService: QuestionsService,
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

    

    if(this.data.question && this.data.question.questionPicture){
      this.questionsService.getImage(this.serverUrl + '/' + this.data.question.questionPicture.path).subscribe(
        (res: any) => {
          this.originalImage = res;
          this.uploadFiles = this.originalImage;
          this.showImageFlag = true;
        },
        (err: HttpErrorResponse) => {
          this.showImageFlag = true;
        }
      );  
    }
    else{
      this.showImageFlag = true;
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

  submitForm(){
    if (this.infoForm.valid) {
      let uploadData = new FormData();
      uploadData.append('file', this.uploadFiles, this.uploadFiles.name);
      uploadData.append('title', this.infoForm.value.title);
      uploadData.append('tag', this.infoForm.value.tag);
      if (this.data.question) {
        uploadData.append('questionId', this.data.question._id);
        this.questionsService
          .updateQuestion(uploadData)
          .subscribe(
            (res: any) => {
              this.snackBar
                .open(res.msg, 'Dismiss', {
                  duration: 1500
                })
                .afterOpened()
                .subscribe(() => {
                  this.dialogRef.close(res.data);
                });
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
        this.questionsService.addQuestion(uploadData).subscribe(
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

  receiveData(data){
    this.uploadFiles = data;
    console.log(this.uploadFiles);
  }

}

