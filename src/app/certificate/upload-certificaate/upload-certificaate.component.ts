import { Component, OnInit, ViewChild, Directive, ElementRef } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/services/common-service/common.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { ConfirmDialogModel } from 'src/app/layouts/confirm-modal/confirm-modal.component';
import { DataSavedModalComponent } from 'src/app/layouts/data-saved-modal/data-saved-modal.component';
import {MatDialog} from '@angular/material/dialog';
import { CertificateService } from 'src/app/services/certificate-service/certificate.service';
import * as XLSX from 'xlsx';

/* load the codepage support library for extended support with older formats  */
@Component({
  selector: 'app-upload-certificaate',
  templateUrl: './upload-certificaate.component.html',
  styleUrls: ['./upload-certificaate.component.css']
})
export class UploadCertificaateComponent {
  file!: File;
  modalTitle: string = ""
  modalMessage: string= ""
  buttonLabel: string= "Upload"
  buttonColor: string = "primary"
  buttonType: string = "button"
  localStore: any = {}
  data : any[] = []
  message: string = ""
  passed: boolean = false
  tinId: any[] = []
  displayMessage: string= ""

  constructor(
    private commonService: CommonService,
    private localStorage: LocalStorageService,
    private router: Router,
    private titleService:Title,
    public dialog: MatDialog,
    private certificateServ: CertificateService,
  ){
    this.titleService.setTitle("upload Certificates");
  }
  ngOnInit(): void {
  }

  selectFile(event: any){
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const ab: ArrayBuffer = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(ab);

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = XLSX.utils.sheet_to_json(ws)
      // <AOA>(utils.sheet_to_json(ws, {header: 1}));
      console.log(this.data)
    };
    reader.readAsArrayBuffer(target.files[0]);
  }

  async uploadFile(){
    try{
      let checkError = this.verifyData()
      let checkDuplicacy = this.duplicacyCheck()
      let upload = this.upload()
    }catch(err){
      console.log(err)
    }
  
  }
  
  upload(){

    if(this.message==""){

      this.certificateServ
      .saveCertificates(this.data)
      .subscribe({
        
        next: (data) => {
         if(data.message=="success"){
          this.modalMessage = "Data successfully updated"
          this.modalTitle = "Success!"
          this.alertDialog()
         }
        },
        error: (e) => {
          this.modalMessage = "Data saving failed"
          this.modalTitle = "Error!"
          this.alertDialog()

        }
        
      });

    }

  }

  duplicacyCheck(){
    if(this.message==""){
      
      this.displayMessage="Checking Duplicacy!"

      this.certificateServ
      .checkCertificates(this.tinId)
      .subscribe({
        
        next: (data) => {
          if(data.length==0){
            console.log("success")
          } else{
            this.message= "Duplicate found"
            this.modalMessage =  this.message
            this.modalTitle = "Error!"
            this.alertDialog()
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
    
  }

  verifyData(){

    this.displayMessage="Checking errors!"

    for(let i=0;i<this.data.length;i++){
      if(this.data[i].examineeTin!=undefined&&this.data[i].examineeNid!=undefined&&this.data[i].examineeLicense!=undefined&&this.data[i].examineeMobile!=undefined){
        this.tinId.push(this.data[i].examineeTin.toString())
      }
      else{
        this.message+= "Line "+(i+2)+ " has field missing. " 
      }
      
    }
    if(this.message!=""){
      this.modalMessage = this.message
      this.modalTitle = "Error!"
      this.alertDialog()
    }
    
  }

  alertDialog(): void {

    const dialogData = new ConfirmDialogModel(this.modalTitle, this.modalMessage);

    const dialogRef = this.dialog.open(DataSavedModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
  }


}
