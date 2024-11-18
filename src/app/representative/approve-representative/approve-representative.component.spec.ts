import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRepresentativeComponent } from './approve-representative.component';

describe('ApproveRepresentativeComponent', () => {
  let component: ApproveRepresentativeComponent;
  let fixture: ComponentFixture<ApproveRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveRepresentativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
