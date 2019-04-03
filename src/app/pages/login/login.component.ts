import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import * as jwtDecode from 'jwt-decode';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { CommonService } from '../../shared/services/common.service';

import { emailValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [ CommonService ] 
})
export class LoginComponent implements OnInit{
  public form:FormGroup;
  public settings: Settings;
  returnUrl: string = '';

  constructor(
    public appSettings:AppSettings,
    public fb: FormBuilder,
    public router:Router,
    private authenticationService: AuthenticationService,
    private commonService: CommonService,
    private route: ActivatedRoute
  ){
    this.settings = this.appSettings.settings; 
    this.form = this.fb.group({
      'username': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])] 
    });
  };

  ngOnInit(){
    this.route.queryParams
      .subscribe(params => this.returnUrl = params['returnUrl'] || '/');
  }

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      this.adminLogin();
    }
  }

  ngAfterViewInit(){
    this.settings.loadingSpinner = false; 
  }


  private adminLogin() {
    this.commonService.adminLogin(this.form.value).subscribe(
      (res: any) => {
        this.authenticationService.setToken(res.data);
        this.authenticationService.setUser(jwtDecode(res.data).user);
        localStorage.setItem('jwt', res.data);
        localStorage.setItem(
          'user',
          JSON.stringify(this.authenticationService.getUser())
        );
        this.router.navigateByUrl(this.returnUrl);
      },
      (err: HttpErrorResponse) => {
        // this.blockUIService.setBlockStatus(false);
        // this.snackBar
        //   .open(err.error.msg, 'Dismiss', {
        //     duration: 4000
        //   })
        //   .afterDismissed()
        //   .subscribe(() => {});
      }
    );
  }

}

