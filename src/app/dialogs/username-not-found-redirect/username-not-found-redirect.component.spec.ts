import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameNotFoundRedirectComponent } from './username-not-found-redirect.component';

describe('UsernameNotFoundRedirectComponent', () => {
  let component: UsernameNotFoundRedirectComponent;
  let fixture: ComponentFixture<UsernameNotFoundRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernameNotFoundRedirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsernameNotFoundRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
