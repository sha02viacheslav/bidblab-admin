import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { UserGuard } from './shared/guards/user.guard';

export const routes: Routes = [{
        path: '',
        component: PagesComponent,
        children: [{
                path: 'users',
                loadChildren: './pages/users/users.module#UsersModule',
                canActivate: [UserGuard]
            },
            {
                path: 'questions',
                loadChildren: './pages/questions/questions.module#QuestionsModule',
                canActivate: [UserGuard]
            },
            {
                path: 'credits',
                loadChildren: './pages/credits/credits.module#CreditsModule',
                canActivate: [UserGuard]
            },
            {
                path: 'flags',
                loadChildren: './pages/flags/flags.module#FlagsModule',
                canActivate: [UserGuard]
            },
            {
                path: 'bid',
                loadChildren: './pages/bid/bid.module#BidModule',
                canActivate: [UserGuard]
            },
            {
                path: 'mailbox',
                loadChildren: './pages/mailbox/mailbox.module#MailboxModule',
                canActivate: [UserGuard]
            },
            {
                path: 'sitemanager',
                loadChildren: './pages/sitemanager/sitemanager.module#SitemanagerModule',
                canActivate: [UserGuard]
            },
            // { path: '**', redirectTo: 'questions'}
        ]
    },
    {
        path: 'login',
        loadChildren: './pages/login/login.module#LoginModule'
    },
    {
        path: '**',
        redirectTo: 'questions'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
    // useHash: true
});