import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SharedModule } from '../shared/shared.module';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FollowingComponent } from './following/following.component';
import { MyquestionsComponent } from './myquestions/myquestions.component';
import { MyanswersComponent } from './myanswers/myanswers.component';
import { CreditsComponent } from './credits/credits.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatDividerModule,
    SharedModule,
    AccountRoutingModule,
  ],
  declarations: [AccountComponent, FollowingComponent, MyquestionsComponent, MyanswersComponent, CreditsComponent, ProfileComponent],
  exports: [
    AccountComponent
  ]
})
export class AccountModule { }

