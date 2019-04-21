import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonService } from '../../../shared/services/common.service';
import { FormValidationService } from '../../../shared/services/form-validation.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-new-auction',
  templateUrl: './new-auction.component.html',
  styleUrls: ['./new-auction.component.scss']
})
export class NewAuctionComponent implements OnInit {
  submitted: boolean;
  infoForm: FormGroup;
  catagories: string[];
	public form:FormGroup;uploadData: any;
  questionPicture: any;
  questionPictureurl: any;
  standardInterests: string[];
  formArray: FormArray;
  serverUrl: string = environment.apiUrl;

	constructor(
		private commonService: CommonService,
		private snackBar: MatSnackBar,
    public fb: FormBuilder,
    private formValidationService: FormValidationService,
	) { }

	ngOnInit() {
		this.submitted = false;
    this.infoForm = this.fb.group({
      auctionTitle: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          this.formValidationService.isBlank
        ]
      ],
      bidblabPrice: [
        '',
        [
          Validators.required,
          Validators.min(0),
          this.formValidationService.isBlank,
        ]
      ],
      retailPrice: [
        '',
        [
          Validators.required,
          this.formValidationService.areAuctionPriceMismatching,
          this.formValidationService.isBlank,
        ]
      ],
      bidFee: [
        '',
        [
          Validators.required,
          Validators.min(0),
          this.formValidationService.isBlank,
        ]
      ],
      starts: [
        '',
        [
          Validators.required,
        ]
      ],
      closes: [
        '',
        [
          Validators.required,
          this.formValidationService.areAuctionTimeMismatching,
        ]
      ],
      auctionId: [
        '',
        [
          Validators.required,
          this.formValidationService.isBlank,
        ]
      ],
    });
  }
  
  checkError(form, field, error) {
    return this.formValidationService.checkError(form, field, error);
  }

  onFileChanged(event, input) {
    event.preventDefault()
    console.log(this.infoForm.value.starts);
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
        });
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open(err.error.msg, 'Dismiss', {
          duration: 1500
        });
      }
    );
  }

  addAuction() {
    if (this.infoForm.valid) {
      this.commonService.addAuction(this.infoForm.value).subscribe(
        (res: any) => {
          ////////////////////////////////////////
          console.log(res);
          if(res.data){
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
              });
            } 
          }
          else{
            this.snackBar.open(res.msg, 'Dismiss', {
              duration: 1500
            })
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
            });
        }
      );
    }
  }

}

