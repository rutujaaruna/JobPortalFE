import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { UtilService } from '../utils/util.service';
import { AuthService } from '../services/auth.service';
// import { firstValueFrom } from "rxjs";

// Function to guard routes and allow access only to admin users
export const userRouteGuard = async (next: ActivatedRouteSnapshot) => {
  // Injecting utility service and router for navigation
  const utilService = inject(UtilService);
  const router = inject(Router);
  // const authService = inject(AuthService);

  // Retrieving authentication token from local storage
  const authToken = localStorage.getItem('token');
  // Checking if authentication token is not present
  if (!authToken) {
    // Navigating to the login route if not authenticated
    router.navigate(['auth', 'login']);
    // Returning false to indicate restricted access
    return false;
  }

  // Decoding the JWT token
  const decodeToken = utilService.decodeJwtToken(authToken);

  // const {email, isVerified, role}=decodeToken;

  // const endPointName=`/auth/roleBasedRouteAccess?email=${email}&isVerified=${isVerified}&role=${role}`;
  // const currentPath = next.routeConfig.path;

  // const b:any = await firstValueFrom(authService.authGetApi(endPointName));

  // Checking if the decoded token exists and the user has admin role
  if (authToken && decodeToken.role === 'user') {
    // Returning true to indicate access allowed for admin
    return true;
  } else {
    // Navigating to the login route if the user is not an admin
    router.navigate(['auth', 'login']);
    // Returning false to indicate restricted access
    return false;
  }
};

// Function to guard routes and allow access only to admin users
export const recruiterRouteGuard = async () => {
  // Injecting utility service and router for navigation
  const utilService = inject(UtilService);
  const router = inject(Router);

  // Retrieving authentication token from local storage
  const authToken = localStorage.getItem('token');
  // Checking if authentication token is not present
  if (!authToken) {
    // Navigating to the login route if not authenticated
    router.navigate(['auth', 'login']);
    // Returning false to indicate restricted access
    return false;
  }

  // Decoding the JWT token
  const decodeToken = utilService.decodeJwtToken(authToken);

  // Checking if the decoded token exists and the user has admin role
  if (decodeToken && decodeToken.role === 'recruiter') {
    // Returning true to indicate access allowed for admin
    return true;
  } else {
    // Navigating to the login route if the user is not an admin
    router.navigate(['auth', 'login']);
    // Returning false to indicate restricted access
    return false;
  }
};
