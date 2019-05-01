import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonService } from '../../../shared/services/common.service';
import { FormValidationService } from '../../../shared/services/form-validation.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { element } from '@angular/core/src/render3';
import { AuctionService } from '../auction.service';

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
  uploadFiles: any[] = [];
  uploadFile: any;
  uploadPicture: any;
  standardInterests: string[];
  formArray: FormArray;
  serverUrl: string = environment.apiUrl;
  showImageFlag: boolean = false;
  selecteFileIndex: number = -1;

	constructor(
		private commonService: CommonService,
		private auctionService: AuctionService,
		private snackBar: MatSnackBar,
    public fb: FormBuilder,
    private formValidationService: FormValidationService,
    private dialogRef: MatDialogRef<AuctionDialogComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public data: any,
	) { }

	ngOnInit() {
    this.submitted = false;
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
        this.data.auction ? String("0000000" + (this.data.auction.auctionSerial)).slice(-7) : '0000000',
        [
          Validators.required,
          this.formValidationService.isBlank,
        ]
      ],
      auctionDetail: [
        this.data.auction ? this.data.auction.auctionDetail : '',
      ],
    });

    if(!this.data.auctionId){
      this.auctionService.getDataForAddAuction().subscribe(
        (res: any) => {
          this.infoForm.controls.auctionSerial.setValue(("0000000" + (res.data.finalAuctionSerial + 1)).slice(-7));
        },
        (err: HttpErrorResponse) => {
          this.snackBar.open(err.error.msg, 'Dismiss', {
            duration: 1500
          });
        }
      );
    }

    if(this.data.auction && this.data.auction.auctionPicture.length){
      this.data.auction.auctionPicture.forEach((element, index) => {
        this.commonService.getImage(this.serverUrl + '/' + element).subscribe(
          (res: any) => {
            this.uploadFile = res;
            this.uploadFiles.push({
              originalFile: this.uploadFile, 
              croppedFile: this.uploadFile,  
              croppedImage: ''});
            if(this.data.auction.auctionPicture.length == index + 1 ){
              for(var index = 0; this.uploadFiles[index]; ){
                var reader = new FileReader();
                reader.readAsDataURL(this.uploadFile);
                reader.onload = (event) => {
                  this.uploadFiles[index].croppedImage = reader.result;
                  index++;
                }
                console.log(index);
              }
            }
          },
          (err: HttpErrorResponse) => {
            this.showImageFlag = true;
          }
        );  

      });
    }
    
      // this.data.auction.uploadFiles.forEach(element => {
      //   var reader = new FileReader();
      //   reader.readAsDataURL(this.uploadFile);
      //   reader.onload = (event) => {
      //     element.croppedImage = reader.result;
      //   }
      //   console.log(this.uploadFiles);
      // });
  }
  
  checkError(form, field, error) {
    return this.formValidationService.checkError(form, field, error);
  }

  addPicture(data) {

    console.log(data);
    console.log(this.uploadFiles);
    if (data) {
      this.uploadFiles[this.selecteFileIndex] = {
        originalFile: data.originalFile,
        croppedFile: data.croppedFile,
        croppedImage: data.croppedImage
      };
    }
    else{
      this.uploadFiles.splice(this.selecteFileIndex, 1);
    }
    this.selecteFileIndex = -1;
    console.log(this.uploadFiles);
  }

  addFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      // var reader = new FileReader();
      // reader.onload = () => {
        // this.uploadPicture = reader.result;
        this.uploadFiles.push({
          originalFile: event.target.files[0],
          croppedFile: event.target.files[0],
          croppedImage: ''
        });
        this.selecteFileIndex = this.uploadFiles.length - 1;
      // }
      // reader.readAsDataURL(event.target.files[0]);
    }
  }

  addAuction(){
    if (this.infoForm.valid) {
      let uploadData = new FormData();
      this.uploadFiles.forEach(element => {
        uploadData.append('files[]', element.croppedFile, element.croppedFile.name);
      });
      uploadData.append('auctionTitle', this.infoForm.value.auctionTitle);
      uploadData.append('bidblabPrice', this.infoForm.value.bidblabPrice);
      uploadData.append('retailPrice', this.infoForm.value.retailPrice);
      uploadData.append('bidFee', this.infoForm.value.bidFee);
      uploadData.append('starts', this.infoForm.value.starts);
      uploadData.append('closes', this.infoForm.value.closes);
      uploadData.append('auctionSerial', this.infoForm.value.auctionSerial);
      uploadData.append('auctionDetail', this.infoForm.value.auctionDetail);
      if(this.data.auctionId){
        uploadData.append('auctionId', this.data.auctionId);
        this.auctionService.updateAuction(uploadData).subscribe(
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
        this.auctionService.addAuction(uploadData).subscribe(
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

}


