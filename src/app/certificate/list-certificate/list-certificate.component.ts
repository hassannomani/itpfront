import { Component, OnInit, ViewChild, Directive, ElementRef } from '@angular/core';
import { CommonService } from 'src/app/services/common-service/common.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import {MatDialog} from '@angular/material/dialog';
import { CertificateService } from 'src/app/services/certificate-service/certificate.service';
import { ConfirmDialogModel } from 'src/app/layouts/confirm-modal/confirm-modal.component';
import { DataSavedModalComponent } from 'src/app/layouts/data-saved-modal/data-saved-modal.component';

@Component({
  selector: 'app-list-certificate',
  templateUrl: './list-certificate.component.html',
  styleUrls: ['./list-certificate.component.css']
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
  displayedColumn: any = []
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
          this.message= "No Data found"
          this.modalMessage =  this.message
          this.modalTitle = "Empty!"
          this.alertDialog()
        } else{
          this.certificates = data
          this.displayedColumn = ['serial','examineeTin','examineeNid','examineeLicense','examineeMobile','examineeCertno']
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

  alertDialog(): void {

    const dialogData = new ConfirmDialogModel(this.modalTitle, this.modalMessage);

    const dialogRef = this.dialog.open(DataSavedModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
  }

}
