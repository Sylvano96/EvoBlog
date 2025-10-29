import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPostsUserComponent } from './details-posts-user.component';

describe('DetailsPostsUserComponent', () => {
  let component: DetailsPostsUserComponent;
  let fixture: ComponentFixture<DetailsPostsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPostsUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPostsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
