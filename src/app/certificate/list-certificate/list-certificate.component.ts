import { Component, OnInit, ViewChild, Directive, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { CommonService } from 'src/app/services/common-service/common.service';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import {MatDialog} from '@angular/material/dialog';
import { CertificateService } from 'src/app/services/certificate-service/certificate.service';
import { ConfirmDialogModel } from 'src/app/layouts/confirm-modal/confirm-modal.component';
import { DataSavedModalComponent } from 'src/app/layouts/data-saved-modal/data-saved-modal.component';
import { MaterialExampleModule } from 'src/material.module';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from 'src/app/uitools/button/button.component';


@Component({
  selector: 'app-list-certificate',
  templateUrl: './list-certificate.component.html',
  styleUrls: ['./list-certificate.component.css'],
  imports: [MaterialExampleModule, DatePipe, CommonModule,ReactiveFormsModule, ButtonComponent ],
  standalone: true
})

export class ListCertificateComponent implements OnInit{
  modalTitle: string = ""
  modalMessage: string= ""
  localStore: any = {}
  data : any[] = []
  message: string = ""
  passed: boolean = false
  tinId: any[] = []
  displayMessage: string= ""
  certificates: any =[]
  sec_certificates: any =[]
  displayedColumn: any = []
  loaded: boolean = false
  buttonLabel: string = "Search"
  buttonLabel2: string = "Reset Search"
  buttonColor: string = "primary"
  buttonColor2: string = "basic"
  buttonType: string = "button"
  searchform = new FormGroup({
    'search_criteria' : new FormControl('',[Validators.required])
  })
  constructor(
    private commonService: CommonService,
    private localStorage: LocalStorageService,
    private router: Router,
    private titleService:Title,
    public dialog: MatDialog,
    private certificateServ: CertificateService,
  ){
    this.titleService.setTitle("List of Certificates");
  }
  ngOnInit(): void {
    this.certificateServ
    .allCertificates()
    .subscribe({
      
      next: (data) => {
        if(data.length==0){
          this.loaded = true
          this.message= "No Data found"
          this.modalMessage =  this.message
          this.modalTitle = "Empty!"
          this.alertDialog()
        } else{
          this.loaded = true
          this.certificates = data
          this.displayedColumn = ['serial','name','tin','nid','mobile','category']
        }
      },
      error: (e) => {
        console.log(e)
        this.modalMessage = e.message
        this.message= e.message
        this.modalTitle = "Error!"
        this.alertDialog()
      }
      
    });
  }

  search(){
    let str = this.searchform.value['search_criteria']
    let searchArr = []
    for(let i = 0;i<this.certificates.length;i++){
      if(this.certificates[i].name!=null&&this.certificates[i].tin!=null&&this.certificates[i].mobile!=null){
        if(this.certificates[i].name.indexOf(str)>=0||this.certificates[i].tin.indexOf(str)>=0||this.certificates[i].mobile.indexOf(str)>=0){
          searchArr.push(this.certificates[i])
          console.log("entered")
        }
          
     }
    }
    console.log(searchArr)
    this.sec_certificates = this.certificates
    this.certificates = searchArr
  }

  reset(){
    this.certificates = this.sec_certificates
  }

  alertDialog(): void {

    const dialogData = new ConfirmDialogModel(this.modalTitle, this.modalMessage);

    const dialogRef = this.dialog.open(DataSavedModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
  }

}
