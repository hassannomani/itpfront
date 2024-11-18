import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRepresentativeComponent } from './agent-representative.component';

describe('AgentRepresentativeComponent', () => {
  let component: AgentRepresentativeComponent;
  let fixture: ComponentFixture<AgentRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentRepresentativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
