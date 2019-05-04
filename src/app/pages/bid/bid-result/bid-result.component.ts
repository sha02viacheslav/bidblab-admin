import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../shared/services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-bid-result',
  templateUrl: './bid-result.component.html',
  styleUrls: ['./bid-result.component.scss']
})
export class BidResultComponent implements OnInit {

  @Input() auction: any;
  @Input() auctionType: any;
  private serverUrl = environment.apiUrl;

  constructor(
  ) {
  }

  ngOnInit() {
  }

  
}


