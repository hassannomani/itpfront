import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFillupComponent } from './register-fillup.component';

describe('RegisterFillupComponent', () => {
  let component: RegisterFillupComponent;
  let fixture: ComponentFixture<RegisterFillupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFillupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFillupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
