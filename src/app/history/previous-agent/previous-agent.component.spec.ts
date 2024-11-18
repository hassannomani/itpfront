import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousAgentComponent } from './previous-agent.component';

describe('PreviousAgentComponent', () => {
  let component: PreviousAgentComponent;
  let fixture: ComponentFixture<PreviousAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
