import { Component, OnInit, Input, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../shared/services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { environment } from '../../../../environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource, MatOption, MatSort } from '@angular/material';

@Component({
  selector: 'app-login-result',
  templateUrl: './login-result.component.html',
  styleUrls: ['./login-result.component.scss']
})
export class LoginResultComponent implements OnInit, AfterViewInit {

	public displayedColumns: string[] = ['username', 'clientIp', 'createdAt'];
	public dataSource:any;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
		public dialogRef: MatDialogRef<LoginResultComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) { }

  ngOnInit() {
    this.data.logins.forEach(element => {
      element.username = this.data.user.username;
      element.user = this.data.user;
    });
    this.dataSource = new MatTableDataSource<any>(this.data.logins);
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  } 
}


