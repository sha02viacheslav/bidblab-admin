import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { UsersComponent } from './users.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

export const routes = [
  { path: '', component: UsersComponent, pathMatch: 'full' },
  { path: 'list', component: ListComponent, data: { breadcrumb: 'User list' } },
  { path: 'userdetail/:userId', component: DetailComponent, data: { breadcrumb: 'User detail' } },
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
    UsersComponent,
    UserDialogComponent,
    ListComponent,
    DetailComponent
  ],
  entryComponents:[
    UserDialogComponent
  ]
})
export class UsersModule { }
