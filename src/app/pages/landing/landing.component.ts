import { Component } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  public settings: Settings;
  constructor(public appSettings:AppSettings) {
    this.settings = this.appSettings.settings; 
  }

  ngOnInit(){
    this.settings.rtl = false;
  }

  ngAfterViewInit(){
    this.settings.loadingSpinner = false; 
  }

  public scrollToDemos(){
    setTimeout(() => { window.scrollTo(0,520) });
  }

  public changeLayout(menu, menuType, isRtl){
    this.settings.menu = menu;
    this.settings.menuType = menuType;
    this.settings.rtl = isRtl;
    this.settings.theme = 'indigo-light';
  }

  public changeTheme(theme){
    this.settings.theme = theme;       
  }

}
