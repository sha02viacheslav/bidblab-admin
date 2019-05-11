import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonService } from '../../../shared/services/common.service';
import { FormValidationService } from '../../../shared/services/form-validation.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { SitemanagerService } from '../sitemanager.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  submitted: boolean;
  infoForm: FormGroup;

  constructor(
		private commonService: CommonService,
		private auctionService: SitemanagerService,
		private snackBar: MatSnackBar,
    public fb: FormBuilder,
    private formValidationService: FormValidationService,
	) { }

  ngOnInit() {
    this.submitted = false;
    this.infoForm = this.fb.group({
      quillContent: [
        '',
      ],
    });

    this.auctionService.getAboutPageContent().subscribe(
			(res: any) => {
        console.log(res.data);
        this.infoForm.controls.quillContent.setValue(String(res.data.quillContent));
				this.snackBar.open(res.msg, 'Dismiss', {duration: 1500});
			},
			(err: HttpErrorResponse) => {
				this.snackBar.open(err.error.msg, 'Dismiss');
			}
		);
  }

  addAuction(){
    if (this.infoForm.valid) {
      this.submitted = true;
      this.auctionService.saveAbout(this.infoForm.value).subscribe(
        (res: any) => {
          this.snackBar.open(res.msg, 'Dismiss', {
            duration: 3000
          })
          .afterOpened()
          .subscribe(() => {
            this.submitted = false;
          });
        },
        (err: HttpErrorResponse) => {
          this.snackBar.open(err.error.msg, 'Dismiss', {
            duration: 1500
          });
          this.submitted = false;
        }
      );
    }
  }

}
