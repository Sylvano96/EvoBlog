import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllUsersComponent } from './list-all-users.component';

describe('ListAllUsersComponent', () => {
  let component: ListAllUsersComponent;
  let fixture: ComponentFixture<ListAllUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAllUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
