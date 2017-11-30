import { Element } from './Element';
import { SegmentSpec } from './SegmentSpec';
import {
  X12Element, X12FunctionalGroup, X12Interchange,
  X12Parser, X12QueryEngine, X12Segment, X12Transaction
} from 'x12/core';

/**
 * EDI segment view model.
 */
export class Segment {
  data: X12Segment;
  elements: Element[];
  spec: SegmentSpec;
  rawEdi: string;
  isExpanded: boolean = false;
}