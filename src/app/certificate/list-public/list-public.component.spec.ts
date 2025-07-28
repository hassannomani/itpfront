import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPublicComponent } from './list-public.component';

describe('ListPublicComponent', () => {
  let component: ListPublicComponent;
  let fixture: ComponentFixture<ListPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
