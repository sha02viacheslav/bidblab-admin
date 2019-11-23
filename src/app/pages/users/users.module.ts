import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { LoginResultComponent } from './login-result/login-result.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
export const routes = [
	{
		path: 'list',
		component: ListComponent
	},
	{
		path: 'userdetail/:userId',
		component: DetailComponent
	},
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
		UserDialogComponent,
		LoginResultComponent,
		ListComponent,
		DetailComponent
	],
	entryComponents: [
		UserDialogComponent,
		LoginResultComponent
	]
})
export class UsersModule {}
