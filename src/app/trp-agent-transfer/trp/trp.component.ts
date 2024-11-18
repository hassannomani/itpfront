import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Title} from "@angular/platform-browser";
import { forkJoin } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FormControl, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';
import { TransferService } from 'src/app/services/transfer-service/transfer.service';
import { AgentService } from 'src/app/services/agent-service/agent.service';
@Component({
  selector: 'app-trp',
  templateUrl: './trp.component.html',
  styleUrls: ['./trp.component.css']
})
export class TrpComponent implements OnInit{

  buttonLabel: string = "Submit"
  buttonColor: string = "primary"
  buttonType: string = "button"
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message : string = ""
  localStoreObj : any = {}
  username : string = ""
  agents: any = []
  agentPrev: any = ""
  trpData: any = {}
  submitted: boolean = false
  tranferForm = new FormGroup({
    'username': new FormControl({value:'',disabled:true},[Validators.required]),
    'role': new FormControl({value:'',disabled:true},[Validators.required]),
    'agent': new FormControl({value:'',disabled:true},[Validators.required]),
    'requestedBy' : new FormControl({value:'',disabled:true},[Validators.required],),
    'requestedType' : new FormControl({value:'',disabled:true},[Validators.required]),
    'requestFor' : new FormControl('',[Validators.required]),
    'previouslyAssigned' : new FormControl({value:'',disabled:true},[Validators.required]),
    'previouslyAssignedName' : new FormControl({value:'',disabled:true},[Validators.required]),
    'requestForType' : new FormControl('',[Validators.required]),  //agent
    'reason' : new FormControl('',[Validators.required]), //trp
    'filePath' : new FormControl(''), //trp,
    'status': new FormControl('')
  })

  constructor(
    private router: Router,
    private titleService:Title,
    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private representativeServ: RepresentativeService,
    private transferServ: TransferService,
    private agentServ: AgentService,
    private _snackBar: MatSnackBar
  ){
    this.titleService.setTitle("Transfer Request");
  }

  ngOnInit(): void {
    let temp = this.localStore.getStorageItems()
    this.username = temp.username!=null?JSON.parse(temp.username):""
    let role = temp.role!=null?JSON.parse(temp.role):""

    forkJoin([this.agentServ.getAll(),this.representativeServ.getTheAgentDetails(this.username)])
      .subscribe({
        next: (data) => {
          this.trpData = data[1]
          this.agentPrev = data[1].tin
          this.agents = data[0]
          this.tranferForm.get('username')?.setValue(this.username)
          this.tranferForm.get('role')?.setValue("ROLE_REPRESENTATIVE")
          this.tranferForm.get('requestForType')?.setValue("ROLE_AGENT")
          this.tranferForm.get('previouslyAssigned')?.setValue(this.agentPrev)
          this.tranferForm.get('agent')?.setValue(this.trpData.name)
        },
        error: (e) => {
          console.log("Error retrieving")
        }
      });

    
  }

  requestSubmit(){
    this.tranferForm.value['requestedBy']=this.username
    this.tranferForm.value['requestedType']="ROLE_REPRESENTATIVE"
    this.tranferForm.value['requestForType']="ROLE_AGENT"
    this.tranferForm.value['previouslyAssigned']=this.agentPrev
    this.tranferForm.value['previouslyAssignedName']=this.trpData.name
    this.tranferForm.value['status']="0"
    this.tranferForm.value['previouslyAssignedName']=this.trpData.name

    this.transferServ.save(this.tranferForm.value).subscribe({
      next: (data) => {
        if(data==true||data=="true"){
          this.message = "Request Sent Successfully"
          this.tranferForm.reset();
          this.submitted = true
          this.openSnackBar()
        } 
        else if(data==false||data=="false"){
          this.message = "Already a req is sent. Please wait for the reply"
          this.openSnackBar()
        }
      },
      error: (e) => {
        this.message = e
        this.openSnackBar()

      } 
    })
  }

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }

}
