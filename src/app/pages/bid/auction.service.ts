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

	public auctionRole = {
		pending: 1,
		process: 2,
		closed: 4,
		deleted: 8,
		all: 15
	};

	constructor(
		public httpClient: HttpClient,
		private router: Router,
		private authenticationService: AuthenticationService
	) { }

	getPendingAuctions(limit?, offset?, search?, auctionType?, active?, direction?) {
		return this.httpClient.get(
			`${environment.apiUrl}/api/admin/getPendingAuctions?limit=${limit ||
			10}&offset=${offset || 0}&search=${search || ''}&auctionType=${auctionType || ''}
        &active=${active || ''}&direction=${direction || ''}`
		);
	}

	getProcessAuctions(limit?, offset?, search?, auctionType?, active?, direction?) {
		return this.httpClient.get(
			`${environment.apiUrl}/api/admin/getProcessAuctions?limit=${limit ||
			10}&offset=${offset || 0}&search=${search || ''}&auctionType=${auctionType || ''}
        &active=${active || ''}&direction=${direction || ''}`
		);
	}

	getClosedAuctions(limit?, offset?, search?, auctionType?, active?, direction?) {
		return this.httpClient.get(
			`${environment.apiUrl}/api/admin/getClosedAuctions?limit=${limit ||
			10}&offset=${offset || 0}&search=${search || ''}&auctionType=${auctionType || ''}
        &active=${active || ''}&direction=${direction || ''}`
		);
	}

	changeAuctionsRole(body, roleType) {
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
