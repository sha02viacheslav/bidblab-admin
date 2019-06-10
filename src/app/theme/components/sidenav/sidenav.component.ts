import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService, AuthenticationService ],
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenavPS') sidenavPS: PerfectScrollbarComponent;
  public userImage= '../assets/img/users/user.jpg';
  public menuItems:Array<any>;
  public settings: Settings;
  user: any;
  serverUrl = environment.apiUrl;
  private userUpdatesSubscription: Subscription;
  constructor(
    public appSettings:AppSettings,
    public menuService:MenuService,
    private authenticationService: AuthenticationService,
    public router:Router
    ){
      this.settings = this.appSettings.settings; 
  }

  ngOnInit() {
    this.menuItems = this.menuService.getVerticalMenuItems();
    this.getUserUpdates();
  }

  public closeSubMenus(){
    let menu = document.querySelector(".sidenav-menu-outer");
    if(menu){
      for (let i = 0; i < menu.children[0].children.length; i++) {
        let child = menu.children[0].children[i];
        if(child){
          if(child.children[0].classList.contains('expanded')){
              child.children[0].classList.remove('expanded');
              child.children[1].classList.remove('show');
          }
        }
      }
    }
  }

  public updatePS(e){
    this.sidenavPS.directiveRef.update();
  }

  private getUserUpdates() {
   this.userUpdatesSubscription = 
    this.authenticationService
      .getUserUpdates()
      .subscribe(
        (res: any) => {
          this.user = res;
        },
        (err: HttpErrorResponse) => {
          //this.snackBar.open(err.error.msg, 'Dismiss');
        }
      ); 
  }
  
  logout() {
    this.authenticationService.logout();
  }

}
