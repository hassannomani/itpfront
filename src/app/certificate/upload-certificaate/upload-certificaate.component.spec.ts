import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCertificaateComponent } from './upload-certificaate.component';

describe('UploadCertificaateComponent', () => {
  let component: UploadCertificaateComponent;
  let fixture: ComponentFixture<UploadCertificaateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCertificaateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadCertificaateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
