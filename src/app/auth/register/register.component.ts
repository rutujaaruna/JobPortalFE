import { Component } from '@angular/core';

interface Role {
  id: number;
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  roles: Role[] = [
    { id: 1, name: 'User' },
    { id: 2, name: 'Recruiter' }
  ];

  constructor() {}

  ngOnInit() {}
}
