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
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-myquestions',
  templateUrl: './myquestions.component.html',
  styleUrls: ['./myquestions.component.scss']
})
export class MyquestionsComponent implements OnInit {

  private mytotalQuestionsCount: number;
  private myquestions: Question[] = [];
  isInit: boolean;

  constructor(
    private blockUIService: BlockUIService,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private dialogService: DialogService,
    private media: ObservableMedia,
  ) {}

  ngOnInit() {
    this.isInit = false;
    this.isAuthenticated();
  }
  initialize(){
    this.isInit = true;
    this.mytotalQuestionsCount = 0;
    this.blockUIService.setBlockStatus(true);
    const observable = this.commonService.getQuestionsByAskerId();
    observable.subscribe(
      (res: any) => {
        this.mytotalQuestionsCount = res.data.count;
        this.myquestions = res.data.questions;
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

  isMediaActive(breakpoint) {
    return this.media.isActive(breakpoint);
  }

  isAuthenticated() {
    if(this.authenticationService.isAdmin()){
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