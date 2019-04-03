import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { User } from '../../../shared/models/user.model';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, EmailValidator } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonDataService } from '../../../shared/services/common-data.service';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../shared/services/common.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
	animations: [
    trigger('detailExpand', [
		state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
		state('expanded', style({height: '*'})),
		transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],  
})
export class ListComponent implements OnInit {
  	public displayedColumns: string[] = ['select', 'index', 'name', 'gender',
                                        'username', 'email', 'credit', 'createdAt',
                                        'role', 'menu'];
  // public displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
	public dataSource:any;
	public selection = new SelectionModel<any>(true, []);
	private totalMembers: number;
	private pageSize: number;
	private pageIndex: number;
	private search: string = '';
	private sortParam = {
		active: 'name',
		direction: 'asc',
	};
	infoForm: FormGroup;
	serverUrl = environment.apiUrl;

  	constructor(
		public router:Router,
		private commonDataService:CommonDataService, 
		private commonService: CommonService,
		private snackBar: MatSnackBar,
		public dialog: MatDialog
	) {}

	ngOnInit() {
		this.getUsers();
	}

	public getUsers(event?): void {
		if (event) {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		}

		this.commonService.getUsers(
			this.pageSize,
			this.pageIndex,
			this.search,
			this.sortParam.active,
			this.sortParam.direction,
			).subscribe(
			(res: any) => {
				this.totalMembers = res.data.totalMembers;
				this.dataSource = new MatTableDataSource<any>(res.data.members);
				this.selection.clear();
				if(this.totalMembers <= this.pageSize * this.pageIndex){
				this.pageIndex = 0;
				}
			},
			(err: HttpErrorResponse) => {
				//this.snackBar.open(err.error.msg, 'Dismiss');
			}
		); 
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

	public customSort(event){
		this.sortParam = event;
		this.getUsers();
	}

	applySearch(searchValue: string) {
		this.search = searchValue.trim().toLowerCase();
		this.getUsers();
	}

	public openSendMessageBox(event){
		event.stopPropagation();
		const email = event.target.innerText;
		this.commonDataService.toEmail = email;
		this.router.navigateByUrl(`/mailbox`);
		// this.dialogService
		// .open(MessageBoxComponent, {
		//   data: {
		//     email,
		//   },
		//   width: '600px'
		// }) 
	}
	public sendMessage(event, toEmail){
		event.stopPropagation();
		var toEmails = [];
		toEmails.push(toEmail);
		//console.log(memberIds);
		this.finalSendMessages(toEmails);
	}
	public sendMessages(){
		var toEmails = [];
		this.dataSource.data.forEach( (row, index) => {
		if(this.selection.selected.some( selected => selected.index == row.index )){
			///console.log("i", index);
			toEmails.push(row.email);
		}
		});
		this.finalSendMessages(toEmails);
		//console.log(email);
		// if(email.length){
		//   this.dialogService
		//   .open(MessageBoxComponent, {
		//     data: {
		//       email,
		//     },
		//     width: '600px'
		//   }) 
		// }
		// else{
		//   alert("You must select the members");
		// }
	}

	public finalSendMessages(toEmails) {
		// console.log(toEmails);
		if(toEmails.length){
		if(confirm("Are you sure to send message?")){
			// this.blockUIService.setBlockStatus(true);
			this.commonDataService.toEmail = toEmails;
			this.commonDataService.requestSendEmail = true;
			this.router.navigateByUrl(`/mailbox`);
		}
		}
		else{
		alert("Select the members");
		}
	}

	public deleteMembers(){
		var memberIds = [];
		this.dataSource.data.forEach( (row, index) => {
		if(this.selection.selected.some( selected => selected.index == row.index )){
			///console.log("i", index);
			memberIds.push(row._id);
		}
		});
		//console.log(memberIds);
		this.finalDeleteMembers(memberIds);
	}

	public deleteMember(event, memberId){
		event.stopPropagation();
		var memberIds = [];
		memberIds.push(memberId);
		//console.log(memberIds);
		this.finalDeleteMembers(memberIds);
	}

	public finalDeleteMembers(memberIds) {
		if(memberIds.length){
			if(confirm("Are you sure to delete "+name)){
				// this.blockUIService.setBlockStatus(true);
				this.commonService.deleteUsers(memberIds)
				.subscribe(
				(res: any) => {
					// this.snackBar.open(res.data.totalDeleteMembers+" of "+memberIds.length+" members are deleted.", 
					// 'Dismiss', 
					// {duration: 1500});
					this.getUsers();
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
		alert("Select the members");
		}
	}

	public suspendMembers(){
		var memberIds = [];
		this.dataSource.data.forEach( (row, index) => {
		if(this.selection.selected.some( selected => selected.index == row.index )){
			///console.log("i", index);
			memberIds.push(row._id);
		}
		});
		//console.log(memberIds);
		this.finalSuspendMembers(memberIds, 'suspend');
	}

	public suspendMember(event, memberId, roleType){
		event.stopPropagation();
		var memberIds = [];
		memberIds.push(memberId);
		//console.log(memberIds);
		this.finalSuspendMembers(memberIds, roleType);
	}

	public finalSuspendMembers(memberIds, roleType) {
		//console.log(memberIds);
		if(memberIds.length){
		if(confirm("Are you sure to " + roleType + "?")){
			//this.blockUIService.setBlockStatus(true);
			this.commonService.changeUsersRole(memberIds, roleType)
			.subscribe(
			(res: any) => {
				// this.snackBar.open(res.data.totalSuspendMembers+" of "+memberIds.length+" members are suspended.", 
				//   'Dismiss', 
				//   {duration: 1500});
				// console.log(res.data);
				this.getUsers();
				//this.blockUIService.setBlockStatus(false);
			},
			(err: HttpErrorResponse) => {
				//this.snackBar.open(err.error.msg, 'Dismiss');
				//this.blockUIService.setBlockStatus(false);
			}
			);
		}
		}
		else{
		alert("Select the members");
		}
	}

	public openUserDialog(user){
		this.dialog.open(UserDialogComponent, {
			data: user
		}).afterClosed().subscribe(updatedUser => {
			if(updatedUser){
				if(user){
					this.commonService.updateUser(user._id, updatedUser)
						.subscribe(
							(res: any) => {
							this.snackBar.open(res.msg, 'Dismiss', {duration: 1500});
							this.getUsers();
							},
							(err: HttpErrorResponse) => {
								this.snackBar.open(err.error.msg, 'Dismiss');
							}
						);
				} 
				else {
					this.commonService.createUser(updatedUser)
						.subscribe(
							(res: any) => {
							this.snackBar.open(res.msg, 'Dismiss', {duration: 1500});
							this.getUsers();
							},
							(err: HttpErrorResponse) => {
								this.snackBar.open(err.error.msg, 'Dismiss');
							}
						);
				}
			}
		});
	}
}
