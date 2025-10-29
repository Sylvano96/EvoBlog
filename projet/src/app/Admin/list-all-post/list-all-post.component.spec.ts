import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllPostComponent } from './list-all-post.component';

describe('ListAllPostComponent', () => {
  let component: ListAllPostComponent;
  let fixture: ComponentFixture<ListAllPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAllPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
