import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';
import { DialogService } from '../../services/dialog.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { Location } from '@angular/common';
import { User } from '../../../shared/models/user.model';
import { environment } from '../../../../environments/environment';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  private userUpdatesSubscription: Subscription;
  serverUrl = environment.apiUrl;

  mainNavLinks: any[];
  accountNavLinks: any[];
  activeLinkIndex = -1;
  mobileQuery: MediaQueryList;

  menuHidden = false;

  constructor(
    private router: Router,
    private location: Location,
    private authenticationService: AuthenticationService,
    private media: ObservableMedia,
    private dialogService: DialogService
    //private media: ObservableMedia,
  ) {
    this.mainNavLinks = [
      {
        label: 'Members',
        link: '/members/memberslist',
        index: 0
      }, {
        label: 'Questions',
        link: '/questions/questionslist',
        index: 1
      }, {
        label: 'Blab',
        link: '/questions/blab',
        index: 2
      }, {
        label: 'About',
        link: '/questions/about',
        index: 3
      }, 
    ];
    this.accountNavLinks = [
      {
        label: 'Following',
        link: '/account/following',
        index: 0
      }, {
        label: 'My Questions',
        link: '/account/myquestions',
        index: 1
      }, {
        label: 'My answers',
        link: '/account/myanswers',
        index: 2
      }, {
        label: 'Credits',
        link: '/account/credits',
        index: 3
      }, 
      {
        label: 'Profile',
        link: '/account/profile',
        index: 3
      }, 
    ];
  }

  

  ngOnInit() {
    this.getUserUpdates();

    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.mainNavLinks.indexOf(this.mainNavLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  ngOnDestroy() {
    this.userUpdatesSubscription.unsubscribe();
   
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  closeMenu(){
    this.menuHidden = false;
  }

  isMediaActive(breakpoint) {
    return this.media.isActive(breakpoint);
  }

  isAuthenticated() {
    return this.authenticationService.isAdmin();
  }

  openDialog(componentName: string) {
    this.dialogService.open(
      componentName === 'login' ? LoginComponent : SignupComponent
    );
  }

  openProfile() {
    this.router.navigateByUrl(`/account`);
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

  goBack() {
    this.location.back();
  }

  isHome() {
    const path = this.location.path(false);
    return path === '' || path === '/questions/home';
  }

  logout() {
    this.authenticationService.logout();
    this.closeMenu();
  }

  private getUserUpdates() {
    this.userUpdatesSubscription = this.authenticationService
      .getUserUpdates()
      .subscribe(user => (this.user = user));
  }
}
