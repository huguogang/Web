import { Component, Input, OnInit } from '@angular/core';
import { Segment } from '../Segment';

/**
 * View of EDI segment.
 */
@Component({
  selector: 'segment-view',
  templateUrl: './segment-view.component.html',
  styleUrls: ['./segment-view.component.css']
})
export class SegmentViewComponent implements OnInit {
  // Main view model.
  @Input() segment: Segment;
  constructor() { }
  ngOnInit() {
  }
  handleClick() {
    this.segment.isExpanded = !this.segment.isExpanded;
  }
}
