import { Component } from '@angular/core';
import {
  X12Element, X12FunctionalGroup, X12Interchange,
  X12Parser, X12QueryEngine, X12Segment, X12Transaction
} from 'x12/core';
import { SampleEdi } from './SampleEdi';
import { EdiProcessor } from './EdiProcessor';
import { Segment } from './Segment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly SAMPLES = SampleEdi.SAMPLES;
  ediDocument: Segment[];

  parse(ediString: string) {
    let rawEdi: string = ediString || this.SAMPLES[0].sampleString;
    console.log(ediString);

    let parser = new X12Parser(true);
    let interchange: X12Interchange = parser.parseX12(rawEdi);
    console.log(interchange);

    let ediProcessor: EdiProcessor = new EdiProcessor();
    this.ediDocument = ediProcessor.process(interchange);
    console.log(this.ediDocument);
  }

  ngOnInit() {
  }
}
