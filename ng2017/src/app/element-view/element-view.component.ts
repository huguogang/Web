import { Component, Input, OnInit } from '@angular/core';
import {Element} from '../Element'

/**
 * View of EDI element.
 */
@Component({
  selector: 'element-view',
  templateUrl: './element-view.component.html',
  styleUrls: ['./element-view.component.css']
})
export class ElementViewComponent implements OnInit {
  // View model.
  @Input() element: Element;
  constructor() { }
  ngOnInit() {
  }
}
