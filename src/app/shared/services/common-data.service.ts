import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  public toEmail: any = '';
  public requestSendEmail: boolean = false;
  constructor() { }
}
