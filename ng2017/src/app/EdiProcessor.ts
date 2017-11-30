import {
  X12Element, X12FunctionalGroup, X12Interchange,
  X12Parser, X12QueryEngine, X12Segment, X12Transaction
} from 'x12/core';
import { Element } from './Element'
import { EdiSpec } from './EdiSpec'
import { Segment } from './Segment'
import { SegmentSpec } from './SegmentSpec'

export class EdiProcessor {
  processResult: Segment[] = [];

  process(interchange: X12Interchange): Segment[] {
    this.processSegment(interchange.header);
    for (let functionalGroup of interchange.functionalGroups) {
      this.processFunctionalGroup(functionalGroup);
    }
    this.processSegment(interchange.trailer);
    return this.processResult;
  }
  processFunctionalGroup(functionalGroup: X12FunctionalGroup): void {
    this.processSegment(functionalGroup.header);
    for (let transaction of functionalGroup.transactions) {
      this.processTransaction(transaction);
    }
    this.processSegment(functionalGroup.trailer);
  }
  processTransaction(transaction: X12Transaction): void {
    this.processSegment(transaction.header);
    for (let segment of transaction.segments) {
      this.processSegment(segment);
    }
    this.processSegment(transaction.trailer);
  }
  processSegment(segment: X12Segment): void {
    let result: Segment = new Segment();
    result.data = segment;
    let segmentSpec: SegmentSpec = EdiSpec.lookupSegmentSpec(segment.tag);
    result.spec = segmentSpec;
    result.rawEdi = segment.toString();
    result.elements = [];
    for (let idx = 0; idx < segment.elements.length; idx++) {
      let element: Element = new Element();
      element.rawEdi = segment.elements[idx].value;

      if (segmentSpec && segmentSpec.elements) {
        element.spec = segmentSpec.elements[idx];
        if (element.spec && element.spec.codeNameLookup) {
          element.codeName = element.spec.codeNameLookup.get(element.rawEdi) || "Code Not in Data Dictionary";
        }
      }

      result.elements.push(element);
    }
    this.processResult.push(result);
  }
}