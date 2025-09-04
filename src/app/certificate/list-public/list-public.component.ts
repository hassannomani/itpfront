import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common-service/common.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import {MatDialog} from '@angular/material/dialog';
import { CertificateService } from 'src/app/services/certificate-service/certificate.service';
import { ConfirmDialogModel } from 'src/app/layouts/confirm-modal/confirm-modal.component';
import { MaterialExampleModule } from 'src/material.module';
import { DatePipe } from '@angular/common';
import { DataSavedModalComponent } from 'src/app/layouts/data-saved-modal/data-saved-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
export interface Certificate {
  tin: string,
  nid: string,
  mobile: string,
  category: String,
  registrationNo: String,
  registrationDate: String
}

@Component({
  selector: 'app-list-public',
  templateUrl: './list-public.component.html',
  styleUrls: ['./list-public.component.css'],
  imports: [MaterialExampleModule, DatePipe ],
  standalone: true
})
export class ListPublicComponent implements OnInit{

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

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

  dataSource = new MatTableDataSource<Certificate>();
  constructor(
    private commonService: CommonService,
    private router: Router,
    private titleService:Title,
    public dialog: MatDialog,
    private certificateServ: CertificateService,
  ){
    this.titleService.setTitle("List of Certificates");
  }

  ngOnInit(): void {
    this.setUpPaginator()
  }

 
  alertDialog(): void {

    const dialogData = new ConfirmDialogModel(this.modalTitle, this.modalMessage);

    const dialogRef = this.dialog.open(DataSavedModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
  }

  setUpPaginator(){
    this.certificateServ
    .allCertificatesPublic()
    .subscribe({
      
      next: (data) => {
        if(data.length==0){
          this.message= "No Data found"
          this.modalMessage =  this.message
          this.modalTitle = "Empty!"
          this.alertDialog()
        } else{
          this.certificates = data
          this.dataSource = new MatTableDataSource <Certificate>(this.certificates)
          this.displayedColumn = ['serial','name','mobile','category']
        }
      },
      error: (e) => {
        console.log(e)
        this.modalMessage = e.message
        this.message= e.message
        this.modalTitle = "Error!"
        this.alertDialog()
      },
      complete: () => {
        this.dataSource.paginator = this.paginator

      }
    })
  }

}
