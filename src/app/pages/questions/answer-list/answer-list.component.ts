import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { Question, Answer } from '../../../shared/models/question.model';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatOption } from '@angular/material';
import { FormBuilder, FormGroup, EmailValidator, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { CommonService } from '../../../shared/services/common.service';
  
@Component({
	selector: 'app-answer-list',
	templateUrl: './answer-list.component.html',
	styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {
    public displayedColumns: string[] = ['select', 'index', 'content', 'tag', 'credit', 'createdAt',
                                        'details', 'update', 'suspend', 'delete'];
    public dataSource:any;
    public selection = new SelectionModel<any>(true, []);
    private totalAnswers: number;
    private pageSize: number;
    private pageIndex: number;
    private search: string = '';
    private sortParam = {
		active: 'name',
		direction: 'asc',
    };
    infoForm: FormGroup;
    newQuestionFlag: boolean;
    tagsOfAnswerForm: FormGroup;
	answerTags: string[];
	@ViewChild('allAnswerTagsSelected') private allAnswerTagsSelected: MatOption;
    constructor(
		private router: Router, 
		private fb: FormBuilder,
		public dialog: MatDialog,
		private commonService: CommonService,
		private authenticationService: AuthenticationService,
    ) { }
  
    ngOnInit() {
		this.tagsOfAnswerForm = this.fb.group({
			tagsOfAnswer: new FormControl('')
		}); 
      	this.getAnswers();
    }
  
    public openQuestionDialog(newTitle?: String, question?: Question) {
		this.dialog.open(AddQuestionComponent, {
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
				const index = this.dataSource.data.findIndex(
					currentQuestion => currentQuestion._id === question._id
				);
				if (index !== -1) {
					this.dataSource.data[index] = newQuestion;
				}
				} else {
				this.dataSource.data.push(newQuestion);
				// this.dialogService.
				//   open(AlertDialogComponent, {
				//     data: {
				//       title: "Question submitted",
				//       comment: " ",
				//       dialog_type: "ask" 
				//     },
				//     width: '320px',
				//   }).afterClosed().subscribe(result => {
				//     if(result == 'more'){
				//       this.openQuestionDialog();
				//     }
				//   });
				}
				this.getAnswers();
			}
		});
    }
  
    searchBoxAction(){
		if(this.newQuestionFlag){
			this.newQuestionFlag = false;
			this.openQuestionDialog(this.infoForm.value.search);
		}
		else{
			this.getAnswers();
		}
	}
	
    getAnswers(event?) {
		if (this.authenticationService.isAdmin()){
		if (event) {
			this.pageSize = event.pageSize;
			this.pageIndex = event.pageIndex;
		}
		this.commonService.getAnswers(
			this.pageSize,
			this.pageIndex,
			this.search,
			this.tagsOfAnswerForm.value.tagsOfAnswer,
			this.sortParam.active,
			this.sortParam.direction,
		).subscribe(
			(res: any) => {
			this.totalAnswers = res.data.totalAnswers;
			this.dataSource = new MatTableDataSource<any>(res.data.answers);
			this.answerTags = res.data.answerTags;
			this.selection.clear();
			if(this.totalAnswers <= this.pageSize * this.pageIndex){
				this.pageIndex = 0;
			}
			if(!this.totalAnswers){
				//this.newQuestionFlag = true;
			}
			else{
				//this.newQuestionFlag = false;
			}
			},
			(err: HttpErrorResponse) => {
			}
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
			this.dataSource.data.forEach(row => this.selection.select(row));
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
		if (this.allAnswerTagsSelected.selected) {
			this.tagsOfAnswerForm.controls.tagsOfAnswer
				.patchValue([...this.answerTags.map(item => item), 0]);
		} 
		else {
			this.tagsOfAnswerForm.controls.tagsOfAnswer.patchValue([]);
		}
	}
  
    public customSort(event){
		this.sortParam = event;
		this.getAnswers();
	}

    applySearch(searchValue: string) {
		this.search = searchValue.trim().toLowerCase();
		this.getAnswers();
    }

	changeAnswerTag(){
		this.getAnswers();
	}
  
    public deleteQuestions(){
		var questionIds = [];
		this.dataSource.data.forEach( (row, index) => {
			if(this.selection.selected.some( selected => selected.index == row.index )){
			questionIds.push(row._id);
			}
		});
		this.finalDeleteQuestions(questionIds);
    }
  
    public deleteQuestion(event, questionId){
		event.stopPropagation();
		var questionIds = [];
		questionIds.push(questionId);
		this.finalDeleteQuestions(questionIds);
    }
  
    public finalDeleteQuestions(questionIds) {
		if(questionIds.length){
			if(confirm("Are you sure to delete "+name)){
			// this.blockUIService.setBlockStatus(true);
			this.commonService.deleteQuestions(questionIds)
			.subscribe(
				(res: any) => {
				// this.snackBar.open(res.data.totalDeleteQuestions+" of "+questionIds.length+" questions are deleted.", 
				// 'Dismiss', 
				// {duration: 1500});
				this.getAnswers();
				// this.blockUIService.setBlockStatus(false);
				},
				(err: HttpErrorResponse) => {
				// this.snackBar.open(err.error.msg, 'Dismiss');
				// this.blockUIService.setBlockStatus(false);
				}
			);
			}
		}
		else{
			alert("Select the questions");
		}
    }
    public suspendQuestions(){
		var questionIds = [];
		this.dataSource.data.forEach( (row) => {
			if(this.selection.selected.some( selected => selected.index == row.index )){
			questionIds.push(row._id);
			}
		});
		this.finalSuspendQuestions(questionIds, 'suspend');
    }
  
    public suspendQuestion(event, questionId, roleType){
		event.stopPropagation();
		var questionIds = [];
		questionIds.push(questionId);
		this.finalSuspendQuestions(questionIds, roleType);
    }
  
    public finalSuspendQuestions(questionIds, roleType) {
		if(questionIds.length){
			if(confirm("Are you sure to " + roleType + "?")){
			// this.blockUIService.setBlockStatus(true);
			this.commonService.changeQuestionsRole(questionIds, roleType)
			.subscribe(
				(res: any) => {
				// this.snackBar.open(res.data.totalSuspendQuestions+" of "+questionIds.length+" questions are suspended.", 
				//   'Dismiss', 
				//   {duration: 1500});
				this.getAnswers();
				// this.blockUIService.setBlockStatus(false);
				},
				(err: HttpErrorResponse) => {
				// this.snackBar.open(err.error.msg, 'Dismiss');
				// this.blockUIService.setBlockStatus(false);
				}
			);
			}
		}
		else{
			alert("Select the questions");
		}
    }
  
}
  