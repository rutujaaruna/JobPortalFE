import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
// import jwt_decode from "jwt-decode";
// import { SocketService } from '../socket/socket.service';

type UserTokenType = {
  exp: number;
  iat: number;
  id: {
    accountStatus: string;
    batchYear: string;
    dateOfBirth: null | string; // Can be null or a string
    email: string;
    firstName: string;
    gender: string;
    lastLoginDate: string;
    isVerified:number | boolean;
    lastName: string;
    middleName: string;
    password: string;
    prefix: string;
    profilePic: string;
    registrationDate: string;
    role: string;
  };
  
};
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  router: Router = inject(Router);
  //array of months
  getMonths: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  // Define the academic streams as an array of objects
  academicStreams: { name: string }[] = [
    {
      name: 'Science'
    },
    {
      name: 'Commerce'
    },
    {
      name: 'Arts'
    }
  ];

  //array of years
  getYears(): number[] {
    const startYear = 1990;
    const endYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = startYear; year <= endYear; year++) {
      yearsArray.push(year);
    }
    return yearsArray;
  }
  getExperience() {
    const experienceYear: { label: string; value: number }[] = [];
    for (let i = 0; i <= 50; i++) {
      experienceYear.push({ label: i.toString(), value: i });
    }
    return experienceYear;
  }

  decodeJwtToken(jwt: string) {
    // const decoded: UserTokenType = jwt_decode(jwt);
    // return decoded.id;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }


}
