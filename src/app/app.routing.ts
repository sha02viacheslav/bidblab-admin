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
            // { path: 'ui', loadChildren: './pages/ui/ui.module#UiModule', data: { breadcrumb: 'UI' } },
            // { path: 'form-controls', loadChildren: './pages/form-controls/form-controls.module#FormControlsModule', data: { breadcrumb: 'Form Controls' } },
            // { path: 'tables', loadChildren: './pages/tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' } },
            // { path: 'icons', loadChildren: './pages/icons/icons.module#IconsModule', data: { breadcrumb: 'Material Icons' } },
            // { path: 'drag-drop', loadChildren: './pages/drag-drop/drag-drop.module#DragDropModule', data: { breadcrumb: 'Drag & Drop' } },
            // { path: 'schedule', loadChildren: './pages/schedule/schedule.module#ScheduleModule', data: { breadcrumb: 'Schedule' } },
            // { path: 'mailbox', loadChildren: './pages/mailbox/mailbox.module#MailboxModule', data: { breadcrumb: 'Mailbox' } },
            // { path: 'chat', loadChildren: './pages/chat/chat.module#ChatModule', data: { breadcrumb: 'Chat' } },
            // { path: 'maps', loadChildren: './pages/maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } },
            // { path: 'charts', loadChildren: './pages/charts/charts.module#ChartsModule', data: { breadcrumb: 'Charts' } },
            // { path: 'dynamic-menu', loadChildren: './pages/dynamic-menu/dynamic-menu.module#DynamicMenuModule', data: { breadcrumb: 'Dynamic Menu' }  },          
            // { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
            // { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } }
        ]
    },
    // { path: 'landing', loadChildren: './pages/landing/landing.module#LandingModule' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
    // { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
    // { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   // useHash: true
});