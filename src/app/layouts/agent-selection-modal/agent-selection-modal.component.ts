import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-agent-selection-modal',
  templateUrl: './agent-selection-modal.component.html',
  styleUrls: ['./agent-selection-modal.component.css']
})
export class AgentSelectionModalComponent {

  title: string="";
  agent_tin: string ="";
  selected : string = ""
  agents: any = []
  constructor(public dialogRef: MatDialogRef<AgentSelectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AgentSelectionDialogModel) {
    // Update view with given values
      this.title = data.title;
      this.agents = data.agents;
      this.selected = data.selected
  }
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(this.agent_tin);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

export class AgentSelectionDialogModel {

  constructor(public title: string, public agents: any, public selected: string) {
  }
}
