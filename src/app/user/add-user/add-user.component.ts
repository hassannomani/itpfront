import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import { FormControl, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import {Title} from "@angular/platform-browser";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit{
  addUser = new FormGroup({
    'username' : new FormControl('',[Validators.required, Validators.minLength(10)]),
    'password' : new FormControl('',[Validators.required, Validators.minLength(4)]),
    'repassword' : new FormControl('',[Validators.required, Validators.minLength(4)]),
    'firstName' : new FormControl('',[Validators.required, Validators.minLength(2)]),
    'lastName' : new FormControl('',[Validators.required, Validators.minLength(2)]),
    'email' : new FormControl('',[Validators.required]),
    'addedBy': new FormControl(''),
    'status': new FormControl(''),
    'photo': new FormControl(''),
    'roles': new FormControl('',[Validators.required])
  })

 
  
  failed: boolean = false
  buttonLabel: string= "Submit"
  buttonColor: string = "primary"
  buttonType: string = "button"
  errorMsg: string = ""
  rolenames: any[] = []
  notSame: boolean = true
  addedSuccess: boolean = false
  failedCreation: boolean = false
  rolereq: any = []
  tinnotFound: boolean = false
  constructor(
    private userService: UserService,
    private titleService:Title,
    private router: Router,
    private commonService: CommonService,
    private localStorageServ: LocalStorageService,

  ){
    this.titleService.setTitle("Add User");
  }
  ngOnInit(): void {
    this.userService.getRoles().subscribe({
     
      next: (data) => {
        if(data.length){
          this.rolenames = data
          var index=-1
          for(let i=0;i<this.rolenames.length;i++){
            if(this.rolenames[i].name=="ROLE_REPRESENTATIVE"){
              index = i
              break
            }
          }
          this.rolenames.splice(index,1)
        } 
        else{
          alert('roles not created!')
        }
      },
      error: (e) => {
        alert(e)
      }  
    });
    
  }

  onKeydownEvent(event: KeyboardEvent): void {
    this.notSame= this.addUser.value['password']!=this.addUser.value['repassword']?true:false
  
  }

  verify(){
    let username = this.addUser.value["username"]?this.addUser.value["username"]:""
    this.commonService.getTin(username).subscribe({
      next: (data) => {
        console.log(data)
        if(data.isError==1){
          this.tinnotFound = true
        }else{
          this.localStorageServ.saveAgent(data)
          this.addUser.get('email')?.setValue(data.email)
          let name = data.name
          if(name!=null && name!=''){
            let split = name.split(" ")
            let lastpart=""
            this.addUser.get("firstName")?.setValue(split[0])
            for (let i=1;i<split.length;i++)
              lastpart+=split[i]+" "
            this.addUser.get("lastName")?.setValue(lastpart)
          }
        }
      },
      error: (e) => {
        console.log(e)

      }  
    })
  }

  userSubmit(){
  
    this.notSame=false
    this.addUser.value['addedBy']="Admin"
    this.addUser.value['status']="1"
    this.addUser.value['photo']=""
    let index = -1;
    var rolename=""
    for(let i=0;i<this.rolenames.length;i++){
      if(this.rolenames[i].id==this.addUser.value["roles"]){
        this.rolereq.push( this.rolenames[i])
        rolename = this.rolenames[i].name
        break;
      }
    }
    this.addUser.value['roles'] = this.rolereq;
    this.userService.addUsers(this.addUser.value).subscribe({
     
      next: (data) => {
        if(data.uuid){
          this.addedSuccess = true
          
          //console.log(this.roles)
          if(rolename=="ROLE_AGENT"){
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['add-agent'],{ queryParams: {username: this.addUser.value['username']}});
            }); 
          }
          else{
            this.addUser.reset();
            this.localStorageServ.deleteAgent()
          }
        } 
        else{
          this.failedCreation = true
        }
      },
      error: (e) => {
        this.failed = true
        if(e.status==400){
          this.errorMsg = "A User already exists with this Username or Required fields missing"
        }else{
          this.errorMsg = e.error.message
        }
      }  
    });
    
  }



}
