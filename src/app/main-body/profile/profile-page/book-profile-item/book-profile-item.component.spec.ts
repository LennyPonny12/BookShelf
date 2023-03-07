import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookProfileItemComponent } from './book-profile-item.component';

describe('BookProfileItemComponent', () => {
  let component: BookProfileItemComponent;
  let fixture: ComponentFixture<BookProfileItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookProfileItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookProfileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
