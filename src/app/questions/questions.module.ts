import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions.component';
import { SharedModule } from '../shared/shared.module';
import { QuestionsRoutingModule } from './questions-routing.module';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSnackBarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { HomeComponent } from './home/home.component';
import { BlabComponent } from './blab/blab.component';
import { BidComponent } from './bid/bid.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
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
    SharedModule,
    QuestionsRoutingModule
  ],
  declarations: [QuestionsComponent, QuestionDetailComponent, HomeComponent, BlabComponent, BidComponent, AboutComponent]
})
export class QuestionsModule {}
