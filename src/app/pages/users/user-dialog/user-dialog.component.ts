import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatOption } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User } from '../../../shared/models/user.model';
import { CommonService } from '../../../shared/services/common.service';
import { FormValidationService } from '../../../shared/services/form-validation.service';

@Component({
	selector: 'app-user-dialog',
	templateUrl: './user-dialog.component.html',
	styleUrls: ['./user-dialog.component.scss']
})
	export class UserDialogComponent implements OnInit {
	public form:FormGroup;
	public passwordHide:boolean = true;
	standardInterests: string[];
	selectedTags: string[];
	
	constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
				@Inject(MAT_DIALOG_DATA) public user: User,
				public fb: FormBuilder,
				private commonService: CommonService,
				private formValidationService: FormValidationService,
	) { }

	ngOnInit() {
		if(!this.user){
			this.user = new User();
		} 
		this.form = this.fb.group({
			username: [ this.user.username, Validators.compose([Validators.required, Validators.minLength(5)]) ],
			email: [ this.user.email, Validators.compose([Validators.required, Validators.email]) ],
			phone: [ this.user.phone],
			password: [ '', Validators.compose([Validators.required, Validators.minLength(8)]) ],
			confirmPassword: [ '', 
				[
					Validators.required, 
					this.formValidationService.arePasswordsMismatching
				] 
			],
			firstName: [ this.user.firstName, Validators.compose([Validators.required]) ],
			lastName: [ this.user.lastName, Validators.compose([Validators.required]) ],
			birthday: [ new Date(this.user.birthday), Validators.compose([Validators.required]) ],
			gender: [ this.user.gender ],
			aboutme: [ this.user.aboutme ],
			tags: [this.user.tags],
			customTag: [''],
			physicaladdress: [ this.user.physicaladdress ],
			physicalcity: [ this.user.physicalcity ],
			physicalstate: [ this.user.physicalstate ],
			physicalzipcode: [ this.user.physicalzipcode ],
			shippingaddress: [ this.user.shippingaddress ],
			shippingcity: [ this.user.shippingcity ],
			shippingstate: [ this.user.shippingstate ],
			shippingzipcode: [ this.user.shippingzipcode ],
		});

		this.commonService.getStandardInterests().subscribe(
			(res: any) => {
				this.standardInterests = res.data;
				if(this.user.tags){
				this.user.tags.forEach( item => {
					if(!this.standardInterests.some( x => x == item)){
						this.standardInterests.push(item);
					};
				})
					this.selectedTags = this.user.tags;
				}
			},
			(err: HttpErrorResponse) => {
			}
		);
		
	}


	checkError(form, field, error) {
		return this.formValidationService.checkError(form, field, error);
	}

	close(): void {
		this.dialogRef.close();
	}

	addCustomTag(){
		event.preventDefault();
		if(this.form.value.customTag){
		if(!this.standardInterests.find(item => item == this.form.value.customTag)){
			this.standardInterests.push(this.form.value.customTag);
			this.form.value.tags.push(this.form.value.customTag);
			this.selectedTags = this.form.value.tags;
		}
		this.form.controls.customTag.setValue('');
		}
	}

	changeSelectedTags()
	{
		this.selectedTags = this.form.value.tags;
	}

}
