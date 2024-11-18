import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentChangeTRPComponent } from './agent.component';

describe('AgentChangeTRPComponent', () => {
  let component: AgentChangeTRPComponent;
  let fixture: ComponentFixture<AgentChangeTRPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentChangeTRPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentChangeTRPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
