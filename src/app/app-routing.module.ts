import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { UserGuard } from './shared/guards/user.guard';
import { AppComponent } from './app.component';
import { EmptyComponent } from './shared/components/empty/empty.component';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: 'members',
    loadChildren: './members/members.module#MembersModule'
  },
  {
    path: 'gateway',
    loadChildren: './gateway/gateway.module#GatewayModule',
  },
  {
    path: 'resetPassword/:resetPasswordToken',
    component: AppComponent
  },
  {
    path: 'questions',
    loadChildren: './questions/questions.module#QuestionsModule',
  },
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule',
  },
  
  { path: '**', redirectTo: 'questions' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
