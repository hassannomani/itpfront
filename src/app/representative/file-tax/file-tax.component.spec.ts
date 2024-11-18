import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTaxComponent } from './file-tax.component';

describe('FileTaxComponent', () => {
  let component: FileTaxComponent;
  let fixture: ComponentFixture<FileTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileTaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
