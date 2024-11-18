import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPendingComponent } from './bill-pending.component';

describe('BillPendingComponent', () => {
  let component: BillPendingComponent;
  let fixture: ComponentFixture<BillPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
