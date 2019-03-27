import { Component, OnDestroy, OnInit, ViewChild  } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/services/common.service';
import { MatSnackBar } from '@angular/material';
import { DialogService } from '../../shared/services/dialog.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { BlockUIService } from '../../shared/services/block-ui.service';
import { Question } from '../../shared/models/question.model';
import { QuestionDialogComponent } from '../../shared/components/question-dialog/question-dialog.component';
import { LoginComponent } from '../../shared/components/login/login.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AnswerDialogComponent } from '../../shared/components/answer-dialog/answer-dialog.component';
import { Answer } from '../../shared/models/answer.model';
import { SocketsService } from '../../shared/services/sockets.service';
import { AlertDialogComponent } from '../../shared/components/alert-dialog/alert-dialog.component';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { MatPaginator, MatSort, MatTableDataSource, MatCheckbox} from '@angular/material';
import { SelectionModel} from '@angular/cdk/collections';
import { MatOption } from '@angular/material';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class QuestionsListComponent implements OnInit, OnDestroy {
  public displayedColumns = ['select', 'index', 'title', 'tag',
                            'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<number>(true, []);
  private pageSize: number;
  private pageIndex: number;
  private sortParam = {
    active: 'name',
    direction: 'asc',
  };
  infoForm: FormGroup;
  questions: Question[];
  totalQuestions: number;
  private autocompleteSubscription: Subscription;
  private socketEventsSubscription: Subscription;
  newQuestionFlag: boolean;
  isInit: boolean;
  tagsOfQuestionForm: FormGroup;
  questionTags: string[];
  @ViewChild('allQuestionTagsSelected') private allQuestionTagsSelected: MatOption;

  @ViewChild(MatSort) sort: MatSort;
 
  constructor(
    private fb: FormBuilder,
    private socketsService: SocketsService,
    private blockUIService: BlockUIService,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isInit = false;
    this.infoForm = this.fb.group({
      search: ''
    });
    this.isAdmin();  
  }

  ngOnDestroy() {
    if(this.isInit){
      this.autocompleteSubscription.unsubscribe();
      this.socketEventsSubscription.unsubscribe();
    }
  }

  initialize(){
    this.tagsOfQuestionForm = this.fb.group({
      tagsOfQuestion: new FormControl('')
    }); 
    this.newQuestionFlag = false;
    this.pageSize = 10;
    this.pageIndex = 0;
    
    this.autocompleteSubscription = this.infoForm
      .get('search')
      .valueChanges.pipe(debounceTime(300))
      .subscribe(text => {
        if (text.trim()) {
          this.getQuestions();
        } else {
          this.newQuestionFlag = false;
        }
      });
    this.getQuestions();
    this.listenToSocket();
  }

  isAdmin() {
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach( (row, index) => this.selection.select(index));
  }


  checkboxLabel(row?: number): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row + 1}`;
  }

  changeQuestionTag()
  {
    this.getQuestions();
  }

  tosslePerOneOfQuestion(all){ 
    if (this.allQuestionTagsSelected.selected) {  
      this.allQuestionTagsSelected.deselect();
      return false;
    }
    if(this.tagsOfQuestionForm.controls.tagsOfQuestion.value.length==this.questionTags.length){
      this.allQuestionTagsSelected.select();
    }
  }

  toggleAllSelectionOfQuestion() {
    if (this.allQuestionTagsSelected.selected) {
      this.tagsOfQuestionForm.controls.tagsOfQuestion
        .patchValue([...this.questionTags.map(item => item), 0]);
    } 
    else {
      this.tagsOfQuestionForm.controls.tagsOfQuestion.patchValue([]);
    }
  }

  openQuestionDialog(newTitle?: String, question?: Question) {
    if (this.authenticationService.isAdmin()) {
      this.dialogService
        .open(QuestionDialogComponent, {
          data: {
            question,
            newTitle,
          },
          width: '800px'
        })
        .afterClosed()
        .subscribe(newQuestion => {
          if (newQuestion) {
            if (question) {
              const index = this.questions.findIndex(
                currentQuestion => currentQuestion._id === question._id
              );
              if (index !== -1) {
                this.questions[index] = newQuestion;
              }
            } else {
              this.questions.push(newQuestion);
            }
            this.dialogService.
                open(AlertDialogComponent, {
                  data: {
                    title: "Question submitted",
                    comment: " ",
                    dialog_type: "ask" 
                  },
                  width: '320px',
                }).afterClosed().subscribe(result => {
                  if(result == 'more'){
                    this.openQuestionDialog();
                  }
                });
          }
        });
    } else {
      this.dialogService.open(LoginComponent);
    }
  }

  searchBoxAction(){
    if(this.newQuestionFlag){
      this.newQuestionFlag = false;
      this.openQuestionDialog(this.infoForm.value.search);
    }
    else{
      this.getQuestions();
    }
  }

  getQuestions(event?) {
    this.blockUIService.setBlockStatus(true);
    if (event) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
    }
    const observable = this.commonService.getQuestions(
      this.pageSize,
      this.pageIndex,
      this.infoForm.value.search,
      this.tagsOfQuestionForm.value.tagsOfQuestion,
      this.sortParam.active,
      this.sortParam.direction,
    );
    observable.subscribe(
      (res: any) => {
        this.totalQuestions = res.data.totalQuestions;
        this.dataSource.data = res.data.questions;
        this.questionTags = res.data.questionTags;
        this.selection.clear();
        if(this.totalQuestions <= this.pageSize * this.pageIndex){
          this.pageIndex = 0;
        }
        if(!this.totalQuestions){
          this.newQuestionFlag = true;
        }
        else{
          this.newQuestionFlag = false;
        }
        this.blockUIService.setBlockStatus(false);
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open(err.error.msg, 'Dismiss');
      }
    );
  }

  canAnswer(questionId) {
    return (
      !this.authenticationService.getUser() ||
      !this.questions
        .find(question => question._id === questionId)
        .answers.some(
          answer =>
            answer.answerer &&
            answer.answerer._id === this.authenticationService.getUser()._id
        )
    );
  }

  private listenToSocket() {
    this.socketEventsSubscription = this.socketsService
      .getSocketEvents()
      .pipe(filter((event: any) => event.payload))
      .subscribe((event: any) => {
        this.snackBar.open('Questions were updated.', 'Dismiss', {
          duration: 2000
        });
        if (event.payload.type === 'question') {
          if (event.name === 'createdData') {
            this.totalQuestions++;
            if (this.questions.length < this.pageSize) {
              this.questions.push(event.payload.data);
            }
          } else {
            const index = this.questions.findIndex(
              currentQuestion => currentQuestion._id === event.payload.data._id
            );
            if (index !== -1) {
              if (event.name === 'updatedData') {
                this.questions[index] = event.payload.data;
              } else {
                this.questions.splice(index, 1);
                this.totalQuestions--;
              }
            }
          }
        } else {
          let index = this.questions.findIndex(
            currentQuestion =>
              currentQuestion._id === event.payload.data.questionId
          );
          if (index !== -1) {
            const question = this.questions[index];
            if (event.name === 'createdData') {
              question.answers.push(event.payload.data);
            } else {
              index = question.answers.findIndex(
                currentAnswer => currentAnswer._id === event.payload.data._id
              );
              if (index !== -1) {
                if (event.name === 'updatedData') {
                  question.answers[index] = event.payload.data;
                } else {
                  question.answers.splice(index, 1);
                }
              }
            }
          }
        }
      });
  }

  public deleteQuestions(){
    var questionIds = [];
    this.dataSource.data.forEach( (row, index) => {
      if(this.selection.selected.some( selected => selected == index )){
        questionIds.push(row._id);
      }
    });
    this.finalDeleteQuestions(questionIds);
  }

  public deleteQuestion(event, questionId){
    event.stopPropagation();
    var questionIds = [];
    questionIds.push(questionId);
    //console.log(questionIds);
    this.finalDeleteQuestions(questionIds);
  }

  public finalDeleteQuestions(questionIds) {
    if(questionIds.length){
      if(confirm("Are you sure to delete "+name)){
        this.blockUIService.setBlockStatus(true);
        this.commonService.deleteQuestions(questionIds)
        .subscribe(
          (res: any) => {
            this.snackBar.open(res.data.totalDeleteQuestions+" of "+questionIds.length+" questions are deleted.", 
            'Dismiss', 
            {duration: 1500});
            this.getQuestions();
            this.blockUIService.setBlockStatus(false);
          },
          (err: HttpErrorResponse) => {
            this.snackBar.open(err.error.msg, 'Dismiss');
            this.blockUIService.setBlockStatus(false);
          }
        );
      }
    }
    else{
      alert("Select the questions");
    }
  }
  public customSort(event){
    this.sortParam = event;
    //console.log(this.sortParam);
    this.getQuestions();
  }

}
