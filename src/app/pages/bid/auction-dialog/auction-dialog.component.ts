import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonService } from '../../../shared/services/common.service';
import { FormValidationService } from '../../../shared/services/form-validation.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-auction-dialog',
  templateUrl: './auction-dialog.component.html',
  styleUrls: ['./auction-dialog.component.scss']
})
export class AuctionDialogComponent implements OnInit {
  submitted: boolean;
  infoForm: FormGroup;
  catagories: string[];
  public form: FormGroup;
  questionPictures: any[] = [];
  initPictureurls: any[] = [];
  deletedPictureurls: any[] = [];
  standardInterests: string[];
  formArray: FormArray;
  serverUrl: string = environment.apiUrl;

	constructor(
		private commonService: CommonService,
		private snackBar: MatSnackBar,
    public fb: FormBuilder,
    private formValidationService: FormValidationService,
    private dialogRef: MatDialogRef<AuctionDialogComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public data: any,
	) { }

	ngOnInit() {
    this.submitted = false;
    this.questionPictures = [];
    this.infoForm = this.fb.group({
      auctionTitle: [
        this.data.auction ? this.data.auction.auctionTitle : '',
        [
          Validators.required,
          Validators.maxLength(100),
          this.formValidationService.isBlank
        ]
      ],
      bidblabPrice: [
        this.data.auction? String(this.data.auction.bidblabPrice) : '',
        [
          Validators.required,
          Validators.min(0),
          this.formValidationService.isBlank,
        ]
      ],
      retailPrice: [
        this.data.auction ? String(this.data.auction.retailPrice) : '',
        [
          Validators.required,
          this.formValidationService.areAuctionPriceMismatching,
          this.formValidationService.isBlank,
        ]
      ],
      bidFee: [
        this.data.auction ? String(this.data.auction.bidFee) : '',
        [
          Validators.required,
          Validators.min(0),
          this.formValidationService.isBlank,
        ]
      ],
      starts: [
        this.data.auction ? new Date(this.data.auction.starts) : '',
        [
          Validators.required,
        ]
      ],
      closes: [
        this.data.auction ? new Date(this.data.auction.closes) : '',
        [
          Validators.required,
          this.formValidationService.areAuctionTimeMismatching,
        ]
      ],
      auctionSerial: [
        this.data.auction ? String(this.data.auction.auctionSerial) : '',
        [
          Validators.required,
          this.formValidationService.isBlank,
        ]
      ],
    });

    if(this.data.auction.auctionPicture.length){
      this.data.auction.auctionPicture.forEach(element => {
        this.questionPictures.push({url: this.serverUrl + '/' + element, file:''});
        this.initPictureurls.push(this.serverUrl + '/' + element);
      });
    }
  }
  
  checkError(form, field, error) {
    return this.formValidationService.checkError(form, field, error);
  }

  addPicture(event, input) {
    event.preventDefault()
    console.log(this.infoForm.value.starts);
    if (event.target.files && event.target.files[0]) {
      if(event.target.files[0].size > 1024*1024){
        this.snackBar.open("Image size is limited to 1MBytes.", 'Dismiss', {
          duration: 3000
        })
      }
      else{
        let fileTemp = event.target.files[0];
        var reader = new FileReader();
        reader.onload = (event) => {
          this.questionPictures.push({ url: reader.result, file: fileTemp }); 
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    }  
  }

  deletePicture(index){
    this.addDeleteList(this.questionPictures[index].url); 
    this.questionPictures.splice(index, 1);
  }

  addDeleteList(url){
    if(this.initPictureurls.some(element => element == url)){
      let temp = url.replace(new RegExp(this.serverUrl+'/', "i"), "");
      this.deletedPictureurls.push(temp);
    }
  }

  onPictureChanged(event, index) {
    event.preventDefault()
    console.log(this.infoForm.value.starts);
    if (event.target.files && event.target.files[0]) {
      if(event.target.files[0].size > 1024*1024){
        this.snackBar.open("Image size is limited to 1MBytes.", 'Dismiss', {
          duration: 3000
        })
      }
      else{
        this.addDeleteList(this.questionPictures[index].url);
        let fileTemp = event.target.files[0];
        var reader = new FileReader();
        reader.onload = (event) => {
          this.questionPictures[index] = { url: reader.result, file: fileTemp }; 
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    }  
  }

  addAuction(){
    if (this.infoForm.valid) {
      let uploadData = new FormData();
      this.questionPictures.forEach(element => {
        if(!this.initPictureurls.some(item => item == element.url)){
          uploadData.append('files[]', element.file, element.file.name);
        }
      });
      uploadData.append('auctionTitle', this.infoForm.value.auctionTitle);
      uploadData.append('bidblabPrice', this.infoForm.value.bidblabPrice);
      uploadData.append('retailPrice', this.infoForm.value.retailPrice);
      uploadData.append('bidFee', this.infoForm.value.bidFee);
      uploadData.append('starts', this.infoForm.value.starts);
      uploadData.append('closes', this.infoForm.value.closes);
      uploadData.append('auctionSerial', this.infoForm.value.auctionSerial);
      this.deletedPictureurls.forEach(element => {
        uploadData.append('deletedPictureurls[]', element);
      });
      console.log(this.deletedPictureurls);
      if(this.data.auctionId){
        uploadData.append('auctionId', this.data.auctionId);
        this.commonService.updateAuction(uploadData).subscribe(
          (res: any) => {
            this.snackBar.open(res.msg, 'Dismiss', {
              duration: 3000
            })
            .afterOpened()
            .subscribe(() => {
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
      else{
        this.commonService.addAuction(uploadData).subscribe(
          (res: any) => {
            this.snackBar.open(res.msg, 'Dismiss', {
              duration: 3000
            })
            .afterOpened()
            .subscribe(() => {
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
    }
  }

  // addAuction() {
  //   if (this.infoForm.valid) {
  //     this.commonService.addAuction(this.infoForm.value).subscribe(
  //       (res: any) => {
  //         ////////////////////////////////////////
  //         console.log(res);
  //         if(res.data){
  //           this.uploadpicture();
  //           // this.socketsService.notify('createdData', {
  //           //   type: 'question',
  //           //   data: res.data
  //           // });

  //           this.snackBar.open(res.msg, 'Dismiss', {
  //             duration: 1500
  //           })
  //           .afterOpened()
  //           .subscribe(() => {
  //             this.submitted = true;
  //           });
  //         }
  //         else{
  //           this.snackBar.open(res.msg, 'Dismiss', {
  //             duration: 1500
  //           })
  //         }
  //       },
  //       (err: HttpErrorResponse) => {
  //         this.submitted = false;
  //         this.snackBar
  //           .open(err.error.msg, 'Dismiss', {
  //             duration: 4000
  //           })
  //           .afterDismissed()
  //           .subscribe(() => {
  //           });
  //       }
  //     );
  //   }
  // }

}


