import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRejectedComponent } from './bill-rejected.component';

describe('BillRejectedComponent', () => {
  let component: BillRejectedComponent;
  let fixture: ComponentFixture<BillRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillRejectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
