import { Injectable, HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  innerWidth: number;
  mainPageHeight: number;

  constructor() { }

  @HostListener('window:resize') newColor() {
    this.innerWidth = window.innerWidth;
    this.mainPageHeight = this.innerWidth - 200;
  }
}
