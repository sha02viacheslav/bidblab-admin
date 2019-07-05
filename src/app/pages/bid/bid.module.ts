import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { NewAuctionComponent } from './new-auction/new-auction.component';
import { PendingAuctionsComponent } from './pending-auctions/pending-auctions.component';
import { ProgressAuctionsComponent } from './progress-auctions/progress-auctions.component';
import { ClosedAuctionsComponent } from './closed-auctions/closed-auctions.component';
import { AuctionDialogComponent } from './auction-dialog/auction-dialog.component';
import { QuillModule } from 'ngx-quill';
import { BidResultComponent } from './bid-result/bid-result.component'

export const routes = [
	{
		path: 'newauction',
		component: NewAuctionComponent
	},
	{
		path: 'pendingauctions',
		component: PendingAuctionsComponent
	},
	{
		path: 'progressauctions',
		component: ProgressAuctionsComponent
	},
	{
		path: 'closedauctions',
		component: ClosedAuctionsComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		QuillModule,
		SharedModule,
		PipesModule,
	],
	declarations: [
		NewAuctionComponent,
		PendingAuctionsComponent,
		ProgressAuctionsComponent,
		ClosedAuctionsComponent,
		AuctionDialogComponent,
		BidResultComponent
	],
	entryComponents: [
		AuctionDialogComponent,
	]
})
export class BidModule { }
