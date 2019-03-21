import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { BlockUIModule } from 'ng-block-ui';
import {
  MAT_CHIPS_DEFAULT_OPTIONS,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AccountModule } from './account/account.module';
import { QuestionsModule } from './questions/questions.module';
import { SharedModule } from './shared/shared.module';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    BlockUIModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    AppRoutingModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { disableClose: true, autoFocus: true, hasBackdrop: true }
    },
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
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
