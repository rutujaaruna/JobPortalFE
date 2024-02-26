export interface jobDetails {
    applicationDeadline: Date;
    companyName: string;
    companyWebsite: string;
    contactEmail: string;
    experienceFrom: number;
    experienceTo: number;
    jobId: number;
    jobLocation: string;
    jobTitle: string;
    jobType: string;
    jobsDescription: string;
    salaryPackage: string;
    salaryStipend: string;
    skills: string[];
    role: string;
    industryType: string;
    department: string;
    employmentType: string;
    education: string;
    createdAt: Date;
    updatedAt: Date;
    timeAgo:string;
  }
  
  export type jobData = {
    postedJobDetails: jobDetails[];
    total: number;
  };

  export interface jobDescription {
    applicationDeadline: Date;
    companyName: string;
    companyWebsite: string;
    contactEmail: string;
    experienceFrom: number;
    experienceTo: number;
    filePath: string;
    jobId: number;
    jobLocation: string;
    jobTitle: string;
    jobType: string;
    jobsDescription: string;
    salaryPackage: string;
    salaryStipend: string;
    skills: string[];
    role: string;
    industryType: string;
    department: string;
    employmentType: string;
    education: string;
    createdAt:Date;
    updatedAt:Date;
    timeAgo:string;
  }

  // export interface appliedData {
  //   getUserAppliedJobByUser: appliedDataByUser[];
  //   }
    
    export interface appliedData {
    applicantEmail: string;
    applicantFullName: string;
    applicantRelevantSkills: string;
    applicantResumePath: string;
    createdAt: Date;
    deletedAt: Date | null;
    jobApplicantId: number;
    noteForRecruiter: string;
    applicationStatus:string;
    updatedAt: Date;
    mobileNo:string
    }