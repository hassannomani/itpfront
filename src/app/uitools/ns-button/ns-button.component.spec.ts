import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsButtonComponent } from './ns-button.component';

describe('NsButtonComponent', () => {
  let component: NsButtonComponent;
  let fixture: ComponentFixture<NsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
