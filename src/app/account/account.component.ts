import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private media: ObservableMedia,
  ) { }

  ngOnInit() {
  }
  
  isMediaActive(breakpoint) {
    return this.media.isActive(breakpoint);
  }

}
