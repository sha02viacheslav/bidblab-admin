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
  uploadFiles: any[] = [];
  uploadFile: any;
  // originalImage: string = '';
  showImageFlag: boolean = false;
  title: string = "OK";
  selectedFileIndex: number = -1;

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
      credit: [
        this.data.question ? String(this.data.question.credit) : '',
        [
          Validators.required,
          Validators.min(0),
          this.formValidationService.isBlank,
        ]
      ],
      tag: this.data.question ? this.data.question.tag : '',
    });

    if(!this.data.question){
      this.commonService.getDefaultCredits().subscribe(
        (res: any) => {
          this.infoForm.controls.credit.setValue(String(res.data.defaultQuestionCredit));
        },
        (err: HttpErrorResponse) => {
          this.snackBar.open(err.error.msg, 'Dismiss');
        }
      );
    }

   

    if(this.data.question && this.data.question.questionPicture){
      this.getInitialImage(0);
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

  getInitialImage(index){
    var reader = new FileReader();
    // this.commonService.getImage(this.serverUrl + '/' + this.data.question.questionPicture[index]).subscribe(
    this.commonService.getImage(this.serverUrl + '/' + this.data.question.questionPicture.path).subscribe(
      (res: any) => {
        this.uploadFile = res;
        reader.readAsDataURL(this.uploadFile);
        reader.onload = (event) => {
          this.uploadFiles.push({
            originalFile: this.uploadFile, 
            croppedFile: this.uploadFile,  
            croppedImage: reader.result
          });
        }
        
        //if(this.data.auction.auctionPicture.length == index + 1 ){
          // for(var index = 0; this.uploadFiles[index]; ){
          //   var reader = new FileReader();
          //   reader.readAsDataURL(this.uploadFile);
          //   reader.onload = (event) => {
          //     this.uploadFiles[index].croppedImage = reader.result;
          //     index++;
          //   }
          //   console.log(index);
          // }
        // }
        // else{
        //   this.getInitialImage(index+1)
        // }
      },
      (err: HttpErrorResponse) => {
        this.showImageFlag = true;
      }
    );  
  }

  checkError(form, field, error) {
    return this.formValidationService.checkError(form, field, error);
  }

  addPicture(data) {
    console.log('data', data);
    console.log(this.uploadFiles);
    if (data) {
      this.uploadFiles[this.selectedFileIndex] = {
        originalFile: data.originalFile,
        croppedFile: data.croppedFile? data.croppedFile : this.uploadFiles[this.selectedFileIndex].croppedFile,
        croppedImage: data.croppedImage? data.croppedImage : this.uploadFiles[this.selectedFileIndex].croppedImage
      };
      console.log(this.uploadFiles[this.selectedFileIndex]);
    }
    else{
      this.uploadFiles.splice(this.selectedFileIndex, 1);
    }
    this.selectedFileIndex = -1;
    console.log(this.uploadFiles);
  }

  openCrop(index){
    console.log("openCrop");
    if(this.selectedFileIndex != -1 && this.uploadFiles[this.selectedFileIndex].croppedFile == ''){
      this.uploadFiles.splice(this.selectedFileIndex, 1);
      console.log("delete");
    }
    this.selectedFileIndex = index;
  }

  addFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      // var reader = new FileReader();
      // reader.onload = () => {
        // this.uploadPicture = reader.result;
        this.uploadFiles.push({
          originalFile: event.target.files[0],
          croppedFile: '',
          croppedImage: ''
        });
        this.selectedFileIndex = this.uploadFiles.length - 1;
      // }
      // reader.readAsDataURL(event.target.files[0]);
    }
  }

  private getUserUpdates() {
    this.userUpdatesSubscription = this.authenticationService
      .getUserUpdates()
      .subscribe(user => (
        this.user = user
      ));
  }

  submitForm(){
    console.log(this.title);
    if (this.infoForm.valid) {
      let uploadData = new FormData();
      this.uploadFiles.forEach(element => {
        if(element.croppedFile){
          uploadData.append('file', element.croppedFile, element.croppedFile.name);
        }
      });
      uploadData.append('title', this.infoForm.value.title);
      uploadData.append('credit', this.infoForm.value.credit);
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
              });
          }
        );
      }
    }
  }

  // receiveData(data){
  //   this.uploadFiles = data;
  //   console.log(this.uploadFiles);
  // }

}

