import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../../../shared/services/common.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { BlockUIService } from '../../../shared/services/block-ui.service';
import { SocketsService } from '../../../shared/services/sockets.service';
import { FormValidationService } from '../../services/form-validation.service';


import { debounceTime, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Answer } from '../../../shared/models/answer.model';
import { Question } from '../../../shared/models/question.model';

import { Router } from '@angular/router';

import * as jwtDecode from 'jwt-decode';





@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @Input() question: Question;

  constructor(
    private fb: FormBuilder,
    private formValidationService: FormValidationService,
    private socketsService: SocketsService,
    private blockUIService: BlockUIService,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
  }
  

}
