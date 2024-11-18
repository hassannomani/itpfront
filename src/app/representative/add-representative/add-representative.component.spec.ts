import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRepresentativeComponent } from './add-representative.component';

describe('AddRepresentativeComponent', () => {
  let component: AddRepresentativeComponent;
  let fixture: ComponentFixture<AddRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRepresentativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
