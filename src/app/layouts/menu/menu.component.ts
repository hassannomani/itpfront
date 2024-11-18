import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  login = true

  constructor(
    
    private localStorage: LocalStorageService,
    private router: Router, 
  ){}
  ngOnInit(): void {
  
    let local = this.localStorage.getStorageItems();
    console.log(local)
    if(local.token==""||local.token==null||local.token==undefined||local.username==""||local.username==null){
      this.router.navigateByUrl('/logout');
    }
  }
  

}
