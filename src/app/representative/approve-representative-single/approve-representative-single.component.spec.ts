import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRepresentativeSingleComponent } from './approve-representative-single.component';

describe('ApproveRepresentativeSingleComponent', () => {
  let component: ApproveRepresentativeSingleComponent;
  let fixture: ComponentFixture<ApproveRepresentativeSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveRepresentativeSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveRepresentativeSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
