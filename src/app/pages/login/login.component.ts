import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { CommonService } from '../../shared/services/common.service';
import { LoginService } from './login.service';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	providers: [CommonService]
})
export class LoginComponent implements OnInit {
	public form: FormGroup;
	public settings: Settings;
	public passwordHide: boolean = true;
	returnUrl: string = '';

	constructor(
		public appSettings: AppSettings,
		public fb: FormBuilder,
		public router: Router,
		private authenticationService: AuthenticationService,
		private commonService: CommonService,
		private snackBar: MatSnackBar,
		private loginService: LoginService,
		private route: ActivatedRoute
	) {
		this.settings = this.appSettings.settings;
		this.form = this.fb.group({
			'username': [null, Validators.compose([Validators.required])],
			'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
		});
	};

	ngOnInit() {
		this.route.queryParams.subscribe(params => this.returnUrl = params['returnUrl'] || '/');
	}

	ngAfterViewInit() {
		this.settings.loadingSpinner = false;
	}

	public onSubmit(values: Object): void {
		if (this.form.valid) {
			this.adminLogin();
		}
	}

	private adminLogin() {
		this.loginService.adminLogin(this.form.value).subscribe((res: any) => {
			this.authenticationService.setToken(res.data);
			this.router.navigateByUrl(this.returnUrl);
		}, (err: HttpErrorResponse) => {
			this.snackBar.open(err.error.msg, 'Dismiss', {
				duration: 4000
			});
		});
	}

}

