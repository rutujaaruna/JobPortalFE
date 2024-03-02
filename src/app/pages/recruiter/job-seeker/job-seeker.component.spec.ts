import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerComponent } from './job-seeker.component';

describe('JobSeekerComponent', () => {
  let component: JobSeekerComponent;
  let fixture: ComponentFixture<JobSeekerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobSeekerComponent]
    });
    fixture = TestBed.createComponent(JobSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
