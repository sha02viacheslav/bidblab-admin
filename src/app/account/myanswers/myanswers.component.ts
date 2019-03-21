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
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-myanswers',
  templateUrl: './myanswers.component.html',
  styleUrls: ['./myanswers.component.scss']
})
export class MyanswersComponent implements OnInit {

  private totalQuestionsCount: number;
  private questionsWithYourAnswers: Question[];
  isInit: boolean;
  serverUrl = environment.apiUrl;

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
    this.blockUIService.setBlockStatus(false);
    const observable = this.commonService.getQuestionsWithYourAnswers();
    observable.subscribe(
      (res: any) => {
        this.totalQuestionsCount = res.data.count;
        this.questionsWithYourAnswers = res.data.questionsWithYourAnswers;
        this.sortQuestionsByMyAnswerCredit(this.questionsWithYourAnswers);
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

  sortQuestionsByMyAnswerCredit(questions){
    questions.sort((a: any, b: any) => {
      const temp1 = a.answers[0].credit ;
      const temp2 = b.answers[0].credit ;
      if ( temp1 < temp2 ) {
        return 1;
      } else if ( temp1 > temp2 ) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  isMediaActive(breakpoint) {
    return this.media.isActive(breakpoint);
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
