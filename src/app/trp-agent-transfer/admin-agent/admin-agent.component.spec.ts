import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTransferPendingAgentReqComponent } from './admin-agent.component';

describe('AdminAgentComponent', () => {
  let component: AdminTransferPendingAgentReqComponent;
  let fixture: ComponentFixture<AdminTransferPendingAgentReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTransferPendingAgentReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTransferPendingAgentReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
