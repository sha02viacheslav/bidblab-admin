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
	selector: 'app-question-list',
	templateUrl: './question-list.component.html',
	styleUrls: ['./question-list.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
			state('expanded', style({height: '*'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	], 
})
export class QuestionListComponent implements OnInit {
	public displayedColumns: string[] = ['select', 'index', 'title', 'tags', 'priority', 'credit', 'answerCredit', 'createdAt',
										'suspend', 'menu'];
	public dataSource:any;
	public selection = new SelectionModel<any>(true, []);
	public totalQuestions: number;
	public pageIndex: number;
	public infoForm: FormGroup;
	public serverUrl = environment.apiUrl;
	public newQuestionFlag: boolean;
	public tagsOfQuestionForm: FormGroup;
	public questionTags: string[];
	private pageSize: number;
	private search: string = '';
	private sortParam = {
		active: 'name',
		direction: 'asc',
	};
	@ViewChild('allQuestionTagsSelected') private allQuestionTagsSelected: MatOption;
	constructor(
		private router: Router, 
		private fb: FormBuilder,
		public dialog: MatDialog,
		private commonService: CommonService,
    	private questionsService: QuestionsService,
		private authenticationService: AuthenticationService,
	) { }

	ngOnInit() {
		this.tagsOfQuestionForm = this.fb.group({
			tagsOfQuestion: new FormControl('')
		}); 

		this.commonService.getStandardInterests().subscribe((res: any) => {
			if(res.data) {
				this.questionTags = res.data;
			}
		});

		this.getQuestions();
	}

	public openQuestionDialog(newTitle?: String, question?: Question) {
		this.dialog.open(
			AddQuestionComponent, 
			{
				data: {
					question,
					newTitle,
				},
				width: '800px'	
			}
		).afterClosed()
		.subscribe(newQuestion => {
			if (newQuestion) {
				this.getQuestions();
			}
		});
	}

	searchBoxAction(){
		if(this.newQuestionFlag) {
			this.newQuestionFlag = false;
			this.openQuestionDialog(this.infoForm.value.search);
		} else {
			this.getQuestions();
		}
	}

	getQuestions(event?) {
		if (this.authenticationService.isAdmin()){
			if (event) {
				this.pageSize = event.pageSize;
				this.pageIndex = event.pageIndex;
			}
			this.questionsService.getQuestions(
				this.pageSize,
				this.pageIndex,
				this.search,
				this.tagsOfQuestionForm.value.tagsOfQuestion,
				this.sortParam.active,
				this.sortParam.direction,
			).subscribe((res: any) => {
				this.totalQuestions = res.data.totalQuestions;
				this.dataSource = new MatTableDataSource<any>(res.data.questions);
				this.selection.clear();
				if(this.totalQuestions <= this.pageSize * this.pageIndex){
					this.pageIndex = 0;
				}
				if(!this.totalQuestions){
				//this.newQuestionFlag = true;
				}
				else{
				//this.newQuestionFlag = false;
				}
			});
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

	public customSort(event){
		this.sortParam = event;
		this.getQuestions();
	}

	applySearch(searchValue: string) {
		this.search = searchValue.trim().toLowerCase();
		this.getQuestions();
	}

	changeQuestionTag(){
		this.getQuestions();
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
				this.questionsService.deleteQuestions(questionIds)
					.subscribe(
					(res: any) => {
						// this.snackBar.open(res.data.totalDeleteQuestions+" of "+questionIds.length+" questions are deleted.", 
						// 'Dismiss', 
						// {duration: 1500});
						this.getQuestions();
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
						this.getQuestions();
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
