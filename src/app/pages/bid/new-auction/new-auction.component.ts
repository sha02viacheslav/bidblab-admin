import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonService } from '../../../shared/services/common.service';
import { FormValidationService } from '../../../shared/services/form-validation.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-new-auction',
  templateUrl: './new-auction.component.html',
  styleUrls: ['./new-auction.component.scss']
})
export class NewAuctionComponent implements OnInit {
  submitted: boolean;
  infoForm: FormGroup;
  catagories: string[];
  public form: FormGroup;
  uploadFiles: any[] = [];
  questionPictureurls: any[] = [];
  standardInterests: string[];
  formArray: FormArray;
  serverUrl: string = environment.apiUrl;
  selectedFileIndex: number = -1;

	constructor(
		private commonService: CommonService,
		private auctionService: AuctionService,
		private snackBar: MatSnackBar,
    public fb: FormBuilder,
    private formValidationService: FormValidationService,
	) { }

	ngOnInit() {
    this.submitted = false;
    this.questionPictureurls = [];
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
      auctionSerial: [
        '',
        [
          Validators.required,
          this.formValidationService.isBlank,
        ]
      ],
      auctionDetail: [
        '',
      ],
    });
    
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
      this.auctionService.addAuction(uploadData).subscribe(
        (res: any) => {
          this.snackBar.open(res.msg, 'Dismiss', {
            duration: 3000
          })
          .afterOpened()
          .subscribe(() => {
            this.ngOnInit();
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

