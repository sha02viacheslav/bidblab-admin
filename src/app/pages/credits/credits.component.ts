import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CommonService } from '../../shared/services/common.service';
import { FormValidationService } from '../../shared/services/form-validation.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { CreditsService } from './credits.service'

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {
	public form:FormGroup;

	constructor(
		private commonService: CommonService,
		private creditsService: CreditsService,
		private snackBar: MatSnackBar,
		public fb: FormBuilder,
	) { }

	ngOnInit() {
		this.form = this.fb.group({
			_id: null,
			defaultQuestionCredit: [ null, Validators.compose([Validators.required]) ],
			defaultPublicAnswerCredit: [ null, Validators.compose([Validators.required]) ],
			defaultPrivateAnswerCredit: [ null, Validators.compose([Validators.required]) ],
			defaultOptionalImageCredit: [ null, Validators.compose([Validators.required]) ],
			defaultReferralCredit: [ null, Validators.compose([Validators.required]) ],
			defaultSignupCredit: [ null, Validators.compose([Validators.required]) ],
		});
		this.commonService.getDefaultCredits().subscribe(
			(res: any) => {
				this.form.controls._id.setValue(res.data._id);
				this.form.controls.defaultQuestionCredit.setValue(String(res.data.defaultQuestionCredit));
				this.form.controls.defaultPublicAnswerCredit.setValue(String(res.data.defaultPublicAnswerCredit));
				this.form.controls.defaultPrivateAnswerCredit.setValue(String(res.data.defaultPrivateAnswerCredit));
				this.form.controls.defaultOptionalImageCredit.setValue(String(res.data.defaultOptionalImageCredit));
				this.form.controls.defaultReferralCredit.setValue(String(res.data.defaultReferralCredit));
				this.form.controls.defaultSignupCredit.setValue(String(res.data.defaultSignupCredit));
				this.snackBar.open(res.msg, 'Dismiss', {duration: 1500});
			},
			(err: HttpErrorResponse) => {
				this.snackBar.open(err.error.msg, 'Dismiss');
			}
		);
	}

	changeCredits(){
		this.creditsService.changeDefaultCredits(this.form.value).subscribe(
			(res: any) => {
				this.snackBar.open(res.msg, 'Dismiss', {duration: 1500});
			},
			(err: HttpErrorResponse) => {
				this.snackBar.open(err.error.msg, 'Dismiss');
			}
		);
	}
}
