import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbrMenuComponent } from './nbr-menu.component';

describe('AgentMenuComponent', () => {
  let component: NbrMenuComponent;
  let fixture: ComponentFixture<NbrMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NbrMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NbrMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
