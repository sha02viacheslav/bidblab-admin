import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../shared/services/common.service';
import { BlockUIService } from '../../shared/services/block-ui.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../shared/services/authentication.service';
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

  verified: boolean;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private blockUIService: BlockUIService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.verified = false;

    this.blockUIService.setBlockStatus(true);
    this.route.paramMap.subscribe(params => {
      if (params.has('verificationToken')) {
        const verificationToken = params.get('verificationToken');
        this.commonService.verifyAccount(verificationToken).subscribe(
          (res: any) => {
           
            this.snackBar
              .open(res.msg, 'Dismiss', {
                duration: 1500
              })
              .afterOpened()
              .subscribe(() => {
                this.authenticationService.setToken(res.data);
                this.authenticationService.setUser(jwtDecode(res.data).user);
                localStorage.setItem('jwt', res.data);
                localStorage.setItem(
                  'user',
                  JSON.stringify(this.authenticationService.getUser())
        );
                this.blockUIService.setBlockStatus(false);
                this.commonService.goHome();
              });
          },
          (err: HttpErrorResponse) => {
            this.snackBar
              .open(err.error.msg, 'Dismiss', {
                duration: 4000
              })
              .afterDismissed()
              .subscribe(() => {
                this.blockUIService.setBlockStatus(false);
                this.commonService.goHome();
              });
          }
        );
      }
    });
  }
}
