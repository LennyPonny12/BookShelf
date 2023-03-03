import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewProfileItemComponent } from './review-profile-item.component';

describe('ReviewProfileItemComponent', () => {
  let component: ReviewProfileItemComponent;
  let fixture: ComponentFixture<ReviewProfileItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewProfileItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewProfileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
