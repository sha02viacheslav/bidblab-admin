import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { NewAuctionComponent } from './new-auction/new-auction.component';
import { BidComponent } from './bid.component';

export const routes = [
  { path: '', component: BidComponent, pathMatch: 'full' },
  { path: 'newauction', component: NewAuctionComponent, data: { breadcrumb: 'New auction' } },
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
  declarations: [NewAuctionComponent, BidComponent],
})
export class BidModule { }
