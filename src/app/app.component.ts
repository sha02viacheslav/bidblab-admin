import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subscription } from 'rxjs';
import { BlockUIService } from './shared/services/block-ui.service';
import { SwUpdate } from '@angular/service-worker';
import { takeWhile, filter } from 'rxjs/operators';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { CommonService } from './shared/services/common.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './shared/services/authentication.service';
import { DialogService } from './shared/services/dialog.service';
import { ResetPasswordComponent } from './shared/components/reset-password/reset-password.component';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private blockingSubscription: Subscription;
  private routerSubscription: Subscription;
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private blockUIService: BlockUIService,
    private swUpdate: SwUpdate,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private dialogService: DialogService,
    private media: ObservableMedia,
  ) {
  }

  ngOnInit() {
    this.getBlockStatus();
    this.checkForUpdates();
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => window.scrollTo(0, 0));
          
    this.checkVerificationToken();
    this.checkResetPasswordToken();
  }
  private checkVerificationToken() {
    this.route.paramMap.subscribe(params => {
      if (params.has('verificationToken')) {
        const token = params.get('verificationToken');
        this.verifyAccount(token);
      }
    });
  }

  isMediaActive(breakpoint) {
    return this.media.isActive(breakpoint);
  }

  private verifyAccount(token) {
    this.commonService.verifyAccount(token).subscribe(
      (res: any) => {
        this.snackBar.open(res.msg, 'Dismiss');
        this.router.navigateByUrl('/');
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open(err.error.msg, 'Dismiss');
        this.router.navigateByUrl('/');
      }
    );
  }

  private checkResetPasswordToken() {
    this.route.paramMap.subscribe(params => {
      if (params.has('resetPasswordToken')) {
        if (!this.authenticationService.isAdmin()) {
          const token = params.get('resetPasswordToken');
          this.commonService.checkResetPasswordToken(token).subscribe(
            (res: any) => {
              this.openResetPasswordDialog(token, res.data);
            },
            (err: HttpErrorResponse) => {
              this.snackBar.open(err.error.msg, 'Dismiss');
              this.router.navigateByUrl('/');
            }
          );
        } else {
          this.snackBar.open('You are already logged in.', 'Dismiss');
          this.router.navigateByUrl('/');
        }
      }
    });
  }

  isAuthenticated() {
    return this.authenticationService.isAdmin();
  }

  private openResetPasswordDialog(token, userId) {
    this.dialogService.open(ResetPasswordComponent, {
      data: {
        token,
        userId
      }
    });
  }

  getBlockStatus() {
    this.blockingSubscription = this.blockUIService
      .getBlockStatus()
      .subscribe(status => {
        if (status) {
          this.blockUI.start();
        } else {
          this.blockUI.stop();
        }
      });
  }

  private checkForUpdates() {
    this.swUpdate.available
      .pipe(takeWhile(() => this.swUpdate.isEnabled))
      .subscribe(() => {
        if (confirm('A new version of the app is available. Update Now?')) {
          window.location.reload();
        }
      });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
    this.blockingSubscription.unsubscribe();
  }
}
