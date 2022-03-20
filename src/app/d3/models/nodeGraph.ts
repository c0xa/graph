import APP_CONFIG from '../../../../../angular-d3-graph-example/src/app/app.config';
import {ChangeDetectorRef} from "@angular/core";

export class NodeGraph implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: string;
  linkCount: number = 0;

  constructor(id: string, private cd: ChangeDetectorRef) {
    this.id = id;
    console.log(this.id);
    this.cd.markForCheck();
  }

  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  }

  get r() {
    return 50 * this.normal() + 10;
  }

  get fontSize() {
    return (30 * this.normal() + 10) + 'px';
  }

  get color() {
    let index = Math.floor(APP_CONFIG.SPECTRUM.length * this.normal());
    return APP_CONFIG.SPECTRUM[index];
  }
}
