import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { User, UserProfile, UserWork, UserContacts, UserSocial, UserSettings } from './user.model';
import { UsersService } from './users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ UsersService ]  
})
export class UsersComponent implements OnInit {
    public users: User[];
    public searchText: string;
    public page:any;
    public settings: Settings;
    constructor(public appSettings:AppSettings, 
                public dialog: MatDialog,
                public usersService:UsersService){
        this.settings = this.appSettings.settings; 
    }

    ngOnInit() {      
    }

  


   


}