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
import { AuctionDialogComponent } from '../auction-dialog/auction-dialog.component';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../shared/services/common.service';
import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-closed-auctions',
  templateUrl: './closed-auctions.component.html',
  styleUrls: ['./closed-auctions.component.scss'],
	animations: [
    trigger('detailExpand', [
		state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
		state('expanded', style({height: '*'})),
		transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ], 
})

export class ClosedAuctionsComponent implements OnInit {
	public displayedColumns: string[] = ['select', 'index', 'auctionSerial', 'auctionTitle', 'bidblabPrice', 
																			'retailPrice', 'bidFee', 'maxBid',
																			'starts', 'closes', 'createdAt',
										                  'suspend', 'menu'];
	public dataSource:any;
	public selection = new SelectionModel<any>(true, []);
	private totalAuctions: number;
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
		private auctionService: AuctionService,
		private authenticationService: AuthenticationService,
	) { }

	ngOnInit() {
		this.tagsOfQuestionForm = this.fb.group({
			tagsOfQuestion: new FormControl('')
		}); 
		this.getClosedAuctions();
	}

	public openAuctionDialog(auction?: any, auctionId?: any) {
		this.dialog.open(
			AuctionDialogComponent, 
			{
				data: {
					auction,
					auctionId
				},
				width: '800px'	
			}
		).afterClosed()
		.subscribe(newAuction => {
			if (newAuction) {
				this.getClosedAuctions();
			}
		});
	}

	searchBoxAction(){
		if(this.newQuestionFlag){
			this.newQuestionFlag = false;
			this.openAuctionDialog(this.infoForm.value.search);
		}
		else{
			this.getClosedAuctions();
		}
  }
  
	getClosedAuctions(event?) {
		if (this.authenticationService.isAdmin()){
			if (event) {
				this.pageSize = event.pageSize;
				this.pageIndex = event.pageIndex;
			}
			this.auctionService.getClosedAuctions(
				this.pageSize,
				this.pageIndex,
				this.search,
				this.auctionService.auctionRole.closed,
				this.sortParam.active,
				this.sortParam.direction,
			).subscribe(
				(res: any) => {
					this.totalAuctions = res.data.totalAuctions;
					this.dataSource = new MatTableDataSource<any>(res.data.auctions);
					this.questionTags = res.data.questionTags;
					this.selection.clear();
					if(this.totalAuctions <= this.pageSize * this.pageIndex){
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
		this.getClosedAuctions();
	}

	applySearch(searchValue: string) {
		this.search = searchValue.trim().toLowerCase();
		this.getClosedAuctions();
	}

	changeQuestionTag(){
		this.getClosedAuctions();
	}

	public deleteAuctions(){
		var auctionIds = [];
		this.dataSource.data.forEach( (row, index) => {
			if(this.selection.selected.some( selected => selected.index == row.index )){
				auctionIds.push(row._id);
			}
		});
		this.finalDeleteAuctions(auctionIds);
	}

	public deleteAuction(event, auctionId){
		event.stopPropagation();
		var auctionIds = [];
		auctionIds.push(auctionId);
		this.finalDeleteAuctions(auctionIds);
	}

	public finalDeleteAuctions(auctionIds) {
		if(auctionIds.length){
			if(confirm("Are you sure to delete "+name)){
				this.auctionService.deleteAuctions(auctionIds)
					.subscribe(
					(res: any) => {
						this.getClosedAuctions();
					},
					(err: HttpErrorResponse) => {
					}
					);
			}
		}
		else{
			alert("Select the questions");
		}
	}
	
	public suspendAuctions(){
		var auctionIds = [];
		this.dataSource.data.forEach( (row) => {
			if(this.selection.selected.some( selected => selected.index == row.index )){
				auctionIds.push(row._id);
			}
		});
		this.finalSuspendAuctions(auctionIds, 'suspend');
	}

	public suspendAuction(event, auctionId, roleType){
		event.stopPropagation();
		var auctionIds = [];
		auctionIds.push(auctionId);
		this.finalSuspendAuctions(auctionIds, roleType);
	}

	public finalSuspendAuctions(auctionIds, roleType) {
		if(auctionIds.length){
			if(confirm("Are you sure to " + roleType + "?")){
				// this.blockUIService.setBlockStatus(true);
				this.auctionService.changeAuctionsRole(auctionIds, roleType)
					.subscribe(
					(res: any) => {
						// this.snackBar.open(res.data.totalSuspendQuestions+" of "+auctionIds.length+" questions are suspended.", 
						//   'Dismiss', 
						//   {duration: 1500});
						this.getClosedAuctions();
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
			alert("Select the auctions");
		}
  }
  
  cloneAuction(event, auction){
		event.stopPropagation();
    this.openAuctionDialog(auction);
    this.getClosedAuctions();
  }

}


