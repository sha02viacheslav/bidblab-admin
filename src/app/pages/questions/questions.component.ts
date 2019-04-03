import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { Question, Answer } from '../../shared/models/question.model';
import { QuestionsService } from './questions.service';
//import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ QuestionsService ]  
})
export class QuestionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
