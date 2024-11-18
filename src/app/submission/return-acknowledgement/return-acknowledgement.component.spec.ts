import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnAcknowledgementComponent } from './return-acknowledgement.component';

describe('ReturnAcknowledgementComponent', () => {
  let component: ReturnAcknowledgementComponent;
  let fixture: ComponentFixture<ReturnAcknowledgementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnAcknowledgementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnAcknowledgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
