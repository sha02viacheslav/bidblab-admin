import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCheckboxModule, MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTabsModule,
  MatSidenavModule,
  MatListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatButtonToggleModule,
  MatNativeDateModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { QuestionDialogComponent } from './components/question-dialog/question-dialog.component';
import { AnswerDialogComponent } from './components/answer-dialog/answer-dialog.component';
import { EmptyComponent } from './components/empty/empty.component';
import { QuestionBoxComponent } from './components/question-box/question-box.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { ImageblockComponent } from './components/imageblock/imageblock.component';
import { AccountNavComponent } from './components/account-nav/account-nav.component';
import { AnswerBoxComponent } from './components/answer-box/answer-box.component';
import { FollowBoxComponent } from './components/follow-box/follow-box.component';
import { ReportDialogComponent } from './components/report-dialog/report-dialog.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    RouterModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatNativeDateModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    AnswerDialogComponent,
    QuestionDialogComponent,
    EmptyComponent,
    QuestionBoxComponent,
    AlertDialogComponent,
    ImageblockComponent,
    AccountNavComponent,
    AnswerBoxComponent,
    FollowBoxComponent,
    ReportDialogComponent,
    MessageBoxComponent
  
  ],
  entryComponents: [
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    AnswerDialogComponent,
    AlertDialogComponent,
    ImageblockComponent,
    QuestionDialogComponent,
    ReportDialogComponent,
    MessageBoxComponent,
  ],
  exports: [
    FlexLayoutModule,
    HeaderComponent,
    FooterComponent,
    QuestionBoxComponent,
    ImageblockComponent,
    AccountNavComponent,
    AnswerBoxComponent,
    FollowBoxComponent,
    MessageBoxComponent,
    LoginComponent,
  ]
})
export class SharedModule {}
