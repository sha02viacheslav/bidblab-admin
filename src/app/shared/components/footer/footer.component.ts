import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(
    private media: ObservableMedia,
  ) {}

  ngOnInit() {}

  isMediaActive(breakpoint) {
    return this.media.isActive(breakpoint);
  }
}
