import { SegmentSpec } from './SegmentSpec';
import { ElementSpec } from './ElementSpec';
import { Segment } from './Segment';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';

/**
 * In memory EDI specifications (data dictionary).
 */
export class EdiSpec {
  static lookupSegmentSpec(tag: string): SegmentSpec | undefined {
    return EdiSpec.TAG_LOOKUP.get(tag);
  }

  static readonly ISA: SegmentSpec = {
    tag: "ISA",
    name: "Interchange Control Header",
    elements: [
      {
        name: "Authorization Information Qualifier"
      },
      {
        name: "Authorization Information"
      },
      {
        name: "Security Information Qualifier"
      },
      {
        name: "Security Information"
      },
      {
        name: "Interchange ID Qualifier"
      },
      {
        name: "Interchange Sender ID"
      },
      {
        name: "Interchange ID Qualifier"
      },
      {
        name: "Interchange Receiver ID"
      },
      {
        name: "Interchange Date"
      },
      {
        name: "Interchange Time"
      },
      {
        name: "Interchange Control Standards"
      },
      {
        name: "Interchange Control Version Number"
      },
      {
        name: "Interchange Control Number"
      },
      {
        name: "Acknowledgment Requested"
      },
      {
        name: "Usage Indicator"
      },
      {
        name: "Component Element Separaotr"
      }
    ]
  };

  static readonly IEA: SegmentSpec = {
    tag: "IEA",
    name: "Interchange Control Trailer",
    elements: [
      {
        name: "Number of Included Functional Groups"
      },
      {
        name: "Interchange Control Number"
      }
    ]
  };

  static readonly GS: SegmentSpec = {
    tag: "GS",
    name: "Functional Group Header",
    elements: [
      {
        name: "Functional Identifier Code"
      },
      {
        name: "Application Sender's Code"
      },
      {
        name: "Application Receiver's Code"
      },
      {
        name: "Date"
      },
      {
        name: "Time"
      },
      {
        name: "Group Control Number"
      },
      {
        name: "Responsible Agency Code"
      },
      {
        name: "Version / Release / Industry Identifier"
      }
    ]
  };

  static readonly GE: SegmentSpec = {
    tag: "GE",
    name: "Functional Group Trailer",
    elements: [
      {
        name: "Number of Transaction Sets Included",
      },
      {
        name: "Group Control Number",
      }
    ]
  };

  static readonly ST: SegmentSpec = {
    tag: "ST",
    name: "Transaction Set Header",
    elements: [
      {
        name: "Transaction Set Identifier Code",
        codeNameLookup: new Map([
          ["856", "Ship Notice/Manifest"]
        ])

      },
      {
        name: "Transaction Set Control Number"
      }
    ]
  };

  static readonly SE: SegmentSpec = {
    tag: "SE",
    name: "Transaction Set Trailer",
    elements: [
      {
        name: "Number of Included Segments"
      },
      {
        name: "Transaction Set Control Number"
      }
    ]
  };

  static readonly BSN: SegmentSpec = {
    tag: "BSN",
    name: "Beginning Segment for Ship Notice",
    elements: [
      {
        name: "Transaction Set Purpose Code",
        codeNameLookup: new Map([
          ["00", "Original"],
          ["01", "Cancellation"],
          ["05", "Replace"]
        ])
      },
      {
        name: "Shipment Identification"
      },
      {
        name: "Date"
      },
      {
        name: "Time"
      }, ,
      {
        name: "Transaction Type Code",
        codeNameLookup: new Map([
          ["PZ", "Purchase Report"],
          ["TS", "Transfer Statement"]
        ])
      },
    ]
  };

  static readonly ALL_SPECS = [
    EdiSpec.BSN,
    EdiSpec.GE,
    EdiSpec.GS,
    EdiSpec.IEA,
    EdiSpec.ISA,
    EdiSpec.SE,
    EdiSpec.ST
    // Add other specs here so that they can be added to lookup by EDI tag.
  ];

  static createTagLookup(segmentSpecs: SegmentSpec[]): Map<string, SegmentSpec> {
    let result: Map<string, SegmentSpec> = new Map<string, SegmentSpec>();
    for (let segmentSpec of segmentSpecs) {
      result.set(segmentSpec.tag, segmentSpec);
    }
    return result;
  }
  static readonly TAG_LOOKUP: Map<string, SegmentSpec> = EdiSpec.createTagLookup(EdiSpec.ALL_SPECS);

}