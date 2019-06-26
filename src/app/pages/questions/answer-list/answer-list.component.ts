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
import { animate, state, style, transition, trigger} from '@angular/animations';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../shared/services/common.service';
import { QuestionsService } from '../questions.service';
  
@Component({
	selector: 'app-answer-list',
	templateUrl: './answer-list.component.html',
	styleUrls: ['./answer-list.component.scss'],
	animations: [
    trigger('detailExpand', [
		state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
		state('expanded', style({height: '*'})),
		transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class AnswerListComponent implements OnInit {
    public displayedColumns: string[] = ['select', 'index', 'content', 'tag', 'credit', 'createdAt',
                                        /*'details',*/ 'update', 'suspend', 'delete'];
    public dataSource:any;
    public selection = new SelectionModel<any>(true, []);
    public totalAnswers: number;
    private pageSize: number;
    public pageIndex: number;
    private search: string = '';
    private sortParam = {
		active: 'name',
		direction: 'asc',
    };
    infoForm: FormGroup;
    newQuestionFlag: boolean;
		serverUrl = environment.apiUrl;
    tagsOfAnswerForm: FormGroup;
	answerTags: string[];
	@ViewChild('allAnswerTagsSelected') private allAnswerTagsSelected: MatOption;
    constructor(
		private router: Router, 
		private fb: FormBuilder,
		public dialog: MatDialog,
		private commonService: CommonService,
    private questionsService: QuestionsService,
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
		this.questionsService.getAnswers(
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
  
    public deleteAnswers(){
		var elementIds = [];
		this.dataSource.data.forEach( (row, index) => {
			if(this.selection.selected.some( selected => selected.index == row.index )){
				elementIds.push({questionId: row._id, answerId: row.answers._id});
			}
		});
		this.finalDeleteAnswers(elementIds);
    }
  
    public deleteAnswer(event, questionId, answerId){
		event.stopPropagation();
		var elementIds = [];
		elementIds.push({questionId: questionId, answerId: answerId});
		this.finalDeleteAnswers(elementIds);
    }
  
    public finalDeleteAnswers(elementIds) {
		if(elementIds.length){
			if(confirm("Are you sure to delete answers")){
				// this.blockUIService.setBlockStatus(true);
				this.questionsService.deleteAnswers(elementIds).subscribe((res: any) => {
					// this.snackBar.open(res.data.totalDeleteQuestions+" of "+questionIds.length+" questions are deleted.", 
					// 'Dismiss', 
					// {duration: 1500});
					this.getAnswers();
				});
			}
		}
		else{
			alert("Select the answers");
		}
    }
    public suspendAnswers(){
		var elementIds = [];
		this.dataSource.data.forEach( (row) => {
			if(this.selection.selected.some( selected => selected.index == row.index )){
				elementIds.push({questionId: row._id, answerId: row.answers._id});
			}
		});
		this.finalSuspendQuestions(elementIds, 'suspend');
    }
  
    public suspendAnswer(event, questionId, answerId, roleType){
		event.stopPropagation();
		var elementIds = [];
		elementIds.push({questionId: questionId, answerId: answerId});
		this.finalSuspendQuestions(elementIds, roleType);
    }
  
    public finalSuspendQuestions(elementIds, roleType) {
		if(elementIds.length){
			if(confirm("Are you sure to " + roleType + "?")){
				this.questionsService.changeAnswersRole(elementIds, roleType).subscribe((res: any) => {
					this.getAnswers();
				});
			}
		}
		else{
			alert("Select the questions");
		}
    }
  
}
  