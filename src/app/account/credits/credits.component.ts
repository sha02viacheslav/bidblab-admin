import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from '../../shared/models/question.model';
import { AnswerDialogComponent } from '../../shared/components/answer-dialog/answer-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../shared/services/dialog.service';
import { CommonService } from '../../shared/services/common.service';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { BlockUIService } from '../../shared/services/block-ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from '../../shared/models/answer.model';
import { QuestionDialogComponent } from '../../shared/components/question-dialog/question-dialog.component';
import { SocketsService } from '../../shared/services/sockets.service';
import { Subscription } from 'rxjs';
import { LoginComponent } from '../../shared/components/login/login.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { AlertDialogComponent } from '../../shared/components/alert-dialog/alert-dialog.component';
@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {

  private question_credits: number;
  private answer_credits: number;
  private referal_credits: number;
  private total_credits: number;
  isInit: boolean;

  constructor(
    private blockUIService: BlockUIService,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.isInit = false;
    this.isAuthenticated();
  }
  initialize(){
    this.isInit = true;
    this.question_credits = 0;
    this.answer_credits = 0;
    this.referal_credits = 0;
    this.total_credits = this.question_credits + this.answer_credits + this.referal_credits;
    this.blockUIService.setBlockStatus(false);
    const observable = this.commonService.getMyCredits();
    observable.subscribe(
      (res: any) => {
        this.question_credits = res.data.question_credits;
        this.answer_credits = res.data.answer_credits;
        this.referal_credits = res.data.referal_credits;
        this.total_credits = this.question_credits + this.answer_credits + this.referal_credits;
        this.blockUIService.setBlockStatus(false);
        this.snackBar.open(res.msg, 'Dismiss', {
          duration: 1500
        });
      },
      (err: HttpErrorResponse) => {
        this.blockUIService.setBlockStatus(false);
        this.snackBar.open(err.error.msg, 'Dismiss', {
          duration: 1500
        });
      }
    );
  }
  isAuthenticated() {
    if(this.authenticationService.isAuthenticated()){
      this.initialize();
    }
    else{
      setTimeout(() => this.dialogService.open(LoginComponent)
        .afterClosed()
        .subscribe(result => {
          if(result == 'OK'){
            this.initialize();
          }
          else{
            this.commonService.goHome();
          }
        })
      );
    }
  }
}
