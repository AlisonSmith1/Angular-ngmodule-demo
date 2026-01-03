import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityStream } from './activity-stream';

describe('ActivityStream', () => {
  let component: ActivityStream;
  let fixture: ComponentFixture<ActivityStream>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityStream]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityStream);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
