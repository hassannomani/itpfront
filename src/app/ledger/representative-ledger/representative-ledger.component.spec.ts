import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativeLedgerComponent } from './representative-ledger.component';

describe('RepresentativeLedgerComponent', () => {
  let component: RepresentativeLedgerComponent;
  let fixture: ComponentFixture<RepresentativeLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepresentativeLedgerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepresentativeLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
