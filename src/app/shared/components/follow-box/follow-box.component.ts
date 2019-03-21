import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../models/question.model';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { SocketsService } from '../../services/sockets.service';
import { BlockUIService } from '../../services/block-ui.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { Answer } from '../../../shared/models/answer.model';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DialogService } from '../../../shared/services/dialog.service';
import { AlertDialogComponent } from '../../../shared/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-follow-box',
  templateUrl: './follow-box.component.html',
  styleUrls: ['./follow-box.component.scss']
})
export class FollowBoxComponent implements OnInit {

  @Input() question: Question;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private socketsService: SocketsService,
    private blockUIService: BlockUIService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
  }

}
