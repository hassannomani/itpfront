import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSavedModalComponent } from './data-saved-modal.component';

describe('DataSavedModalComponent', () => {
  let component: DataSavedModalComponent;
  let fixture: ComponentFixture<DataSavedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSavedModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSavedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
