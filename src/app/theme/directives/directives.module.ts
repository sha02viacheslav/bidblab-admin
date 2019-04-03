import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetectScrollDirective } from './detect-scroll/detect-scroll.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DetectScrollDirective
  ],
  exports: [
    DetectScrollDirective
  ]
})
export class DirectivesModule { }
