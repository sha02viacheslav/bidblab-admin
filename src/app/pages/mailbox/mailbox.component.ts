import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { Mail } from './mail.model';
import { CommonDataService } from '../../shared/services/common-data.service';
import { CommonService } from '../../shared/services/common.service';
import { MailboxService } from './mailbox.service';
import { element } from '@angular/core/src/render3';
import { SelectionModel } from '@angular/cdk/collections';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss'],
})
export class MailboxComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public settings: Settings;
  public sidenavOpen:boolean = true;
  public mails: Array<Mail>;
  public mail: Mail;
  public newMail: boolean;
  public type:string = 'all';
  private totalMails: number;
	private pageSize: number;
	private pageIndex: number;
	private search: string = '';
	private sortParam = {
		active: 'name',
		direction: 'asc',
	};
  public searchText: string;
  public form:FormGroup;
  public toUsername: any[] = [];
  public toUserId: any[] = [];
	public selection = new SelectionModel<any>(true, []);
	serverUrl = environment.apiUrl;

  constructor(public appSettings:AppSettings, 
              public formBuilder: FormBuilder, 
              public snackBar: MatSnackBar,
              private mailboxService:MailboxService,
              private commonService: CommonService,
              private commonDataService:CommonDataService) { 
    this.settings = this.appSettings.settings; 
    this.commonDataService.recievers.forEach( element => {
      this.toUsername.push(element.username);
      this.toUserId.push(element._id);
    })
    this.newMail = this.commonDataService.requestSendEmail;
  }

  ngOnInit() {
    this.getMails();      
    if(window.innerWidth <= 992){
      this.sidenavOpen = false;
    }
    this.form = this.formBuilder.group({
      'to': [this.toUsername, Validators.required],
      'recievers': [this.toUserId, Validators.required],
      // 'cc': null,
      'subject': null,    
      'message': null
    });  
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth <= 992) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  getMails(event?) {
    if (event) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
    }
    this.mailboxService.getMails(
      this.pageSize,
      this.pageIndex,
      this.search,
      this.type,
      this.sortParam.active,
      this.sortParam.direction,
    ).subscribe(
      (res: any) => {
        this.totalMails = res.data.totalMails;
        this.mails = res.data.mails;
        this.mails.forEach(row => row.selected = false);
        console.log(this.mails);
        this.selection.clear();
        if(this.totalMails <= this.pageSize * this.pageIndex){
        this.pageIndex = 0;
        }
      },
      (err: HttpErrorResponse) => {
      }
    );
  }
  
  isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.mails.length;
		return numSelected === numRows;
	}

	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.mails.forEach(row => this.selection.select(row));
	}

  public viewDetail(mail){
    this.mail = mail;    
    this.mails.forEach(m => m.selected = false);
    this.mail.selected = true;
    // this.mail.unread = false;
    this.newMail = false;
    if(window.innerWidth <= 992){
      this.sidenav.close(); 
    }
  }

  public compose(){
    this.mail = null;
    this.newMail = true;
  }

  public setAsRead(){
    this.mail.unread = false;
  }

  public setAsUnRead(){
    this.mail.unread = true;
  }

  public delete() {
    this.mail.trash = true;
    this.mail.sent = false;
    this.mail.draft = false; 
    this.mail.starred = false; 
    this.getMails();
    this.mail = null;
  }

  public changeStarStatus() {       
    this.mail.starred = !this.mail.starred;
    this.getMails(); 
  }

  public restore(){
    this.mail.trash = false;
    this.type = 'all';
    this.getMails();
    this.mail = null; 
  }

  applySearch(searchValue: string) {
		this.search = searchValue.trim().toLowerCase();
		this.getMails();
	}

  public onSubmit(mail){
    console.log(mail)
    if (this.form.valid) {
      this.mailboxService.sendMessage(mail).subscribe(
        (res: any) => {
          this.snackBar.open('Mail sent to ' + mail.to + ' successfully!', null, {
            duration: 2000,
          });
        },
        (err: HttpErrorResponse) => {
          this.snackBar.open(err.error.msg, 'Dismiss', {
            duration: 2000
          });
        }
      );
      
      this.form.reset();     
    }
  }

}
