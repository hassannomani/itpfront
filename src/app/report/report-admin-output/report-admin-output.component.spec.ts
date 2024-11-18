import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAdminOutputComponent } from './report-admin-output.component';

describe('ReportAdminOutputComponent', () => {
  let component: ReportAdminOutputComponent;
  let fixture: ComponentFixture<ReportAdminOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAdminOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAdminOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
