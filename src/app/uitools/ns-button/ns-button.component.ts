import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ns-button',
  templateUrl: './ns-button.component.html',
  styleUrls: ['./ns-button.component.css']
})
export class NsButtonComponent {
  @Input()
  ns_label: string = "Submit";


  @Input()
  ns_color: string = "primary";

  @Input()
  ns_type: string = "";

  
  @Input()
  ns_disabled: boolean = false;
}
