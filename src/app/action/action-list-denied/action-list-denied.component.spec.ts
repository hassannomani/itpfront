import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionListDeniedComponent } from './action-list-denied.component';

describe('ActionListDeniedComponent', () => {
  let component: ActionListDeniedComponent;
  let fixture: ComponentFixture<ActionListDeniedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionListDeniedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionListDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
