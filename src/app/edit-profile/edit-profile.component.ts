import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export type ViewOption ={
  value: string,
  label: string,
};
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [MessageService],
})

export class EditProfileComponent implements OnInit{

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  basicDetailsView:boolean = true;
  educationalDetailsView:boolean = false;
  workExperienceView:boolean = false;
  loader:boolean = false;

  basicDetailsForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    middleName: new FormControl(''),
    dateOfBirth: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNo: new FormControl('', [Validators.required]),
    bloodGroup: new FormControl('', [Validators.required]),
    relationshipStatus: new FormControl('', [Validators.required]),
    nationality: new FormControl('', [Validators.required])
  });
  educationalForm: FormGroup = new FormGroup({
    programDegree: new FormControl('', [Validators.required]),
    collegeName: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required])
  });
  workExperienceForm: FormGroup = new FormGroup({
    companyName: new FormControl(''),
    designation: new FormControl(''),
    joiningDate: new FormControl(''),
    leavingDate: new FormControl(''),
    location: new FormControl('')
  });

  getUserData(){
    this.apiService.getApi(`/user/getProfileDetails`)
    .subscribe((response: any) => {
      // Handle the response        
      if (response.status === 200) {
        console.log('response.data',response.data);
      }else{
        console.log('response.data',response.data);
      }
    });
  }

  saveBasicDetails(){
    this.loader = true;
    if(this.basicDetailsForm.valid){
      const formValue = { ...this.basicDetailsForm.value };
      formValue.gender= this.basicDetailsForm.get('gender')?.value.value
      formValue.relationshipStatus= this.basicDetailsForm.get('relationshipStatus')?.value.value

      this.apiService.postApi(`/user/saveUserDetails`, formValue)
      .subscribe((response: any) => {
        // Handle the response        
        if (response.status === 200) {
          this.loader = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Details Saved SuccessFully!',
          });
          this.educationalDetailsView = true;
          this.basicDetailsView = false;
          this.workExperienceView = false;
        }else{
          this.loader = false;
          this.messageService.add({
            severity: 'danger',
            summary: 'Danger',
            detail: 'Something went wrong!',
          });  
        }
      });
    }else{
      this.loader = false;
    }
  }

  nextEducationalDetails(){
    if(this.educationalForm.valid){
      const formValue = { ...this.educationalForm.value };
      this.apiService.postApi('/user/saveEducationalDetails', formValue)
      .subscribe((response: any) => {
        // Handle the response
        if (response.status === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Details Saved SuccessFully!',
          });
        }else{
          this.messageService.add({
            severity: 'danger',
            summary: 'Danger',
            detail: 'Something went wrong!',
          });    
        }
      });

      this.loader = false;
      this.educationalDetailsView = true;
      this.basicDetailsView = false;
      this.workExperienceView = false;
    }else{
      this.loader = false;
    }
    this.educationalDetailsView = false;
    this.basicDetailsView = false;
    this.workExperienceView = true;
  }

  nextWorkExperience(){
    if(this.workExperienceForm.valid){
      const formValue = { ...this.workExperienceForm.value };
      this.apiService.postApi('/user/saveWorkExperienceDetails', formValue)
      .subscribe((response: any) => {
        // Handle the response
        if (response.status === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Details Saved SuccessFully!',
          });
        }else{
          this.messageService.add({
            severity: 'danger',
            summary: 'Danger',
            detail: 'Something went wrong!',
          });    
        }
      });

      this.loader = false;
      this.educationalDetailsView = true;
      this.basicDetailsView = false;
      this.workExperienceView = false;
    }else{
      this.loader = false;
    }
    this.educationalDetailsView = false;
    this.basicDetailsView = true;
    this.workExperienceView = false;
  }

  genderViewedOptions: ViewOption[] = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Others', label: 'Others' }
    ];

    relationViewedOptions: ViewOption[] = [
      { value: 'Single', label: 'Single' },
      { value: 'Married', label: 'Married' },
      { value: 'Divorced', label: 'Divorced' },
      { value: 'Widowed', label: 'Widowed' }
      ];

}
