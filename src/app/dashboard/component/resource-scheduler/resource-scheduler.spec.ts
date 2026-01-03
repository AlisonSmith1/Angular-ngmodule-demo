import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceScheduler } from './resource-scheduler';

describe('ResourceScheduler', () => {
  let component: ResourceScheduler;
  let fixture: ComponentFixture<ResourceScheduler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourceScheduler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceScheduler);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
