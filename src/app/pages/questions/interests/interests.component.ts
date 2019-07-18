import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormArray, FormBuilder, FormGroup, Validators,  FormControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../shared/services/common.service';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss'],
	animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ], 
})
export class InterestsComponent implements OnInit {
  public displayedColumns: string[] = ['select', 'index', 'tagName', 'update', 'delete'];
  public dataSource: any;
  public selection = new SelectionModel<any>(true, []);
  public totalTags: number;
  private pageSize: number = 10;
  public pageIndex: number = 0;
  private sortParam = {
    active: 'tagName',
    direction: 'asc',
  };
  newTagFlag: boolean;
  serverUrl = environment.apiUrl;
  searchForm: FormGroup;
  updateForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    private questionsService: QuestionsService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      tagName: [
        '',
        [
          Validators.required,
          Validators.maxLength(500)
        ]
      ],
    });
    this.updateForm = this.fb.group({
      tagName: [
        '',
        [
          Validators.required,
          Validators.maxLength(500)
        ]
      ],
    });
    this.getTags();
  }

  searchBoxAction() {
    if (this.newTagFlag) {
      this.newTagFlag = false;
    }
    else {
      this.getTags();
    }
  }

  getTags(event?) {
    if (this.authenticationService.isAdmin()) {
      if (event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
      }
      this.questionsService.getInterests(
        this.pageSize,
        this.pageIndex,
        this.searchForm.value.tagName,
        this.sortParam.active,
        this.sortParam.direction,
      ).subscribe((res: any) => {
        this.totalTags = res.data.totalTags;
        this.dataSource = new MatTableDataSource<any>(res.data.tags);
        this.selection.clear();
        if (this.totalTags <= this.pageSize * this.pageIndex) {
          this.pageIndex = 0;
        }
        if (!this.totalTags) {
          this.newTagFlag = true;
        } else {
          this.newTagFlag = false;
        }
      });
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  public customSort(event) {
    this.sortParam = event;
    this.getTags();
  }

  addTag() {
    if (this.searchForm.valid) {
      this.submitted = true;
      this.questionsService.addInterest(this.searchForm.value).subscribe((res: any) => {
        this.submitted = false;
        this.searchForm.reset();
        this.snackBar.open(res.msg, 'Dismiss', {duration: 1500});
        this.getTags();
      });
    }
  }

  updateTag(interestId){
    if (this.updateForm.valid) {
      this.submitted = true;
      this.questionsService.updateInterest(interestId, this.updateForm.value).subscribe((res: any) => {
        this.submitted = false;
        if(res.data) {
          this.snackBar.open(res.msg, 'Dismiss', {duration: 1500});
          this.getTags();
        } else {
          this.snackBar.open(res.msg, 'Dismiss', {duration: 1500});
        }
      });
    }
  }

  public deleteTags() {
    var elementIds = [];
    this.dataSource.data.forEach((row, index) => {
      if (this.selection.selected.some(selected => selected.index == row.index)) {
        elementIds.push(row._id);
      }
    });
    this.finalDeleteTags(elementIds);
  }

  public deleteTag(event, tagId) {
    event.stopPropagation();
    var elementIds = [];
    elementIds.push(tagId);
    this.finalDeleteTags(elementIds);
  }

  public finalDeleteTags(elementIds) {
    if (elementIds.length) {
      if (confirm("Are you sure to delete tags")) {
        this.questionsService.deleteInterests(elementIds).subscribe((res: any) => {
          this.getTags();
        });
      }
    }
    else {
      alert("Select the answers");
    }
  }

}
