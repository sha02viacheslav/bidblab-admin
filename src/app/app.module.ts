import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';

import { AgmCoreModule } from '@agm/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	wheelPropagation: true,
	suppressScrollX: true
};
import { CalendarModule } from 'angular-calendar';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './theme/pipes/pipes.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { AppSettings } from './app.settings';
import { SidenavComponent } from './theme/components/sidenav/sidenav.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { APP_BASE_HREF } from '@angular/common';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyBNcjxo_35qnEG17dQvvftWa68eZWepYE0'
		}),
		PerfectScrollbarModule,
		CalendarModule.forRoot(),
		SharedModule,
		PipesModule,
		routing,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production
		})
	],
	declarations: [
		AppComponent,
		PagesComponent,
		SidenavComponent,
		VerticalMenuComponent,
		HorizontalMenuComponent
	],
	entryComponents: [
		VerticalMenuComponent
	],
	providers: [
		AppSettings,
		{
			provide: APP_BASE_HREF,
			useValue: '/'
		},
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},
		{
			provide: OverlayContainer,
			useClass: CustomOverlayContainer
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}