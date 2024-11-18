import { Component, OnInit,ChangeDetectorRef,ChangeDetectionStrategy,NgZone } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import {Title} from "@angular/platform-browser";
import { AgentService } from 'src/app/services/agent-service/agent.service';

@Component({
  selector: 'app-approve-representative',
  templateUrl: './approve-representative.component.html',
  styleUrls: ['./approve-representative.component.css'],
  changeDetection: ChangeDetectionStrategy.Default

})
export class ApproveRepresentativeComponent implements OnInit{
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  representativesArr: any[] = []
  loaded: boolean = true;
  zeroData : boolean = false;
  approveFailed : boolean = false;
  displayedColumns: any = []
  agents: any = []
  buttonLabel: string = "See Details"
  buttonColor: string = "Basic"
  buttonType: string = "button"
  buttonLabel1: string = "Approve"
  buttonColor1: string = "primary"
  buttonType1: string = "button"
  buttonLabel2: string = "Reject"
  buttonType2: string = "button"
  buttonColor2: string = "warn"
  message: string = ""
  helperArr: any =[]
  constructor(
    private userService: UserService,
    private router: Router,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private agentServ: AgentService

  ){
    this.titleService.setTitle("Approve TRP");

  }
  ngOnInit(): void {
    this.getAllPendingTRPs()
    this.getAllAgents()
  }

  getAllPendingTRPs(){
    this
    .userService
    .getAllPendingUsers()
    .subscribe({
      next: (data) => {
        if(data.length){
          this.representativesArr = data
          this.displayedColumns = [ 'username','re_name','agent_id','added_date','action']
        } 
        else{
          this.representativesArr = []
          this.message = "No Data found"
          this.openSnackBar()
        }
      },
      error: (e) => {
        this.message = "Data retrieving error"
        this.openSnackBar()
      }  
    })
  }


  approve(uuid : string, index: string, addedBy: string, tin: string){    
    if(addedBy=="0"){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['approve-representative-details'],{ queryParams: {username:tin}});
      });
      
    }else{
      //alert("hello")
      this.userService.approvePendingUser(uuid).subscribe({
        next: (data) => {
          if(data.uuid){
            this.message = "User successfully approved"
            this.openSnackBar()
            this.getAllPendingTRPs() 
          
          } 
        },
        error: (e) => {
          this.message = "User approval failed";
          this.openSnackBar()
          console.log(e)
        } 
      })
    }
    return
    
  }

  details(tin : string, index: string){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['approve-representative-details'],{ queryParams: {username:tin}});
    });
  }

  reject(username : string, index: string){   
 
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['user-action'],{ queryParams: {username:username,deny:1}});
    });
    // this.userService.rejectPendingUser(uuid).subscribe({
    //   next: (data) => {
    //     if(data.uuid){
    //       alert("User Rejected!")
    //       this.ngOnInit()          
    //     } 
    //   },
    //   error: (e) => {
    //     this.approveFailed = true;
    //     console.log(e)
    //   } 
    // })
  }

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }

      // let data = this.helperArr.splice(parseInt(index),1)
    // let dtemp  = data
    // data = this.representativesArr
    // //this.representativesArr = this.helperArr
    // this.zone.run(()=>{
    //       // this.helperArr = this.representativesArr
    //       // console.log(this.helperArr)
          
    //       this.representativesArr=this.helperArr
    //       //this.changeDetector.detectChanges();
    // }) 

  getAllAgents(){
    this.agentServ.getAllAgentForFront().subscribe({
      next: (data) => {
        if(data.length){
          this.agents = data
        } 
      },
      error: (e) => {
        this.message = "Agent Data not loaded";
        console.log(e)
      } 
    })

  }

}
