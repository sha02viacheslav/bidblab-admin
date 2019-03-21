import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { FormValidationService } from '../../shared/services/form-validation.service';
import { BlockUIService } from '../../shared/services/block-ui.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { toDate } from '@angular/common/src/i18n/format_date';
import { DialogService } from '../../shared/services/dialog.service';
import { LoginComponent } from '../../shared/components/login/login.component';
import { CommonService } from '../../shared/services/common.service';
import { environment } from '../../../environments/environment';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User;
  submitted: boolean;
  disabled: boolean;
  passwordVisibility: boolean;
  infoForm: FormGroup;
  passwordForm: FormGroup;
  private userUpdatesSubscription: Subscription;
  isInit: boolean;
  serverUrl = environment.apiUrl;
  //tags: string[];
  standardInterests: string[];
  formArray: FormArray;
  //customTag: string;;


  constructor(
    private fb: FormBuilder,
    private formValidationService: FormValidationService,
    private authenticationService: AuthenticationService,
    private blockUIService: BlockUIService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private commonService: CommonService,
    private media: ObservableMedia,
  ) {}

  ngOnInit() {
    this.isInit = false;
    this.isAuthenticated();

  }

  ngOnDestroy() {
    if(this.isInit){
      this.userUpdatesSubscription.unsubscribe();
    }
  }
  initialize(){

    this.isInit = true;
    this.getUserUpdates();
    this.passwordVisibility = false;
    this.disabled = true;
    this.submitted = false;
    
    this.infoForm = this.fb.group({
      firstName: [
        this.user.firstName,
        [Validators.required, this.formValidationService.isBlank]
      ],
      lastName: [
        this.user.lastName,
        [Validators.required, this.formValidationService.isBlank]
      ],
      username: [
        this.user.username,
        [Validators.required, this.formValidationService.isBlank]
      ],
      email: [
        this.user.email,
        [
          Validators.required,
          this.formValidationService.isBlank,
          Validators.email
        ]
      ],
      aboutme: [
        this.user.aboutme,
      ],
      phone: [
        this.user.phone,
      ],
      customTag: [
        '',
      ],
      tags: this.fb.array([]),
      birthday: [
        new Date(this.user.birthday),
      ],
      gender: [
        this.user.gender,
      ],
      physicaladdress: [
        this.user.physicaladdress,
      ],
      physicalcity: [
        this.user.physicalcity,
      ],
      physicalstate: [
        this.user.physicalstate,
      ],
      physicalzipcode: [
        this.user.physicalzipcode,
      ],
      shippingaddress: [
        this.user.shippingaddress,
      ],
      shippingcity: [
        this.user.shippingcity,
      ],
      shippingstate: [
        this.user.shippingstate,
      ],
      shippingzipcode: [
        this.user.shippingzipcode,
      ],
    });

    const observable = this.commonService.getStandardInterests();
    observable.subscribe(
      (res: any) => {
        this.standardInterests = res.data;
        this.formArray = this.infoForm.get('tags') as FormArray;
        this.user.tags.forEach( item => {
          if(!this.standardInterests.some( x => x == item)){
            this.standardInterests.push(item);
          };
        })
        this.standardInterests.forEach( item => {
          if(this.user.tags.some(
            interest =>
            interest &&
            interest === item
          )){
            this.formArray.push(new FormControl(true));
          }
          else{
            this.formArray.push(new FormControl(false));
          }
          
        });
        this.blockUIService.setBlockStatus(false);
        this.snackBar.open(res.msg, 'Dismiss', {
          duration: 1500
        });
      },
      (err: HttpErrorResponse) => {
        this.blockUIService.setBlockStatus(false);
        this.snackBar.open(err.error.msg, 'Dismiss', {
          duration: 1500
        });
      }
    );
    
    this.passwordForm = this.fb.group({
      currentPassword: [
        '',
        [
          Validators.required,
          this.formValidationService.isBlank,
          Validators.minLength(8)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          this.formValidationService.isBlank,
          Validators.minLength(8)
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          this.formValidationService.isBlank,
          this.formValidationService.arePasswordsMismatching
        ]
      ]
    });
  }

  addCustomTag(){
    event.preventDefault();
    if(this.infoForm.value.customTag){
      if(this.standardInterests.find(x => x == this.infoForm.value.customTag)){
        this.infoForm.controls.customTag.setValue('');
      }
      else{
        this.standardInterests.push(this.infoForm.value.customTag);
        this.formArray.push(new FormControl(true));
        this.infoForm.controls.customTag.setValue('');
      }
    }
  }

  isAuthenticated() {
    if(this.authenticationService.isAuthenticated()){
      this.initialize();
    }
    else{
      setTimeout(() => this.dialogService.open(LoginComponent)
        .afterClosed()
        .subscribe(result => {
          if(result == 'OK'){
            this.initialize();
          }
          else{
            this.commonService.goHome();
          }
        })
      );
    }
  }

  isMediaActive(breakpoint) {
    return this.media.isActive(breakpoint);
  }


  checkError(form, field, error) {
    return this.formValidationService.checkError(form, field, error);
  }

  togglePasswordVisibility(event) {
    if (event.type === 'mouseleave' && !this.passwordVisibility) {
      return event.preventDefault();
    }
    this.passwordVisibility = !this.passwordVisibility;
    return event.preventDefault();
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    this.blockUIService.setBlockStatus(true);
    this.userService.changeProfilePicture(uploadData).subscribe(
      (res: any) => {
        this.blockUIService.setBlockStatus(false);
        this.authenticationService.setUser(
          
          Object.assign(this.user, {
            profilePicture: res.data
          })
        );
        this.snackBar.open(res.msg, 'Dismiss', {
          duration: 1500
        });
      },
      (err: HttpErrorResponse) => {
        this.blockUIService.setBlockStatus(false);
        this.snackBar.open(err.error.msg, 'Dismiss', {
          duration: 4000
        });
      }
    );
  }

  submitInfoForm() {
    if (this.infoForm.valid) {
      const formValue = Object.assign(
        {}, 
        this.infoForm.value, 
        { 
          tags: this.standardInterests
            .filter((x, i) => !!this.infoForm.value.tags[i])
        }
      );
      this.submitted = true;
      this.blockUIService.setBlockStatus(true);
      this.userService.updateProfile(formValue).subscribe(
        (res: any) => {
          this.authenticationService.setUser(res.data);
          this.blockUIService.setBlockStatus(false);
          this.submitted = true;
          this.snackBar.open(res.msg, 'Dismiss', {
            duration: 1500
          });
        },
        (err: HttpErrorResponse) => {
          this.submitted = false;
          this.blockUIService.setBlockStatus(false);
          this.snackBar.open(err.error.msg, 'Dismiss', {
            duration: 4000
          });
        }
      );
    }
  }

  submitPasswordForm(formDirective) {
    if (this.passwordForm.valid) {
      this.submitted = true;
      this.blockUIService.setBlockStatus(true);
      this.userService.changePassword(this.passwordForm.value).subscribe(
        (res: any) => {
          this.blockUIService.setBlockStatus(false);
          this.passwordForm.reset();
          formDirective.resetForm();
          this.submitted = false;
          this.snackBar.open(res.msg, 'Dismiss', {
            duration: 1500
          });
        },
        (err: HttpErrorResponse) => {
          this.submitted = false;
          this.blockUIService.setBlockStatus(false);
          this.snackBar.open(err.error.msg, 'Dismiss', {
            duration: 4000
          });
        }
      );
    }
  }

  private getUserUpdates() {
    this.userUpdatesSubscription = this.authenticationService
      .getUserUpdates()
      .subscribe(user => (this.user = user));
  }
}
