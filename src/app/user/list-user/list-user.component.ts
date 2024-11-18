import { Component, OnInit  } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit{
  agentsArr: any = []
  loaded: boolean = false
  noDatafound:boolean = false
  failed: boolean = false
  errorMsg: String = ""
  displayedColumns : any = []
  singleUser: any = {}
  buttonLabel: string = "View"
  buttonColor: string = "Basic"
  buttonType: string = "button"
  constructor(
    private userService: UserService,
    private router: Router,
    private titleService:Title
  ){
    this.titleService.setTitle("User List");

  }
  ngOnInit(): void {
    this.userService.getAllUSers().subscribe({
     
      next: (data) => {
        if(data.length){
          this.agentsArr = data
          this.loaded  = true
          this.displayedColumns = ['serial','username','firstName','lastName','email','roles','addedDate','action']

          console.log(this.agentsArr)
        } 
        else{
          this.noDatafound = true
        }
        console.log(data)
      },
      error: (e) => {
        console.log(e)
        this.errorMsg = e
        this.failed = true
      }  
    });
  }

  edit(id: string, username: string){
    console.log(id)
    console.log(username)
    this.userService.getAUser(username).subscribe({
     
      next: (data) => {
        if(data.uuid){
          this.singleUser = data;
          let role = data.roles?data.roles[0].name:null;
          if(role!=null&&role=="ROLE_AGENT"){
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['add-agent'],{ queryParams: {username: this.singleUser.username}});
            }); 
          }else if(role!=null&&role=="ROLE_REPRESENTATIVE"){

          }else[

          ]
        } 
        else{
          this.noDatafound = true
        }
      },
      error: (e) => {
        // this.errorMsg = e
        // this.failed = true
        console.log(e)
      }  
    });

  }

  action(id: string, username: string){

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['user-action'],{ queryParams: {username: username}});
    }); 
  }

  actionDetails(id: string, username: string){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['action-history'],{ queryParams: {username: username}});
    }); 
  }
}
