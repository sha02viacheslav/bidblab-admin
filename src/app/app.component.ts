import { Component, ViewChild} from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public settings: Settings;
    constructor(
        public appSettings:AppSettings,
        private httpClient: HttpClient
    ){
        this.settings = this.appSettings.settings;
    } 

    ngOnInit() {
     }
}