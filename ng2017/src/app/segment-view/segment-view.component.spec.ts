import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentViewComponent } from './segment-view.component';

describe('SegmentViewComponent', () => {
  let component: SegmentViewComponent;
  let fixture: ComponentFixture<SegmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
