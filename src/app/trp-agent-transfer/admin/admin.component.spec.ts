import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTransferPendingTRPComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminTransferPendingTRPComponent;
  let fixture: ComponentFixture<AdminTransferPendingTRPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTransferPendingTRPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTransferPendingTRPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
