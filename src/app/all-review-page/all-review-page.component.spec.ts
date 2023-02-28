import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReviewPageComponent } from './all-review-page.component';

describe('AllReviewPageComponent', () => {
  let component: AllReviewPageComponent;
  let fixture: ComponentFixture<AllReviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllReviewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
