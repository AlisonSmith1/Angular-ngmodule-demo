import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataOverview } from './data-overview';

describe('DataOverview', () => {
  let component: DataOverview;
  let fixture: ComponentFixture<DataOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
