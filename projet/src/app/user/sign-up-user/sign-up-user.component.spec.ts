import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpUserComponent } from './sign-up-user.component';

describe('SignUpUserComponent', () => {
  let component: SignUpUserComponent;
  let fixture: ComponentFixture<SignUpUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
