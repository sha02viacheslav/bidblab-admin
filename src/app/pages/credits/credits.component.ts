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
		});
		this.creditsService.getDefaultCredits().subscribe(
			(res: any) => {
				this.form.controls._id.setValue(res.data._id);
				this.form.controls.defaultQuestionCredit.setValue(res.data.defaultQuestionCredit);
				this.form.controls.defaultPublicAnswerCredit.setValue(res.data.defaultPublicAnswerCredit);
				this.form.controls.defaultPrivateAnswerCredit.setValue(res.data.defaultPrivateAnswerCredit);
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
