import { Component, ViewChild} from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public settings: Settings;
    constructor(public appSettings:AppSettings,private httpClient: HttpClient){
            this.settings = this.appSettings.settings;
    } 

    ngOnInit() {
        this.getQuestions();
     }

    getQuestions(limit?, offset?, search?, filterTags?, active?, direction?): Observable<any>  {
        return this.httpClient.get<any>(
            `${environment.apiUrl}/api/admin/getQuestions?limit=${limit ||
                10}&offset=${offset || 0}&search=${search || ''}&filterTags=${filterTags || ''}
                &active=${active || ''}&direction=${direction || ''}`
        );
    }
}