import { CommonService } from 'src/app/services/common-service/common.service';
import { Component,OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { SigninService } from 'src/app/services/signin-service/signin.service';
import {MatBadgeModule} from '@angular/material/badge';
import { ActionService } from 'src/app/services/action-service/action.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],

})
export class ToolbarComponent implements OnInit{
  
  isLoggedIn: boolean = false;
  isAdmin: boolean = false
  isViewer: boolean = false
  isAgent: boolean = false;
  isRepresentative: boolean = false;
  unread: number = 0
  role: string = ""
  username: string = ""
  image: any 
  constructor(
    
    private localStorage: LocalStorageService,
    private signInService: SigninService,
    private actionService: ActionService,
    private router: Router, 
    private commonServ: CommonService,
    private sanitizer: DomSanitizer
  ){}
  ngOnInit(): void {
    this.signInService.loginStatusChange().subscribe(loggedIn => {
      //console.log("changing")
      let local = this.localStorage.getStorageItems();
      console.log('local')
      console.log(local)
      if(local.token==""||local.token==null||local.token==undefined){
        this.isLoggedIn = false;
        this.role=""
        this.username=""
      }
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
        else if(role=="ROLE_AGENT"){
          this.isAgent = true
          this.isAdmin = false
          this.isRepresentative = false
          this.isViewer = false
        }
          
        else if(role=="ROLE_REPRESENTATIVE"){
          this.isRepresentative = true
          this.isAdmin = false
          this.isAgent = false
          this.isViewer = false
        }
          
        else if(role=="ROLE_VIEWER"){
          this.isViewer = true
          this.isRepresentative = false
          this.isAdmin = false
          this.isAgent = false
        }
      
          console.log(this.isAdmin)
          console.log(this.isAgent)
          console.log(this.isRepresentative)
          console.log(this.isViewer)
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

}
