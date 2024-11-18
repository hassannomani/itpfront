import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAgentComponent } from './report-agent.component';

describe('ReportAgentComponent', () => {
  let component: ReportAgentComponent;
  let fixture: ComponentFixture<ReportAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
