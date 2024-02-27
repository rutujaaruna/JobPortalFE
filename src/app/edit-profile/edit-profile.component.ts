import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EducationalDetail, UserDetails, UserDetailsData, WorkingDetailsData } from '../types/profile.type';

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
  eduFormView:boolean = false;
  workFormView:boolean = false;
  userData!:UserDetails; 
  userBasicData!:UserDetailsData[];
  eduData!:EducationalDetail[];
  workExpData!:WorkingDetailsData[];
  profileCompleteness:number = 10;

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
    eduId:new FormControl(''),
    programDegree: new FormControl('', [Validators.required]),
    collegeName: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required])
  });
  workExperienceForm: FormGroup = new FormGroup({
    workId:new FormControl(''),
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
        this.userData = response.data;
        this.workExpData = this.userData.workingDetails;
        this.eduData = this.userData.educationalDetails;
        this.userBasicData = this.userData.userDetails;

        this.basicDetailsForm.patchValue({
          firstName: this.userData?.firstName,
          lastName: this.userData?.lastName,
          middleName: this.userData?.middleName,
          dateOfBirth: new Date(this.userData?.dateOfBirth),
          gender:  this.userData?.gender,
          location: this.userBasicData[0].location,
          address: this.userBasicData[0].address,
          email: this.userData?.email,
          mobileNo: this.userBasicData[0]?.mobileNo,
          bloodGroup: this.userBasicData[0].bloodGroup,
          relationshipStatus: this.userBasicData[0].relationshipStatus,
          nationality:this.userBasicData[0].nationality
        })

        this.profileCompleteness = this.workExpData && this.eduData && this.userBasicData && this.userData ? 98 : this.eduData && this.userBasicData && this.userData ? 74 : this.userBasicData && this.userData ? 48 : this.userData ? 24 : 18 ;
      }
    });
  }

  viewBasicDetails(){
    this.educationalDetailsView = false;
    this.basicDetailsView = true;
    this.workExperienceView = false;  
  }

  nextBasicDetails(){
    if(this.userBasicData){
      this.educationalDetailsView = true;
      this.basicDetailsView = false;
      this.workExperienceView = false;
    }
  }

  saveBasicDetails(){
    this.loader = true;
    if(this.basicDetailsForm.valid){
      const formValue = { ...this.basicDetailsForm.value };
      formValue.gender= this.basicDetailsForm.get('gender')?.value.value || this.basicDetailsForm.get('gender')?.value;
      formValue.relationshipStatus= this.basicDetailsForm.get('relationshipStatus')?.value.value || this.basicDetailsForm.get('relationshipStatus')?.value;

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
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong!',
          });  
        }
      });
    }else{
      this.loader = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill required fields!',
      });  
    }
  }

  nextEducationalDetails(){
    if(this.eduData){
      this.educationalDetailsView = false;
      this.basicDetailsView = false;
      this.workExperienceView = true;
    }
  }

  saveEducationalDetails(){
    if(this.educationalForm.valid){
      const formValue = { ...this.educationalForm.value };
      const eduId = formValue.eduId;
      delete formValue.eduId;
      this.apiService.postApi(`/user/saveEducationalDetails?eduId=${eduId}`, formValue)
      .subscribe((response: any) => {
        // Handle the response
        if (response.status === 200) {
          this.getUserData();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Details Saved SuccessFully!',
          });
          this.eduFormView = false;
        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong!',
          });    
        }
      });
    }else{
      this.loader = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill required fields!',
      });   
    }
  }

  addEdu(){    
      this.eduFormView = true;
  }

  editEduForm(data:EducationalDetail){
    this.eduFormView = true;
    this.educationalForm.patchValue({
      eduId: data.eduId,
      programDegree: data.programDegree,
      collegeName: data.collegeName,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      location: data.location
    })
  }

  // Work Experience
  saveWorkExperience(){
    if(this.workExperienceForm.valid){
      const formValue = { ...this.workExperienceForm.value };
      const workId = formValue.workId;
      delete formValue.workId;
      this.apiService.postApi(`/user/saveWorkExperienceDetails?workId=${workId}`, formValue)
      .subscribe((response: any) => {
        // Handle the response
        if (response.status === 200) {
          this.getUserData();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Details Saved SuccessFully!',
          });
          this.workFormView = false;
        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong!',
          });    
        }
      });
    }else{
      this.loader = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields',
      });    
    }
  }

  addWorkExp(){    
    this.workFormView = true;
}

editWorkExp(data:WorkingDetailsData){  
  this.workFormView = true;
  this.workExperienceForm.patchValue({
    workId: data.workId,
    designation: data.designation,
    companyName: data.companyName,
    joiningDate: new Date(data.joiningDate),
    leavingDate: new Date(data.leavingDate),
    location: data.location
  })
}

goToJobBoard(){
  this.router.navigate(['/pages/user/job-list'])
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
