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

  getAllTags() {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/getAllTags`
    );
  } 

  getAllInterests() {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/getAllInterests`
    );
  } 

  getDefaultCredits() {
		return this.httpClient.get(
			`${environment.apiUrl}/api/common/getDefaultCredits`
		);
  }

  changeQuestionsRole(body, roleType) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/changeQuestionsRole/${roleType}`,
      body
    );
  } 

  changeAnswersRole(body, roleType) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/changeAnswersRole/${roleType}`,
      body
    );
  } 

  getImage(imageUrl: string){
    return this.httpClient
      .get(imageUrl, { responseType: 'blob' });
  }

}
