import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSelectionModalComponent } from './agent-selection-modal.component';

describe('AgentSelectionModalComponent', () => {
  let component: AgentSelectionModalComponent;
  let fixture: ComponentFixture<AgentSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentSelectionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
