import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../models/question.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-imageblock',
  templateUrl: './imageblock.component.html',
  styleUrls: ['./imageblock.component.scss']
})
export class ImageblockComponent implements OnInit {

  @Input() question: Question;
  
  serverUrl = environment.apiUrl;

  constructor() { }

  ngOnInit() {
  }

}
