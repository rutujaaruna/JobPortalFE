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
    
    export interface appliedData {
    applicantEmail: string;
    applicantFullName: string;
    applicantRelevantSkills: string;
    applicantResumePath: string;
    createdAt: Date;
    deletedAt: Date | null;
    jobApplicantId: number;
    designation: string;
    applicationStatus:string;
    updatedAt: Date;
    mobileNo:string
    }

    export interface jobApplicantData {
      postedJobDetails: jobDetails[];
      totalCount: number;
    }

    export interface jobAppliedApplicant {
      jobAppliedData: appliedDataByUser[];
      total: number;
      }

      export interface appliedDataByUser {
        applicantEmail: string;
        applicantFullName: string;
        applicantRelevantSkills: string;
        applicantResumePath: string;
        createdAt: Date;
        deletedAt: Date | null;
        jobApplicantId: number;
        designation: string;
        reference: string;
        userId:number;
        applicationStatus:string;
        updatedAt: Date;
        }

        export interface jobSeekerDetails {
          jobSeekerData: jobSeekerData[];
          total: number;
          }      
          
          export interface jobSeekerData {
            applicantEmail: string;
            applicantFullName: string;
            applicantRelevantSkills: string;
            applicantResumePath: string;
            createdAt: Date;
            deletedAt: Date | null;
            jobApplicantId: number;
            mobileNumber:number;
            designation: string;
            reference: string;
            updatedAt: Date;
            user:User;
            }
        

            export interface resumeDataByUser {
              applicantEmail: string;
              applicantFullName: string;
              applicantRelevantSkills: string;
              applicantResumePath: string;
              createdAt: Date;
              deletedAt: Date | null;
              jobApplicantId: number;
              mobileNumber:number;
              designation: string;
              updatedAt: Date;
            }

            export interface resumeData {
              resumeData: resumeDataByUser;
            }



            export interface User {
              id: number;
              email: string;
              password: string;
              firstName: string;
              lastName: string;
              middleName: string;
              dateOfBirth: Date;
              gender: string;
              role: string;
              profilePic:string;
              profileVisit: boolean;
              created_at: Date;
              updated_at: Date;
            }
            
            export interface jobAlumniApplied {
              JobApplicant: JobApplicant[];
              total:number
            }            

            export interface JobApplicant {
              jobApplicantId: number;
              applicantEmail: string;
              applicantFullName: string;
              applicantRelevantSkills: string;
              applicationStatus:string;
              applicantResumePath: string;
              reference: string;
              noteForRecruiter: string;
              createdAt: Date;
              updatedAt: Date;
              deletedAt: Date | null;
              job: Job;
            }

            export interface Job {
              jobId: number;
              jobTitle: string;
              companyName: string;
              companyWebsite: string;
              experienceFrom: number;
              experienceTo: number;
              contactEmail: string;
              jobLocation: string;
              skills: string[]; // Assuming skills is an array of strings
              salaryPackage: string;
              salaryStipend: string;
              applicationDeadline: Date;
              jobsDescription: string;
              filePath: string;
              role: string | null; // You can adjust the type based on your data
              industryType: string | null; // You can adjust the type based on your data
              employmentType: string | null; // You can adjust the type based on your data
              department: string | null; // You can adjust the type based on your data
              education: string | null; // You can adjust the type based on your data
              jobType: string;
              createdAt: Date;
              updatedAt: Date;
            }