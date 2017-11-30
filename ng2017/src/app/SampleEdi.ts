/**
 * In memory database of sample EDI data.
 */
export class SampleEdi {
  public static readonly SAMPLES: any[] = [
    // Overly simplified EDI 856 as a show case.
    {
      name: "EDI 856",
      sampleString:
        'ISA*00*          *00*          *14*1260968381     *01*0006090241TEST *160913*1107*U*00401*111111111*0*T*|~' +
        'GS*SH*TEST1126096838*060902413ZZ*0160915*100425*9*X*004010~' +
        'ST*856*1000~' +
        'BSN*00*122*20161010*100425**PZ~' +
        'SE*3*1000~' +
        'GE*1*9~' +
        'IEA*1*111111111~'
    }];
}