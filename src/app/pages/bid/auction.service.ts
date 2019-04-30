import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question, Answer } from '../../shared/models/question.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(
    public httpClient:HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  getPendingAuctions(limit?, offset?, search?, filterTags?, active?, direction?) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/admin/getPendingAuctions?limit=${limit ||
        10}&offset=${offset || 0}&search=${search || ''}&filterTags=${filterTags || ''}
        &active=${active || ''}&direction=${direction || ''}`
    );
  }

  getProcessAuctions(limit?, offset?, search?, filterTags?, active?, direction?) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/admin/getProcessAuctions?limit=${limit ||
        10}&offset=${offset || 0}&search=${search || ''}&filterTags=${filterTags || ''}
        &active=${active || ''}&direction=${direction || ''}`
    );
  }

  getClosedAuctions(limit?, offset?, search?, filterTags?, active?, direction?) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/admin/getClosedAuctions?limit=${limit ||
        10}&offset=${offset || 0}&search=${search || ''}&filterTags=${filterTags || ''}
        &active=${active || ''}&direction=${direction || ''}`
    );
  }

  changeAuctionsRole(body, roleType) {
    //console.log("common service");
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/changeAuctionsRole/${roleType}`,
      body
    );
  }

  deleteAuctions(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/deleteAuctions`,
      body
    );
  }

  addAuction(body) {
    return this.httpClient.patch(
      `${environment.apiUrl}/api/admin/addAuction`,
      body,
      {
        reportProgress: true,
      }
    );
  }

  updateAuction(body) {
    return this.httpClient.patch(
      `${environment.apiUrl}/api/admin/updateAuction`,
      body,
      {
        reportProgress: true,
      }
    );
  }
  
  getDataForAddAuction() {
    return this.httpClient.get(
      `${environment.apiUrl}/api/admin/getDataForAddAuction`
    );
  }
}
