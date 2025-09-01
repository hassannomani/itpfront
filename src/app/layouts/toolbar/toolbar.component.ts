import { CommonService } from 'src/app/services/common-service/common.service';
import { Component,OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { SigninService } from 'src/app/services/signin-service/signin.service';
import {MatBadgeModule} from '@angular/material/badge';
import { ActionService } from 'src/app/services/action-service/action.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DataSavedModalComponent } from 'src/app/layouts/data-saved-modal/data-saved-modal.component';
import { ConfirmDialogModel } from 'src/app/layouts/confirm-modal/confirm-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],

})
export class ToolbarComponent implements OnInit{
  
  isLoggedIn: boolean = false;
  isAdmin: boolean = false
  isViewer: boolean = false
  isNbr: boolean = false;
  isRepresentative: boolean = false;
  unread: number = 0
  role: string = ""
  username: string = ""
  image: any 
  modalTitle: string = ""
  modalMessage: string= ""
  constructor(
    
    private localStorage: LocalStorageService,
    private signInService: SigninService,
    private actionService: ActionService,
    private router: Router, 
    private commonServ: CommonService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ){}
  ngOnInit(): void {
    this.signInService.loginStatusChange().subscribe(loggedIn => {
      //console.log("changing")
      let local = this.localStorage.getStorageItems();
      let expirestime = local.expires!=null?JSON.parse(local.expires):0
      console.log(expirestime)
      let current_time = new Date().getTime()
      console.log(local)
      if(local.token==""||local.token==null||local.token==undefined||expirestime<current_time){
        this.isLoggedIn = false;
        this.role=""
        this.username=""
        this.router.navigate(['/logout'])
        // this.modalMessage = "Session Expired! Please Log In again!"
        // this.modalTitle = "Error!"
        // this.alertDialog()
      }
      // }else if(expirestime<current_time){
      //   this.modalMessage = "Session Expired! Please Log In again!"
      //   this.modalTitle = "Error!"
      //   this.alertDialog()
      // }
      else{

        this.isLoggedIn = true;
        let role = local.role!=null?JSON.parse(local.role):null;

        this.role = role
        this.username  = local.username?JSON.parse(local.username): ""
        if(this.username!="000000000000")
          this.getMessageCount();
        this.getPhoto()
        if(role=="ROLE_ADMIN")
          this.isAdmin = true
        else if(role=="ROLE_NBR"){
          this.isNbr = true
          this.isAdmin = false
          this.isRepresentative = false
          this.isViewer = false
        }
          
        else if(role=="ROLE_ITP"){
          this.isRepresentative = true
          this.isAdmin = false
          this.isNbr = false
          this.isViewer = false
        }
          
        else if(role=="ROLE_VIEWER"){
          this.isViewer = true
          this.isRepresentative = false
          this.isAdmin = false
          this.isNbr = false
        }
      }
      
    })
   
  }

  heightReturner(){
    if(this.isLoggedIn)
      return "89vh";
    else
      return "";
  }

  getMessageCount(){
    this.actionService.getStatus(this.username).subscribe({
      next: (data) => {
        if(data.length){
          let count = 0
          for(let i=0;i<data.length;i++){
            if(data[i].actionRead==null)
            count++;
          }
          this.unread = count
        }        
      },
      error: (e) => {
      
      }  
    })
  }

  seeMessages(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['message-list']);
    }); 
  }

  decreaseFun(){
    console.log("called")
    this.unread = this.unread-1
  }

  getPhoto(){
    this.commonServ.loadProfilePhoto().subscribe({
      next: (data) => {
        let temp = data
        let objectURL = URL.createObjectURL(temp)
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        
      },
      error: (e) => {
        console.log(e)
      }  
    })
  }

  alertDialog(): void {

    const dialogData = new ConfirmDialogModel(this.modalTitle, this.modalMessage);

    const dialogRef = this.dialog.open(DataSavedModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
  }

}
