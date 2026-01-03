import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsInsights } from './analytics-insights';

describe('AnalyticsInsights', () => {
  let component: AnalyticsInsights;
  let fixture: ComponentFixture<AnalyticsInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalyticsInsights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsInsights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
