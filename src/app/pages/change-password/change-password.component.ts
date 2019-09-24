import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { CommonService } from '../../shared/services/common.service';
import { ChangePasswordService } from './change-password.service';
import { FormValidationService } from '../../shared/services/form-validation.service';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	providers: [CommonService]
})
export class ChangePasswordComponent implements OnInit {
	public form: FormGroup;
	public settings: Settings;
	public currentPasswordHide: boolean = true;
	public passwordHide: boolean = true;
	returnUrl: string = '';

	constructor(
		public appSettings: AppSettings,
		public fb: FormBuilder,
		public router: Router,
		private authenticationService: AuthenticationService,
		private commonService: CommonService,
		private snackBar: MatSnackBar,
		private changePasswordService: ChangePasswordService,
		private formValidationService: FormValidationService,
		private route: ActivatedRoute
	) {
		this.settings = this.appSettings.settings;
		this.form = this.fb.group({
			'currentPassword': [null, Validators.compose([Validators.required])],
			'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
			'confirmPassword': [null, 
				Validators.compose([
					Validators.required, 
					Validators.minLength(6), 
					this.formValidationService.arePasswordsMismatching
				])
			]
		});
	};

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.settings.loadingSpinner = false;
	}

	public checkError(form, field, error) {
		return this.formValidationService.checkError(form, field, error);
	}

	public onSubmit(values: Object): void {
		if (this.form.valid) {
			this.changePassword();
		}
	}

	private changePassword() {
		this.changePasswordService.adminChangePassword(this.form.value).subscribe((res: any) => {
			if(res.data) {
				this.authenticationService.setToken(res.data);
				this.router.navigateByUrl('/');
			}
			this.snackBar.open(res.msg, 'Dismiss', {
				duration: 4000
			});
		});
	}

}

