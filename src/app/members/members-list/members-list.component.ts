

import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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
import { FormBuilder, FormGroup, EmailValidator } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AnswerDialogComponent } from '../../shared/components/answer-dialog/answer-dialog.component';
import { Answer } from '../../shared/models/answer.model';
import { User } from '../../shared/models/user.model';
import { SocketsService } from '../../shared/services/sockets.service';
import { AlertDialogComponent } from '../../shared/components/alert-dialog/alert-dialog.component';
import {MatPaginator, MatSort, MatTableDataSource, MatCheckbox} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SelectionModel} from '@angular/cdk/collections';
import { environment } from '../../../environments/environment';
import { MessageBoxComponent } from '../../shared/components/message-box/message-box.component';
@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MembersListComponent implements OnInit, AfterViewInit {

  // public displayedColumns = ['firstname', 'lastname', 'username', 'email', 'profilePicture', 'aboutme',
  //                            'gender', 'birthday', 'phone', 'physicaladdress', 'shippingaddress',
  //                            'tags', 'follows',
  //                            'verified', 'verificationTokenExpiry', "resetPasswordTokenExpiry",
  //                            "createdAt",  "updatedAt",
  //                            'details', 'update', 'delete'];

  public displayedColumns = ['select', 'index', 'name', 'gender', 'birthday', 'username', 'email', 'verified', 'address', 'details', 'update', 'delete'];

  public dataSource = new MatTableDataSource<any>();
  private totalMembers: number;
  private pageSize: number;
  private pageIndex: number;
  form: FormGroup;
  selection = new SelectionModel<number>(true, []);
  serverUrl = environment.apiUrl;

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
    //this.newQuestionFlag = false;
    this.pageSize = 10;
    this.pageIndex = 0;
    //this.autocomplete = [];
    // this.form = this.fb.group({
    //   search: ''
    // });
    this.getAllMembers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach( (row, index) => this.selection.select(index));
  }


  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: number): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row + 1}`;
  }
 
  public getAllMembers(event?) {
    this.blockUIService.setBlockStatus(true);
    if (event) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
    }
    //this.autocomplete.splice(0);
    const observable = this.commonService.getMembers(
          this.pageSize,
          this.pageIndex, ""
          //this.form.value.search
        );
    observable.subscribe(
      (res: any) => {
        this.totalMembers = res.data.totalMembers;
        this.dataSource.data = res.data.members;
        this.selection.clear();
        //console.log(this.dataSource.data);
        this.blockUIService.setBlockStatus(false);
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open(err.error.msg, 'Dismiss');
      }
    );
  }
 
  public redirectToDetails = (id: string) => {
    event.preventDefault();
    console.log(id);
  }
 
  public redirectToUpdate = (id: string) => {
    console.log(id);
  }
 
  public redirectToDelete = (id: string) => {
    console.log(id);
  }

  public openSendMessageBox(event){
    event.stopPropagation();
    const email = event.target.innerText;
    this.dialogService
    .open(MessageBoxComponent, {
      data: {
        email,
      },
      width: '600px'
    }) 
  }

  public sendMessage(){
    var email = [];
    this.dataSource.data.forEach( (row, index) => {
      if(this.selection.selected.some( selected => selected == index )){
        ///console.log("i", index);
        email.push(row.email);
      }
    });
    //console.log(email);
    if(email.length){
      this.dialogService
      .open(MessageBoxComponent, {
        data: {
          email,
        },
        width: '600px'
      }) 
    }
    else{
      alert("You must select the members");
    }
  }

  public deleteMembers(){
    var memberIds = [];
    this.dataSource.data.forEach( (row, index) => {
      if(this.selection.selected.some( selected => selected == index )){
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
    console.log(memberIds);
    if(memberIds.length){
      if(confirm("Are you sure to delete "+name)){
        this.blockUIService.setBlockStatus(true);
        this.commonService.deleteMembers(memberIds)
        .subscribe(
          (res: any) => {
            this.snackBar.open(res.data.totalDeleteMembers+" of "+memberIds.length+" members are deleted.", 
            'Dismiss', 
            {duration: 1500});
            this.getAllMembers();
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
      alert("Select the members");
    }
  }

}