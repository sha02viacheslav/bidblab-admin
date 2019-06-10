import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { UserGuard } from './shared/guards/user.guard';

export const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent, children: [
            { path: '', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', canActivate: [UserGuard], data: { breadcrumb: 'Dashboard' } },
            { path: 'users', loadChildren: './pages/users/users.module#UsersModule', canActivate: [UserGuard], data: { breadcrumb: 'Users' } },
            { path: 'questions', loadChildren: './pages/questions/questions.module#QuestionsModule', canActivate: [UserGuard], data: { breadcrumb: 'Questions' } },
            { path: 'credits', loadChildren: './pages/credits/credits.module#CreditsModule', canActivate: [UserGuard], data: { breadcrumb: 'Credits' } },
            { path: 'flags', loadChildren: './pages/flags/flags.module#FlagsModule', canActivate: [UserGuard], data: { breadcrumb: 'Flags' } },
            { path: 'bid', loadChildren: './pages/bid/bid.module#BidModule', canActivate: [UserGuard], data: { breadcrumb: 'Bid' } },
            { path: 'mailbox', loadChildren: './pages/mailbox/mailbox.module#MailboxModule', canActivate: [UserGuard], data: { breadcrumb: 'Mailbox' } },
            { path: 'sitemanager', loadChildren: './pages/sitemanager/sitemanager.module#SitemanagerModule', canActivate: [UserGuard], data: { breadcrumb: 'Sitemanager' } },
        ]
    },
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
    { path: '**', redirectTo: ''}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   // useHash: true
});