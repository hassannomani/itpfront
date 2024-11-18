import { Component,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-details-modal-agent',
  templateUrl: './details-modal-agent.component.html',
  styleUrls: ['./details-modal-agent.component.css']
})
export class DetailsModalAgentComponent {
  title: string="";
  trp_name : string ="";
  username : string ="";
  ag_username: string ="";
  reason: string = "";
  created_at: string = ""
  
  constructor(public dialogRef: MatDialogRef<DetailsModalAgentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetailsModalAgentComponent) {
    this.title = data.title;
    this.trp_name = data.trp_name;
    this.username = data.username;
    this.ag_username = data.ag_username;
    this.reason = data.reason;
    this.created_at = data.created_at;
  }

}

export class DetailsAgentModalModel {

  constructor(public title: string, public trp_name: string,public username: string,public ag_username: string,public reason: string, public created_at: string) {
  }
}
