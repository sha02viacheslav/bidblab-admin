import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { FollowingComponent } from './following/following.component';
import { MyquestionsComponent } from './myquestions/myquestions.component';
import { MyanswersComponent } from './myanswers/myanswers.component';
import { CreditsComponent } from './credits/credits.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: 'following', component: FollowingComponent },
      { path: 'myquestions', component: MyquestionsComponent },
      { path: 'myanswers', component: MyanswersComponent },
      { path: 'credits', component: CreditsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
