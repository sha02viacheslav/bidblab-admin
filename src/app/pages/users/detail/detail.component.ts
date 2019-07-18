import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { FormValidationService } from '../../../shared/services/form-validation.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { User } from '../../../shared/models/user.model';
import { UsersService } from '../users.service';
import { Question, Answer } from '../../../shared/models/question.model';
import { CommonService } from '../../../shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, filter } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ObservableMedia } from '@angular/flex-layout';
import { MatOption } from '@angular/material';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  user: any;
  submitted: boolean;
  passwordVisibility: boolean;
  infoForm: FormGroup;
  passwordForm: FormGroup;
  private userUpdatesSubscription: Subscription;
  selected_tag: string[];
  questions: Question[];
  answers: Answer[];
  total_questions: number;
  total_answers: number;
  answerTags: string[];
  questionTags: string[];
  followed: boolean;
  isInit: boolean;
  serverUrl = environment.apiUrl;
  @ViewChild('allAnswerTagsSelected') private allAnswerTagsSelected: MatOption;
  @ViewChild('allQuestionTagsSelected') private allQuestionTagsSelected: MatOption;
  tagsOfAnswerForm: FormGroup;
  tagsOfQuestionForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private usersService: UsersService,  
    private fb: FormBuilder,
    private formValidationService: FormValidationService,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private media: ObservableMedia, 
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isInit = false;
    this.total_answers = 0;
    this.total_questions = 0;
    this.getUserData();
    this.followed = true;
    this.selected_tag = ["alltags"];
    this.tagsOfAnswerForm = this.fb.group({
      tagsOfAnswer: new FormControl('')
    }); 
    this.tagsOfQuestionForm = this.fb.group({
      tagsOfQuestion: new FormControl('')
    }); 
  }

  ngOnDestroy() {
    if(this.isInit){
    }
  }

  private getUserData() {
    this.route.paramMap.subscribe(params => {
      if (params.has('userId')) {
        const userId = params.get('userId');
        this.getUserDataByuserId(userId);
        this.getUserAnswerByuserId(userId, null);
        this.getUserQuestionByuserId(userId, null);
      }
    });
  }

  getUserDataByuserId(userId){
    this.usersService.getUserDataByuserId(userId).subscribe(
      (res: any) => {
        this.user = res.data.user;
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open(err.error.msg, 'Dismiss');
      }
    );
  }

  getUserAnswerByuserId(userId, tagFilter){
    this.usersService.getUserAnswerByuserId(userId, tagFilter).subscribe(
      (res: any) => {
        this.answers = res.data.answers;
        this.total_answers = res.data.total_answers;
        this.answerTags = res.data.answerTags;
        this.snackBar
          .open(res.msg, 'Dismiss', {
            duration: 1500
          })
          .afterOpened()
          .subscribe(() => {
          });
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open(err.error.msg, 'Dismiss');
      }
    );
  }

  getUserQuestionByuserId(userId, tagFilter){
    this.usersService.getUserQuestionByuserId(userId, tagFilter).subscribe(
      (res: any) => {
        this.total_questions = res.data.total_questions;
        this.questions = res.data.questions;
        this.questionTags = res.data.questionTags;
        this.snackBar
          .open(res.msg, 'Dismiss', {
            duration: 1500
          })
          .afterOpened()
          .subscribe(() => {
          });
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open(err.error.msg, 'Dismiss');
      }
    );
  }


  changeAnswerTag()
  {
    this.getUserAnswerByuserId(this.user._id, this.tagsOfAnswerForm.value.tagsOfAnswer);
  }

  changeQuestionTag()
  {
    this.getUserQuestionByuserId(this.user._id, this.tagsOfQuestionForm.value.tagsOfQuestion);
  }

  tosslePerOneOfAnswer(all){ 
    if (this.allAnswerTagsSelected.selected) {  
      this.allAnswerTagsSelected.deselect();
      return false;
    }
    if(this.tagsOfAnswerForm.controls.tagsOfAnswer.value.length==this.answerTags.length){
      this.allAnswerTagsSelected.select();
    }
  }

  toggleAllSelectionOfAnswer() {
    if (this.allAnswerTagsSelected.selected && this.answerTags) {
      this.tagsOfAnswerForm.controls.tagsOfAnswer
        .patchValue([...this.answerTags.map(item => item), 0]);
    } 
    else {
      this.tagsOfAnswerForm.controls.tagsOfAnswer.patchValue([]);
    }
  }

  tosslePerOneOfQuestion(){ 
    if (this.allQuestionTagsSelected.selected) {  
      this.allQuestionTagsSelected.deselect();
      return false;
    }
    if(this.tagsOfQuestionForm.controls.tagsOfQuestion.value.length==this.questionTags.length){
      this.allQuestionTagsSelected.select();
    }
  }

  toggleAllSelectionOfQuestion() {
    if (this.allQuestionTagsSelected.selected && this.questionTags) {
      this.tagsOfQuestionForm.controls.tagsOfQuestion
        .patchValue([...this.questionTags.map(item => item), 0]);
    } 
    else {
      this.tagsOfQuestionForm.controls.tagsOfQuestion.patchValue([]);
    }
  }

}
