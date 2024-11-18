import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { SigninService } from 'src/app/services/signin-service/signin.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{
  constructor(
    private router: Router,
    private localstorageServ: LocalStorageService,
    private signinserv: SigninService
    ){}
  ngOnInit(): void {
    this.signinserv
      .logout()
      .subscribe(data=>{
        console.log(data)
        this.router.navigate(['/']);
      })
  }

}
