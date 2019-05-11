import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SitemanagerComponent } from './sitemanager.component';
import { AboutComponent } from './about/about.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { QuillModule } from 'ngx-quill';
import { HowComponent } from './how/how.component';
import { TermsComponent } from './terms/terms.component';
import { CookieComponent } from './cookie/cookie.component';
import { PrivacyComponent } from './privacy/privacy.component';

export const routes = [
  { path: '', component: SitemanagerComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, data: { breadcrumb: 'About' } },
  { path: 'how', component: HowComponent, data: { breadcrumb: 'About' } },
  { path: 'terms', component: TermsComponent, data: { breadcrumb: 'About' } },
  { path: 'cookie', component: CookieComponent, data: { breadcrumb: 'About' } },
  { path: 'privacy', component: PrivacyComponent, data: { breadcrumb: 'About' } },
];

@NgModule({
  declarations: [SitemanagerComponent, AboutComponent, HowComponent, TermsComponent, CookieComponent, PrivacyComponent],
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
  ]
})
export class SitemanagerModule { }
