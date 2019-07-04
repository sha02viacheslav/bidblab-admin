import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { QuestionsComponent } from './questions.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { TagsComponent } from './tags/tags.component';
import { AnswerListComponent } from './answer-list/answer-list.component';

export const routes = [
  { path: '', component: QuestionsComponent, pathMatch: 'full' },
  { path: 'list', component: QuestionListComponent, data: { breadcrumb: 'Question list' } },
  { path: 'tags', component: TagsComponent, data: { breadcrumb: 'Tags' } },
  { path: 'answerslist', component: AnswerListComponent, data: { breadcrumb: 'Answer list' } },
  { path: '**', redirectTo: 'list'}
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule    
  ],
  declarations: [
    QuestionsComponent,
    QuestionListComponent,
    AddQuestionComponent,
    AnswerListComponent,
    TagsComponent
  ],
  entryComponents:[
    AddQuestionComponent,
    QuestionListComponent
  ]
})
export class QuestionsModule { }
