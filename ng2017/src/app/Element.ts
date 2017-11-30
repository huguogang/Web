import { ElementSpec } from './ElementSpec'
import {
  X12Element, X12FunctionalGroup, X12Interchange,
  X12Parser, X12QueryEngine, X12Segment, X12Transaction
} from 'x12/core';

/**
 * EDI element view model.
 */
export class Element {
  spec: ElementSpec;
  rawEdi: string;
  // Name of the code. Available only if element is look up code, and
  // matching data dictionary entry exists.
  codeName: string;
}