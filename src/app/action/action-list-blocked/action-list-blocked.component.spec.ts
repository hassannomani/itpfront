import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionListBlockedComponent } from './action-list-blocked.component';

describe('ActionListBlockedComponent', () => {
  let component: ActionListBlockedComponent;
  let fixture: ComponentFixture<ActionListBlockedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionListBlockedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionListBlockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
