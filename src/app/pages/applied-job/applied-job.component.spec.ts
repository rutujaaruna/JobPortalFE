import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedJobComponent } from './applied-job.component';

describe('AppliedJobComponent', () => {
  let component: AppliedJobComponent;
  let fixture: ComponentFixture<AppliedJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppliedJobComponent]
    });
    fixture = TestBed.createComponent(AppliedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
