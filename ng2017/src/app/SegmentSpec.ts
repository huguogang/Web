import { ElementSpec } from './ElementSpec';

/**
 * Specification of a EDI segment.
 */
export class SegmentSpec {
  // EDI segment tag. Examples: ISA, GS.
  tag: string;
  name: string;
  // Specification for elements. Index 0 is element position #1 ...
  elements: ElementSpec[];
}