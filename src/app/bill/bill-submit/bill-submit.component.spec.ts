import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillSubmitComponent } from './bill-submit.component';

describe('BillSubmitComponent', () => {
  let component: BillSubmitComponent;
  let fixture: ComponentFixture<BillSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillSubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
