import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativeMenuComponent } from './representative-menu.component';

describe('RepresentativeMenuComponent', () => {
  let component: RepresentativeMenuComponent;
  let fixture: ComponentFixture<RepresentativeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepresentativeMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepresentativeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
