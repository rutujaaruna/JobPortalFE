
  export interface UserDetails {
    created_at: Date;
    dateOfBirth: Date;
    educationalDetails: EducationalDetail[];
    email: string;
    firstName: string;
    gender: string;
    id: number;
    lastName: string;
    middleName: string;
    password: string;
    profileVisit: boolean;
    role: string;
    profilePic: string;
    updated_at: Date;
    userDetails: UserDetailsData[];
    workingDetails: WorkingDetailsData[];   }
  
  export interface EducationalDetail {
    collegeName: string;
    eduId: number;
    endDate: Date;
    location: string;
    programDegree: string;
    startDate: Date;
    userId:number;
  }
  
  export interface UserDetailsData {
    address: string;
    bloodGroup: string;
    detailsId: number;
    linkedinProfile: string | null;
    location: string;
    mobileNo: string;
    nationality: string;
    relationshipStatus: string;
    userId:number;
    }

  export interface WorkingDetailsData {
    companyName: string;
    workId: number;
    leavingDate: Date;
    location: string;
    designation: string;
    joiningDate: Date;
    userId: number;
  }
  