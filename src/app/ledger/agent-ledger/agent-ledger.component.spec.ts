import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLedgerComponent } from './agent-ledger.component';

describe('AgentLedgerComponent', () => {
  let component: AgentLedgerComponent;
  let fixture: ComponentFixture<AgentLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentLedgerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
