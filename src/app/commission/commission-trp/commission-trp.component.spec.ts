import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionTrpComponent } from './commission-trp.component';

describe('CommissionTrpComponent', () => {
  let component: CommissionTrpComponent;
  let fixture: ComponentFixture<CommissionTrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionTrpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommissionTrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
