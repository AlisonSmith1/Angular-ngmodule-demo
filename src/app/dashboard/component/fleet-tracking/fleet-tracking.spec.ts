import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetTracking } from './fleet-tracking';

describe('FleetTracking', () => {
  let component: FleetTracking;
  let fixture: ComponentFixture<FleetTracking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FleetTracking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetTracking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
