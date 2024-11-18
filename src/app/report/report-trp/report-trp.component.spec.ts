import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTrpComponent } from './report-trp.component';

describe('ReportTrpComponent', () => {
  let component: ReportTrpComponent;
  let fixture: ComponentFixture<ReportTrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTrpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportTrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
