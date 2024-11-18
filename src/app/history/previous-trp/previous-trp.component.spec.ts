import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousTrpComponent } from './previous-trp.component';

describe('PreviousTrpComponent', () => {
  let component: PreviousTrpComponent;
  let fixture: ComponentFixture<PreviousTrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousTrpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousTrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
