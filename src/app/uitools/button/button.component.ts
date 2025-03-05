import { Component, Input, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports:[MatButtonModule],
  standalone: true

})
export class ButtonComponent implements OnInit{

   
  @Input()
  label: string = "Submit";


  @Input()
  color: string = "primary";

  @Input()
  type: string = "";

  
  @Input()
  disabled: boolean = false;

  ngOnInit(): void {

  }

}
