import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from './members.component';
import { MembersListComponent } from './members-list/members-list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MembersComponent,
    children: [
      { path: 'memberslist', component: MembersListComponent },
      { path: 'member-detail/:memberId', component: MemberDetailComponent },
      { path: '**', redirectTo: '' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
