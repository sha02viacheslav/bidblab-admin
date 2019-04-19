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
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../shared/services/common.service';

@Component({
	selector: 'app-flag-list',
  templateUrl: './flag-list.component.html',
  styleUrls: ['./flag-list.component.scss'],
	animations: [
    trigger('detailExpand', [
		state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
		state('expanded', style({height: '*'})),
		transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ], 
})
export class FlagListComponent implements OnInit {
	public displayedColumns: string[] = ['select', 'index', 'type', 'note', 'createdAt',
										'suspend', 'menu'];
	public dataSource:any;
	public selection = new SelectionModel<any>(true, []);
	private totalFlags: number;
	private pageSize: number;
	private pageIndex: number;
	private search: string = '';
	private sortParam = {
		active: 'name',
		direction: 'asc',
	};
	infoForm: FormGroup;
	serverUrl = environment.apiUrl;
	newQuestionFlag: boolean;
	tagsOfQuestionForm: FormGroup;
	questionTags: string[];
	@ViewChild('allQuestionTagsSelected') private allQuestionTagsSelected: MatOption;
	constructor(
		private router: Router, 
		private fb: FormBuilder,
		public dialog: MatDialog,
		private commonService: CommonService,
		private authenticationService: AuthenticationService,
	) { }

	ngOnInit() {
		this.tagsOfQuestionForm = this.fb.group({
			tagsOfQuestion: new FormControl('')
		}); 
		this.getFlags();
	}

	searchBoxAction(){
		this.getFlags();
	}
	getFlags(event?) {
		if (this.authenticationService.isAdmin()){
			if (event) {
				this.pageSize = event.pageSize;
				this.pageIndex = event.pageIndex;
			}
			this.commonService.getFlags(
				this.pageSize,
				this.pageIndex,
				this.search,
				this.tagsOfQuestionForm.value.tagsOfQuestion,
				this.sortParam.active,
				this.sortParam.direction,
			).subscribe(
				(res: any) => {
          console.log(res);
					this.totalFlags = res.data.totalFlags;
					this.dataSource = new MatTableDataSource<any>(res.data.flags);
					this.selection.clear();
					if(this.totalFlags <= this.pageSize * this.pageIndex){
					this.pageIndex = 0;
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
		this.getFlags();
	}

	applySearch(searchValue: string) {
		this.search = searchValue.trim().toLowerCase();
		this.getFlags();
	}

	changeQuestionTag(){
		this.getFlags();
	}

	public deleteFlags(){
		var flagIds = [];
		this.dataSource.data.forEach( (row, index) => {
			if(this.selection.selected.some( selected => selected.index == row.index )){
				flagIds.push(row._id);
			}
		});
		this.finalDeleteQuestions(flagIds);
	}

	public deleteFlag(event, flagId){
		event.stopPropagation();
		var flagIds = [];
		flagIds.push(flagId);
		//console.log(flagIds);
		this.finalDeleteQuestions(flagIds);
	}

	public finalDeleteQuestions(flagIds) {
		if(flagIds.length){
			if(confirm("Are you sure to delete "+name)){
				// this.blockUIService.setBlockStatus(true);
				this.commonService.deleteFlags(flagIds)
					.subscribe(
					(res: any) => {
						// this.snackBar.open(res.data.totalDeleteQuestions+" of "+flagIds.length+" questions are deleted.", 
						// 'Dismiss', 
						// {duration: 1500});
						this.getFlags();
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
			alert("Select the flags");
		}
	}
	
	public suspendFlags(){
		var flagIds = [];
		this.dataSource.data.forEach( (row) => {
			if(this.selection.selected.some( selected => selected.index == row.index )){
				///console.log("i", index);
				flagIds.push(row._id);
			}
		});
		//console.log(flagIds);
		this.finalSuspendFlags(flagIds, 'suspend');
	}

	public suspendFlag(event, flagId, roleType){
		event.stopPropagation();
		var flagIds = [];
		flagIds.push(flagId);
		//console.log(flagIds);
		this.finalSuspendFlags(flagIds, roleType);
	}

	public finalSuspendFlags(flagIds, roleType) {
		//console.log(flagIds);
		if(flagIds.length){
			if(confirm("Are you sure to " + roleType + "?")){
				// this.blockUIService.setBlockStatus(true);
				this.commonService.changeFlagsRole(flagIds, roleType)
					.subscribe(
					(res: any) => {
						// this.snackBar.open(res.data.totalSuspendQuestions+" of "+flagIds.length+" questions are suspended.", 
						//   'Dismiss', 
						//   {duration: 1500});
						// console.log(res.data);
						this.getFlags();
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
			alert("Select the flags");
		}
	}

}

