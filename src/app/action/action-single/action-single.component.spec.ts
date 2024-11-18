import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSingleComponent } from './action-single.component';

describe('ActionSingleComponent', () => {
  let component: ActionSingleComponent;
  let fixture: ComponentFixture<ActionSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
