import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  public recievers: any[] = [];
  public requestSendEmail: boolean = false;
  constructor() { }
}
