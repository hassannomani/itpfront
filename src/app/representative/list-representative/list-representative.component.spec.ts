import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRepresentativeComponent } from './list-representative.component';

describe('ListRepresentativeComponent', () => {
  let component: ListRepresentativeComponent;
  let fixture: ComponentFixture<ListRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRepresentativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
