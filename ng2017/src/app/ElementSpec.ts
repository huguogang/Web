/**
 * Specification of EDI element.
 */
export class ElementSpec {
  name: string;
  // If the element is code. This field provides lookup from code to
  // code name.
  codeNameLookup?: Map<string, string>;
}