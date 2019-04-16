import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { FlagsComponent } from './flags.component';
import { FlagListComponent } from './flag-list/flag-list.component';

export const routes = [
  { path: '', component: FlagsComponent, pathMatch: 'full' },
  { path: 'flaglist', component: FlagListComponent, data: { breadcrumb: 'Flag list' } },
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
  declarations: [FlagsComponent, FlagListComponent],
  entryComponents:[
    FlagsComponent,
    FlagListComponent
  ]
})
export class FlagsModule { }
