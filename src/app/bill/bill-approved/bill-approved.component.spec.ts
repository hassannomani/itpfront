import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillApprovedComponent } from './bill-approved.component';

describe('BillApprovedComponent', () => {
  let component: BillApprovedComponent;
  let fixture: ComponentFixture<BillApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillApprovedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
