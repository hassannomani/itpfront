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
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentChangeTRPComponent implements OnInit{

  buttonLabel: string = "Search"
  buttonLabel2: string = "Remove"
  buttonLabel3: string = "Submit"
  buttonColor: string = "primary"
  buttonColor2: string = "warn"
  buttonType: string = "button"
  role: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message : string = ""
  localStoreObj : any = {}
  username : string = ""
  agents: any = []
  agentPrev: any = ""
  trpData: any = []
  trp_name: string = ""
  displayedColumn: any = []
  searchForm = new FormGroup({
    'uname': new FormControl('',[Validators.required])
  })
  showTable: Boolean = false
  clicked: Boolean = false

  tranferForm = new FormGroup({
    'requestedBy' : new FormControl('',[Validators.required],),
    'requestedType' : new FormControl('',[Validators.required]),
    'requestFor' : new FormControl('',[Validators.required]),
    'previouslyAssigned' : new FormControl('',[Validators.required]),
    'previouslyAssignedName' : new FormControl('',[Validators.required]),
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
    this.role = temp.role!=null?JSON.parse(temp.role):""
    
  }

  searchTRP(){
    let a = this.searchForm.get("uname")?.value
    console.log(a)
    this.representativeServ.getSingleTRPOfAgent(this.username,a).subscribe({
      next: (data) => {
        console.log(data)
        if(data?.userid){
          let temp = data
          this.trpData.push(temp)
          this.displayedColumn = ['reName','tinNo','trpId','action']
          this.trp_name = data.reName
          this.showTable = true
        }else{
          this.showTable = false
          this.message = "Username not matched with any of your TRP"
          this.openSnackBar()
        }
      },
      error: (e) => {
        this.message = e
        this.openSnackBar()

      } 
    })
  }

  changeTRP(){
    this.clicked = true
  }

  requestSubmit(){
    if(this.tranferForm.value['reason']==""){
      this.message = "Reason must not be empty"
      this.openSnackBar()
    }else{
      this.submitBody()
    }
    
  }

  submitBody(){
    let temp = this.trpData[0]
    this.tranferForm.value['requestedBy']=this.username
    this.tranferForm.value['requestedType']="ROLE_AGENT"
    this.tranferForm.value['requestForType']="ROLE_REPRESENTATIVE"
    this.tranferForm.value['previouslyAssigned']=temp.tinNo
    this.tranferForm.value['previouslyAssignedName']=temp.reName
    this.tranferForm.value['status']="0"

    this.transferServ.save(this.tranferForm.value).subscribe({
      next: (data) => {
        if(data==true||data=="true"){
          this.message = "Request Sent Successfully"
          this.tranferForm.reset();
          this.searchForm.reset()
          this.clicked = false
          this.showTable = false
          this.openSnackBar()
        } 
        else if(data==false||data=="false"){
          this.message = "A request to change this trp is already pending. Please wait for the confirmation"
          this.tranferForm.reset()
          this.openSnackBar()
        }else{
          this.message = "Request Sent Failed"
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
