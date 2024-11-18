import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsModalAgentComponent } from './details-modal-agent.component';

describe('DetailsModalAgentComponent', () => {
  let component: DetailsModalAgentComponent;
  let fixture: ComponentFixture<DetailsModalAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsModalAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsModalAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
