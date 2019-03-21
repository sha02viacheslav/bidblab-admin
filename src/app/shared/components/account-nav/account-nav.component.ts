import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-nav',
  templateUrl: './account-nav.component.html',
  styleUrls: ['./account-nav.component.scss']
})
export class AccountNavComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(
    private router: Router
  ) {
    this.navLinks = [
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
    ]; }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}

