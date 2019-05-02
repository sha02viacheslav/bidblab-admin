import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    private httpClient: HttpClient
  ) {}

  getStandardInterests() {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/getStandardInterests`
    );
  } 

  getDefaultCredits() {
		return this.httpClient.get(
			`${environment.apiUrl}/api/admin/getDefaultCredits`
		);
	}

  getImage(imageUrl: string){
    return this.httpClient
      .get(imageUrl, { responseType: 'blob' });
  }

}
