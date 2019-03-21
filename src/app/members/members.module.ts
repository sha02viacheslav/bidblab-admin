import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembersListComponent } from './members-list/members-list.component';


@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MembersRoutingModule,
  ],
  declarations: [MembersComponent, MembersListComponent],
  exports: [
    MatSortModule,
    MatTableModule,
  ]
})
export class MembersModule { }
